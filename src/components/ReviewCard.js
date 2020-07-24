import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Block from './Block';
import Typo from './Typo';
import theme from '../constants';
import Line from './Line';

const defaultImage =
'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS9bBO-hib7wq7ZH2D_c29li8Ew1j9CmVU63w&usqp=CAU';
// 'https://images.vexels.com/media/users/3/135118/isolated/preview/676bf0e9f3c16649cd7f426c6dcd755a-flat-user-sign-with-round-background-by-vexels.png';

const InfoCard = ({
  date,
  comment,
  providerLga,
  providerState,
  image,
  onPress,
  style,
}) => (
  <>
    <View row spaceBetween style={[styles.infoCard, style]}>
      <View style={{flexDirection: 'row'}}>
        <Image
          style={{
            height: 50,
            width: 50,
            backgroundColor: theme.colors.primary,
            borderRadius: 70,
            alignSelf: "center"
          }}
          resizeMode="cover"
          source={{
            uri: image ? image : defaultImage,
          }}
        />

        <View
          style={{
            paddingLeft: 10,
            flexDirection: 'column',
            maxWidth: Dimensions.get("screen").width
          }}>
          <Typo weight="l" size="s" color="mid">
            {date}
          </Typo>
          <Typo alt size="sm" style={{width: Dimensions.get("screen").width - 100                   }}>
            {comment}
          </Typo>
        </View>
          <View style={{padding: 10}}>
        {/* <Icon name="star" color={theme.colors.yellow} size={theme.sizes.xl} /> */}
        </View>
      </View>
    </View>
            <Line margin={1} />
            </>
);

export default InfoCard;

const styles = StyleSheet.create({
  infoCard: {
    width: Dimensions.get("screen").width,
    borderRadius: 10,
    // backgroundColor:"red",
    padding: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
    zIndex: -1,
  },
  infoCardText: {
    paddingTop: 5,
  },
});
