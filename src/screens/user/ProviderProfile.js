import React, {useEffect, useState} from 'react';
import {View, Dimensions, ScrollView, Image} from 'react-native';
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
import Modal from '../../components/Modal';
import {addVisitor, getProfile} from '../../services/authentication';
import Input from '../../components/Input';
const {height, width} = Dimensions.get('window');

const ProviderProfile = ({navigation, route}) => {
  const {business} = route.params;
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [onPremiseModal, setOnPremiseModal] = useState(false);
  const [homeServiceModal, setHomeServiceModal] = useState(false);
  const [profile, setProfile] = useState({});
  const [address, setaddress] = useState({});
  const [onPremiseAddress, setonPremiseAddress] = useState({});
  const [name, setName] = useState({});
  const [phone, setPhone] = useState({});
  

  useEffect(() => {
    setImages(route.params.business ? route.params.business.images : []);
    setDescription(
      route.params.business ? route.params.business.description : '',
    );
    addVisitorApi();
    setProfile(getProfile().data);
    // do api call here as a visitor
  }, []);

  const addVisitorApi = async () => {
    // let ip, latitude, longitude;
    const ip = await publicIP();
    Geolocation.getCurrentPosition(async position => {
      await addVisitor(
        ip,
        route.params.business._id,
        route.params.business.category,
        position.coords.longitude,
        position.coords.latitude,
        'deviceId',
      );
    });
  };

  const makeHomeServiceRequest = () => {
    console.log(name, phone, address)
    // TODO: API call to backend for request placement
  }
  
  return (
    <>
      <Container full>
        {/* Home Service Modal */}
        <Modal
          open={homeServiceModal}
          message={'SMOS'}
          close={() => {
            makeHomeServiceRequest()
            setHomeServiceModal(false)
          }}
          closeText="Make Request"
          visible={true}
          style={{width: '95%', padding: 30}}>
          <Typo weight="s">Home Service</Typo>
          <Line />
          <Block>
            <Typo style={{paddingVertical: 5,}}>
              Enter the address in which the service is required
            </Typo>

            <Line />
            <Input label="Name" small placeholder="" onChange={text => setName(text)} />
            <Input label="Phone" small placeholder="" onChange={text => setPhone(text)} />
            <Input label="Address" small placeholder="" onChange={text => setaddress(text)} />
          </Block>
        </Modal>

        {/* ON PREMISE MODAL */}
        <Modal
          open={onPremiseModal}
          message={'SMOS'}
          close={() => setOnPremiseModal(false)}
          closeText="Make Request"
          visible={true}
          style={{width: '95%', padding: 30}}>
          <Typo weight="s">On Premise</Typo>
          <Line />
          <Block>
            <Typo style={{paddingVertical: 5}}>
              An alert will be sent to the provider letting them know you will
              be at their place of operations. Here are the details of the
              provider
            </Typo>
            <Typo style={{paddingVertical: 5}}>
              Address: {`${business.streetAddress}, ${business.lga}`}
            </Typo>
            <Typo style={{paddingVertical: 5}}>Phone: {business.phone}</Typo>
            <Typo style={{paddingVertical: 5, paddingBottom: 20}}>
              Landmark: {business.landmark}
            </Typo>
          </Block>
        </Modal>
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
          <Button
            style={{flex: 1, marginRight: 10}}
            onPress={() => setHomeServiceModal(true)}>
            Home Service
          </Button>
          <Button
            bordered
            style={{flex: 1, marginLeft: 10}}
            onPress={() => setOnPremiseModal(true)}>
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
