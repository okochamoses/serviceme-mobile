import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from "../constants"

const baseHeaderStyle = {
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontFamily: 'SFProText-Regular',
    fontSize: 16,
  },
  headerStyle: {
    backgroundColor: theme.colors.primary,
    elevation: 0, // remove shadow on Android
    shadowOpacity: 0, // remove shadow on iOS
  },
  headerTintColor: '#fff',
};

const headerProps = (leftIcon, leftNav, rightIcon, rightNav) => ({
  headerLeft: () => headerIcon(leftIcon, leftNav),
  headerRight: () => headerIcon(rightIcon, rightNav),
  ...baseHeaderStyle,
});

const headerIcon = (icon, nav) =>
  icon === undefined ? null : (
    <TouchableOpacity style={{paddingHorizontal: 10}} onPress={() => nav()}>
      <Icon name={icon} size={28} color="#fff" />
    </TouchableOpacity>
  );

export default headerProps;
