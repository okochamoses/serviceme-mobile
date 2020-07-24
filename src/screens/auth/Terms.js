import React, {useContext, useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import Container from '../../components/Container';
import Typo from '../../components/Typo';
import Block from '../../components/Block';
import Button from '../../components/Button';

const Terms = ({navigation}) => (
  <Container
    noScroll
    style={{alignItems: 'center', }}>
    <Block vCenter style={{flex: 2}} >
      <ScrollView style={{alignSelf: 'center'}}>
        <Typo weight="s" style={{textAlign: 'center'}}>
          Review Terms and Conditions{'\n'}
        </Typo>
        <Typo alt>
          Your privacy is important to us. It is Brainstorming's policy to
          respect your privacy regarding any information we may collect from you
          across our website, and other sites we own and operate.{'\n'}
        </Typo>
        <Typo alt>
          We only ask for personal information when we truly need it to provide
          a service to you. We collect it by fair and lawful means, with your
          knowledge and consent. We also let you know why we’re collecting it
          and how it will be used.{'\n'}
        </Typo>
        <Typo alt>
          We only retain collected information for as long as necessary to
          provide you with your requested service.
        </Typo>
      </ScrollView>
    </Block>
    <Block vCenter style={{flex: 1}}>
      <Button onPress={() => navigation.navigate("Complete Registration 1")}>I agree with this</Button>
      <Button bordered onPress={() => navigation.goBack()}>Decline</Button>
    </Block>
  </Container>
);

export default Terms;
