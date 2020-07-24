import React from 'react';
import {
  Image,
  StyleSheet,
  View,TouchableOpacity, Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Block from './Block';
import Typo from './Typo';
import theme from '../constants';

const defaultImage = "https://images.vexels.com/media/users/3/135118/isolated/preview/676bf0e9f3c16649cd7f426c6dcd755a-flat-user-sign-with-round-background-by-vexels.png";
// 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS9bBO-hib7wq7ZH2D_c29li8Ew1j9CmVU63w&usqp=CAU

const ProviderCard = ({providerName, providerRating, providerLga, providerState, image, category, onPress}) => (
  <TouchableOpacity onPress={onPress} style={{width: Dimensions.get("screen").width}}>
    <Block row spaceBetween style={styles.infoCard}>
      <View style={{flexDirection: 'row'}}>
        <Image
          style={{
            height: 70,
            width: 70,
            backgroundColor: theme.colors.primary,
            borderRadius: 5,
          }}
          resizeMode="cover"
          source={{
            uri: image ? image : defaultImage}}
        />

        <View
          style={{
            paddingLeft: 10,
            //   paddingBottom: 10,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <Typo weight="s" size="md">
            {providerName}
          </Typo>
          <Block row center>
        {category ? <Typo size="s">{category} | </Typo> : null }
            <Icon
              name="star"
              color={theme.colors.yellow}
              size={theme.sizes.md}
            />
            <Typo alt style={{fontSize: 10}}>
              {providerRating ? providerRating : "No Rating"}
            </Typo>
          </Block>
          <View
            style={{
              backgroundColor: theme.colors.light,
              padding: 3,
              paddingHorizontal: 20,
              borderRadius: 40,
            }}>
            <Typo size="sm" weight="l">
              {`${providerLga}, ${providerState}`}
            </Typo>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon name="star" color={theme.colors.yellow} size={theme.sizes.xl} />
      </View>
    </Block>
  </TouchableOpacity>
);

export default ProviderCard;

const styles = StyleSheet.create({
  infoCard: {
    width: '100%',
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
    zIndex: -1
  },
  infoCardText: {
    paddingTop: 5,
  },
});
