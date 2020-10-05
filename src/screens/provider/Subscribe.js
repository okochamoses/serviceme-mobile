import React, {useState, useEffect} from 'react';
import {StatusBar, SafeAreaView, ScrollView, Image} from 'react-native';
import theme from '../../constants';
import Container from '../../components/Container';
import AsyncStorage from '@react-native-community/async-storage';
import Typo from '../../components/Typo';
import Line from '../../components/Line';
import InfoCard from '../../components/InfoCard';
import {PayWithFlutterwave} from 'flutterwave-react-native';

const Subscriptions = ({navigation, route}) => {
  const [businesses, setBusinesses] = useState([]);
  const [profile, setProfile] = useState({});
  const _getBusinesses = async () => {
    const profile = JSON.parse(await AsyncStorage.getItem('profile'));
    await setBusinesses(profile.businesses);
    setProfile(profile);
  };
  useEffect(() => {
    async function loadProfile() {
      await _getBusinesses();
    }
    loadProfile();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{backgroundColor: theme.colors.primary}} />
      <ScrollView>
        <Container style={{paddingTop: -20}}>
          <Image
            source={require('../../assets/images/credit_card.png')}
            resizeMode="contain"
            style={{height: 200}}
          />
          <Typo size="xl">
            Your subscription is currently{' '}
            <Typo size="xl" color="success">
              Active
            </Typo>
          </Typo>
        </Container>
        <Line />

        <InfoCard
          title={'Expiry Date'}
          link=""
          body="Expires: 20 Jan, 2021"
          onPressLink={() => {}}
        />

        <InfoCard title={'Subscribe'} link="" onPressLink={() => {}}>
          {/* <Typo>1 Month</Typo>
          <Typo>1 Month</Typo> */}
          <PayWithFlutterwave
            onRedirect={() => console.log('REDIRECT')}
            options={{
              tx_ref: 'transactionReference',
              authorization: '[merchant secret key]',
              customer: {
                email: 'customer-email@example.com',
              },
              amount: 2000,
              currency: 'NGN',
              payment_options: 'card',
            }}
          />
        </InfoCard>
      </ScrollView>
    </>
  );
};

export default Subscriptions;
