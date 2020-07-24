import React from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Block from './Block';
import Typo from './Typo';
import theme from '../constants';
import Line from './Line';
import headerProps from '../navigation/headerProps';
const {width, height} = Dimensions.get('window');

const InfoCard = ({title, link, body, children, style}) => (
  <Block center style={styles.infoCard}>
    <Block row center spaceBetween style={{paddingHorizontal: 20}}>
      <Typo weight="s">{title}</Typo>
      <TouchableOpacity>
        <Typo size="sm" color="primary">
          {link}
        </Typo>
      </TouchableOpacity>
    </Block>
    <Line />
    {body ? (
      <Block row center spaceBetween style={{paddingHorizontal: 20}}>
        <Typo weight="l" style={{width: '100%'}}>
          {body}
        </Typo>
      </Block>
    ) : (
      children
    )}
  </Block>
);

export default InfoCard;

const styles = StyleSheet.create({
  infoCard: {
    width: '100%',
    borderRadius: 10,
    paddingVertical: 10,
    paddingBottom: 20,
  },
  infoCardText: {
    paddingTop: 5,
  },
});
