import React, {useEffect, useState, useContext} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNModal from 'react-native-modal';
import Block from './Block';
import Typo from './Typo';
import theme from '../constants';
import Button from './Button';
import {AuthContext} from '../contexts/AuthContext';
import { useSelector } from 'react-redux';

const Loading = ({isLoading}) => {
  return (
    <RNModal isVisible={isLoading}>
      <ActivityIndicator color={theme.colors.primary} size="large" />
    </RNModal>
  );
};

export default Loading;
