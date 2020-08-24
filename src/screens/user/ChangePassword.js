import React, {useState} from 'react';
import {ActivityIndicator} from 'react-native';
import Container from '../../components/Container';
import Input from '../../components/Input';
import Button from '../../components/Button';
import constants from '../../constants';
import Modal from '../../components/Modal';
import {changePassword} from '../../services/authentication';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [message, setMessage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const _changePassword = async () => {
    const err = validateInputs();
    if (err) {
      setModalOpen(true);
      setMessage(err);
      return;
    }
    setLoading(true);

    try {
      const response = await changePassword(oldPassword, newPassword);
      if (response.status === 0) {
        setMessage('Your password has been changed successfully!');
      } else {
        setMessage(response.description);
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again');
    }
    setModalOpen(true);
    setLoading(false);
  };

  const validateInputs = () => {
    setMessage('');
    if (newPassword <= 6) {
      return 'New password must be at least 6 characters';
    }
    if (newPassword !== confirmPassword) {
      return 'Passwords do not match';
    }
    return null;
  };

  return (
    <Container>
      <Modal
        open={modalOpen}
        message={message}
        close={() => setModalOpen(false)}
      />
      <Input
        value={oldPassword}
        onChangeText={text => setOldPassword(text)}
        label="Old Password"
        secureTextEntry
      />
      <Input
        value={newPassword}
        onChangeText={text => setNewPassword(text)}
        label="New Password"
        secureTextEntry
      />
      <Input
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
        label="Re-enter new password"
        secureTextEntry
      />
      <Button onPress={_changePassword}>
        {loading ? (
          <ActivityIndicator color={constants.colors.white} />
        ) : (
          'Change Password'
        )}
      </Button>
    </Container>
  );
};

export default ChangePassword;
