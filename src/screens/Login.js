import React, {useContext, useState, useEffect} from 'react';
import {View, StyleSheet, Image, Switch, ActivityIndicator, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import TouchID from 'react-native-touch-id';
import AsyncStorage from '@react-native-community/async-storage';

import theme from '../constants';
import Container from '../components/Container';
import Button from '../components/Button';
import Typo from '../components/Typo';
import Block from '../components/Block';
import Input from '../components/Input';
import {login, getProfile} from '../services/authentication';
import {useDispatch} from 'react-redux';
import InitActions from '../redux/InitActions';
import {getCategories} from '../services/authentication';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  // const toggleIsLoading = () => dispatch(InitActions.toggleLoading());
  const [loading, setLoading] = useState(false);

  const _getCategories = async () => {
    const response = await getCategories();
    if (response.status === 0) {
      return response.data;
    } else {
      return null;
    }
  };

  const [email, setEmail] = useState('dev.mosesokocha@gmail.com');
  const [password, setPassword] = useState('Password123$');
  const [rememberMe, setRememberMe] = useState(false);
  const [fingerprintModal, setFingerprintModal] = useState(false);
  const [fingerprintIcon, setFingerprintIcon] = useState(undefined);
  const [fingerprintColor, setFingerprintColor] = useState(theme.colors.mid);
  const [fingerPrintMessage, setFingerPrintMessage] = useState(
    'Put your finger',
  );
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const _doLogin = async () => {
    setLoading(true);
    const response = await login(email.trim(), password);
    if (response.status === 0) {
      const categories = await _getCategories();
      console.log(categories);
      if (categories === null) {
        await setErrorModal(true);
        setErrorMessage(response.description);
        setLoading(false);
      }

      // store data to phone
      try {
        await AsyncStorage.setItem('token', 'Bearer ' + response.data);
        await AsyncStorage.setItem('categories', JSON.stringify(categories));
        const {status, data} = await getProfile();

        setLoading(false);
        if (status === 0) {
          await AsyncStorage.setItem('profile', JSON.stringify(data));
          dispatch(InitActions.navigateToUser());
        } else {
          console.log(status);
        }
      } catch (error) {
        // Error saving data
        setLoading(false);
        console.log(error);
      }
    } else {
      // toggleIsLoading()
      // display error modal
      setLoading(false)
      setErrorModal(true);
      setErrorMessage(response.description);
      // setState({ errorModal: true, errorMessage: response.description })
    }
  };

  const _fingerPrintCheck = () => {
    const optionalConfigObject = {
      title: 'Use Touch ID', // Android
      imageColor: theme.colors.mid, // Android
      imageErrorColor: theme.colors.primary, // Android
      sensorDescription: 'Touch sensor', // Android
      sensorErrorDescription: 'Failed', // Android
      cancelText: 'Cancel', // Android
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
    };
    // setState({ fingerprintModal: true })
    TouchID.authenticate('Use your fingerprint to login', optionalConfigObject)
      .then(success => {
        _doLogin();
      })
      .catch(error => {
        console.log('FAILURE');
        setFingerprintColor(theme.colors.primary);
        setFingerPrintMessage('Fingerprint verification failed');
      });
  };

  const _renderFingerprintIcon = async () => {
    return await TouchID.isSupported()
      .then(biometryType => {
        if (biometryType === true || biometryType === 'TouchID') {
          setFingerprintIcon('fingerprint');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Container style={{height: Dimensions.get("window").height - 130}}>
      {/* Fingerprint Modal */}
      <Modal
        animationType="slide"
        isVisible={fingerprintModal}
        onBackdropPress={() => setFingerprintModal(false)}
        hasBackdrop={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Block center vCenter>
              <Typo color="mid" style={{paddingVertical: 10}} size="lg">
                Use Touch ID
              </Typo>
              <Typo
                color="mid"
                style={{paddingVertical: 10}}
                size="sm"
                weight="light">
                Use your fingerprint to login
              </Typo>
              <Icon name="fingerprint" size={76} color={fingerprintColor} />
              <Typo
                style={{paddingVertical: 10, color: fingerprintColor}}
                size="sm"
                weight="light">
                {fingerPrintMessage}
              </Typo>
            </Block>
          </View>
        </View>
      </Modal>
      {/* Error modal */}
      <Modal
        animationType="slide"
        isVisible={errorModal}
        onBackdropPress={() => setErrorModal(false)}
        hasBackdrop={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Block center vCenter>
              <Icon
                name="close-circle"
                size={48}
                color={theme.colors.primary}
              />
              <Typo
                style={{paddingVertical: 10, textAlign: 'center'}}
                weight="l">
                {errorMessage}
              </Typo>
              <Button onPress={() => setErrorModal(false)}>Close</Button>
            </Block>
          </View>
        </View>
      </Modal>

<Block style={{flex: 1, justifyContent: 'space-between'}}>
      <Block center vCenter style={{paddingTop: '1%'}}>
        <Image
          resizeMode="contain"
          source={require('../assets/images/logo.png')}
          style={{width: '25%'}}
        />
        <Block>
          <Typo size="xl" weight="s">
            Sign In
          </Typo>
          <Typo size="md" weight="l" style={{paddingTop: 15}}>
            Enter your email and password to sign in
          </Typo>
        </Block>
      </Block>
      <Block center>
        <Input
        editable={!loading}
          placeholder="Email"
          defaultValue={email}
          onChangeText={text => setEmail(text)}
        />
        <Input
          secureTextEntry
          editable={!loading}
          defaultValue={password}
          placeholder="Password"
          icon={fingerprintIcon}
          onIconPress={() => _fingerPrintCheck()}
          onChangeText={text => setPassword(text)}
        />
      </Block>
      <Block row center style={{justifyContent: 'space-between'}}>
        <Typo weight="l">Remember Me</Typo>
        <Switch
          disabled={loading}
          trackColor={{false: theme.colors.primary, true: theme.colors.success}}
          ios_backgroundColor={theme.colors.primary}
          onValueChange={() => setRememberMe(!rememberMe)}
          value={rememberMe}
        />
      </Block>
      <Button onPress={() => _doLogin()}>{loading ? <ActivityIndicator color="white" /> : "Login"}</Button>
      <Block row center vCenter style={{paddingVertical: '10%'}}>
        <Typo weight="l" color="mid">
          Forget password?{' '}
        </Typo>
        <Typo weight="l" color="primary">
          Reset here
        </Typo>
      </Block>
      </Block>
    </Container>
  );
};

export default Login;

const styles = StyleSheet.create({
  centeredView: {
    //   flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    opacity: 1,
    width: '80%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
