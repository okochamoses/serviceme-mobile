import React, {useEffect, useState} from 'react';
import {View, Dimensions, ScrollView, Image, Modal} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import publicIP from 'react-native-public-ip';
import LinearGradient from 'react-native-linear-gradient';

import Typo from '../../components/Typo';
import Block from '../../components/Block';
import Container from '../../components/Container';
import Button from '../../components/Button';
import Line from '../../components/Line';
import InfoCard from '../../components/InfoCard';
import ReviewCard from '../../components/ReviewCard';
import {addVisitor} from '../../services/authentication';
const {height, width} = Dimensions.get('window');

const ProviderProfile = ({navigation, route}) => {
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  useEffect(() => {
    setImages(route.params.business ? route.params.business.images : []);
    setDescription(route.params.business ? route.params.business.description : "");
    addVisitorApi();
    // do api call here as a visitor
  }, []);

  const addVisitorApi = async () => {
    // let ip, latitude, longitude;
    const ip = await publicIP();
    Geolocation.getCurrentPosition(async position => {
      await addVisitor(
        ip,
        '5ed95f97cacf8e6929f7cf9a',
        '5ed7a04e83bcae13e05e9385',
        position.coords.longitude,
        position.coords.latitude,
        'deviceId',
      );
    });
  };
  return (
    <>
      <Container full>
        <ScrollView
          style={{backgroundColor: 'orange', height: 200, width: '100%'}}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}>
          {images.map((img, idx) => (
            <View>
              <Image
                source={{uri: img}}
                key={idx}
                style={{height: 200, width: width}}
              />
              <LinearGradient
                colors={['#55555500', '#555555']}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  display: 'flex',
                  justifyContent: 'flex-end',
                  paddingBottom: 10,
                  paddingHorizontal: 10,
                  height: 30,
                  width,
                }}>
                <Typo style={{fontSize: 12}} color="white">
                  {idx + 1}/{images.length}
                </Typo>
              </LinearGradient>
            </View>
          ))}
        </ScrollView>
        <Block row spaceBetween style={{padding: 20}}>
          <Button style={{flex: 1, marginRight: 10}}>Home Service</Button>
          <Button bordered style={{flex: 1, marginLeft: 10}} onPress={() => <Modal  visible={true}><Typo>Moses</Typo></Modal>}>
            On Premise
          </Button>
        </Block>
        <Line margin={10} />
        <InfoCard
          title={'Description'}
          link=""
          body={description}
          onPressLink={() => {}}
        />
        <InfoCard
          title={'Reviews'}
          link=""
          onPressLink={() => {}}
          style={{paddingHorizontal: 0, width: null}}>
          <View>
            <ReviewCard
              date="June 9, 2020 4:35 PM"
              comment="Honestly one of the best haircuts I’ve gotten in Lagos. Very professional!"
              rating={4}
            />
            <ReviewCard
              date="June 9, 2020 4:35 PM"
              comment="Honestly one of the best haircuts I’ve la la gotten in Lagos. Very professional!Honestly one of the best haircuts I’ve gotten in Lagos. Very professional!Honestly one of the best haircuts I’ve gotten in Lagos. Very professional!Honestly one of the best haircuts I’ve gotten in Lagos. Very professional!"
              rating={4}
            />
            <ReviewCard
              date="June 9, 2020 4:35 PM"
              comment="Honestly one of the best haircuts I’ve gotten in Lagos. Very professional!"
              rating={4}
            />
          </View>
        </InfoCard>
        <View style={{}}>
          <Button
            style={{
              backgroundColor: '#3D3D3D',
              width: width - 40,
              marginHorizontal: 20,
            }}>
            Leave a review
          </Button>
        </View>
      </Container>
    </>
  );
};

export default ProviderProfile;
