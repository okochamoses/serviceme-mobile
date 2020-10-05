import React, {Component, useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import theme from '../constants';
import Container from '../components/Container';
import Button from '../components/Button';
import Typo from '../components/Typo';
import Block from '../components/Block';
import {useDispatch} from 'react-redux';
import InitActions from '../redux/InitActions';
import {getCategories} from '../services/authentication';
import AsyncStorage from '@react-native-community/async-storage';
import constants from '../constants';

const Auth = ({navigation}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const _goToApp = async () => {
    setLoading(true);
    const categories = await _getCategories();
    if (categories === null) {
      // await setErrorModal(true);
      // setErrorMessage(response.description);
      setLoading(false);
    } else {
      await AsyncStorage.setItem('categories', JSON.stringify(categories));
      setLoading(false);
      dispatch(InitActions.navigateToUser());
    }
  };

  const _getCategories = async () => {
    const response = await getCategories();
    if (response.status === 0) {
      return response.data;
    } else {
      return null;
    }
  };

  return (
    <Container noScroll style={{flex: 1, justifyContent: 'space-between'}}>
      <Block center vCenter style={{paddingTop: '30%'}}>
        <Image source={require('../assets/images/logo.png')} />
        <Block row vCenter style={{paddingTop: 40}}>
          <Typo size="xl">Welcome to</Typo>
          <Typo size="xl" color="primary">
            {' '}
            serviceme.ng
          </Typo>
        </Block>
        <Typo size="md" weight="l">
          Sign in or create an account
        </Typo>
      </Block>
      <Block center />
      <Block style={{paddingBottom: 40}}>
        <Button onPress={() => navigation.navigate('Login')}>Login</Button>
        <Button onPress={() => navigation.navigate('Register')}>Sign Up</Button>
        <Button bordered onPress={_goToApp}>
          {loading ? (
            <ActivityIndicator color={constants.colors.primary} />
          ) : (
            'Continue to app'
          )}
        </Button>
      </Block>
    </Container>
  );
};

export default Auth;
