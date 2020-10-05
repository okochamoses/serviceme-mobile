import React, {useState, useEffect} from 'react';
import {StatusBar, SafeAreaView, ScrollView, Image} from 'react-native';
import Block from '../../components/Block';
import theme from '../../constants';
import Container from '../../components/Container';
import ListItem from '../../components/ListItem';
import AsyncStorage from '@react-native-community/async-storage';
import Typo from '../../components/Typo';
import {Link} from '@react-navigation/native';
import Line from '../../components/Line';
import InfoCard from '../../components/InfoCard';

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
        <Container full style={{paddingTop: -20}}>
          <Image
            source={require('../../assets/images/credit_card.png')}
            resizeMode="contain"
            style={{height: 200}}
          />
          <Line />
          {businesses.map(business => (
            <ListItem
              onPress={() =>
                navigation.navigate('Subscribe', {
                  businessId: business._id,
                  profile,
                })
              }
              key={business._id}
              title={business.businessName}
              subtitle={'Status: Expired'}
            />
          ))}
        </Container>
      </ScrollView>
    </>
  );
};

export default Subscriptions;
