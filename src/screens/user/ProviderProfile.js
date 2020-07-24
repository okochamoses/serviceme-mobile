import React, {useEffect} from 'react';
import {View, Dimensions} from 'react-native';
import Typo from '../../components/Typo';
import Block from '../../components/Block';
import Container from '../../components/Container';
import Button from '../../components/Button';
import Line from '../../components/Line';
import InfoCard from '../../components/InfoCard';
import ReviewCard from '../../components/ReviewCard';
const {height, width} = Dimensions.get('window');

const ProviderProfile = ({navigation, route}) => {
  return (
    <>
      <Container full>
        <View style={{backgroundColor: 'orange', height: 200, width: '100%'}}>
          <Typo>Image Container</Typo>
        </View>
        <Block row spaceBetween style={{padding: 20}}>
          <Button style={{flex: 1, marginRight: 10}}>Home Service</Button>
          <Button bordered style={{flex: 1, marginLeft: 10}}>
            On Premise
          </Button>
        </Block>
        <Line margin={10} />
        <InfoCard
          title={'Description'}
          link=""
          body={'Here at Wicked Cutz, we take our profession as an artform, giving you the best haircuts you can get in and around Lagos state. \n\nWith over 70 branches in the lagos metropolis alone, you can be sure to get access to our services anytime. Give us a ring and we’ll be right at your doorstep'}
          onPressLink={() => {}}
        />
        <InfoCard title={'Reviews'} link="" onPressLink={() => {}} style={{paddingHorizontal: 0, width: null}}>
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
            style={{backgroundColor: '#3D3D3D', width: width - 40, marginHorizontal: 20}}>
            Leave a review
          </Button>
        </View>
      </Container>
    </>
  );
};

export default ProviderProfile;
