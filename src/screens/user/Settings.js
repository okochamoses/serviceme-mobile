import React from 'react';
import {View} from 'react-native';
import Typo from '../../components/Typo';
import Container from '../../components/Container';
import Block from '../../components/Block';
import InfoCard from '../../components/InfoCard';
import ListItem from '../../components/ListItem';
import Line from '../../components/Line';

const Settings = ({navigation}) => {
  return (
    <Container>
      <Block>
        <Typo color="blue" style={{paddingBottom: 10}} weight="s">
          Account Settings
        </Typo>
        <Block>
          <Line margin={0.1} />
          <ListItem
            title="Change Password"
            subtitle="Change your current password"
            onPress={() => navigation.navigate("Change Password")}
          />
        </Block>
        <Typo color="blue" style={{paddingTop: 30, paddingBottom: 10}} weight="s">
          Notification Settings
        </Typo>
        <Block>
          <Line margin={0.1} />
          <ListItem
            title="Push notifications"
            subtitle="Notification Preferences"
          />
        </Block>


        <Typo color="blue" style={{paddingTop: 30, paddingBottom: 10}} weight="s">
          General
        </Typo>
        <Block>
          <Line margin={0.1} />
          <ListItem
            title="Rate our app"
            subtitle="Rate & Review Us"
          />
          <ListItem
            title="Send Feedback"
            subtitle="Share your thought"
            onPress={() => navigation.navigate("Send Feedback")}
          />
        </Block>
      </Block>
    </Container>
  );
};

export default Settings;
