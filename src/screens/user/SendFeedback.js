import React, {useState} from 'react';
import {ActivityIndicator} from 'react-native';
import Container from '../../components/Container';
import Input from '../../components/Input';
import Button from '../../components/Button';
import constants from '../../constants';
import Modal from '../../components/Modal';
import {changePassword} from '../../services/authentication';

const SendFeedback = () => {
  const [title, setTitle] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const _changePassword = async () => {
    const err = validateInputs();
    if (err) {
      setModalOpen(true);
      setErrorMessage(err);
      return;
    }
    setLoading(true);

    try {
      // Do an API call here
      const response = {status: 10, description: "This feature is still in progress. It should send a message to the serviceme.ng admins when done"}
      if (response.status === 0) {
        setErrorMessage('Your feedback has been received. Thanks for sending ');
      } else {
        setErrorMessage(response.description);
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again');
    }
    setModalOpen(true);
    setLoading(false);
  };

  const validateInputs = () => {
    setErrorMessage('');
    if (title === "") {
      return 'Please enter a title';
    }
    if (message === "") {
      return 'Please type in a message';
    }
    return null;
  };

  return (
    <Container>
      <Modal
        open={modalOpen}
        message={errorMessage}
        close={() => setModalOpen(false)}
      />
      <Input
        value={title}
        onChangeText={text => setTitle(text)}
        label="Title"
      />
      <Input
        value={message}
        onChangeText={text => setMessage(text)}
        multiline={true} numberOfLines={10}
        label="Message"
        textStyle={{height: 200, textAlignVertical: 'top'}}
      />
      <Button onPress={_changePassword}>
        {loading ? (
          <ActivityIndicator color={constants.colors.white} />
        ) : (
          'Send Feedback'
        )}
      </Button>
    </Container>
  );
};

export default SendFeedback;
