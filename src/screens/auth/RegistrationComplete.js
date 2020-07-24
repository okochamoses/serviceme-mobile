import React, {useContext, useState, useEffect} from 'react';
import {ScrollView, Image} from 'react-native';
import Container from '../../components/Container';
import Typo from '../../components/Typo';
import Block from '../../components/Block';
import Button from '../../components/Button';

const RegistrationComplete = ({navigation}) => (
  <Container noScroll style={{alignItems: 'center'}}>
    <Block vCenter style={{flex: 3, width: 300}}>
      <Image
        source={require('../../assets/images/verified.png')}
        style={{flex: 1, width: null, height: null}}
        resizeMode="contain"
      />
    </Block>
    <Block spaceBetween style={{flex: 1, width: '100%'}}>
      <Block style={{paddingBottom: 40}}>
        <Block row vCenter>
          <Typo size="xl">Welcome to</Typo>
          <Typo size="xl" color="primary">
            {' '}
            Serviceme.ng
          </Typo>
        </Block>
        <Typo alt size="md" style={{textAlign: 'center'}}>
          Please proceed to login page to continue
        </Typo>
      </Block>
      <Button onPress={() => navigation.navigate('Login')}>Continue</Button>
    </Block>
  </Container>
);

export default RegistrationComplete;
