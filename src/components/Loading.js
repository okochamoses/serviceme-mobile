import React from 'react';
import {ActivityIndicator} from 'react-native';
import RNModal from 'react-native-modal';
import theme from '../constants';

const Loading = ({isLoading}) => {
  return (
    <RNModal isVisible={isLoading}>
      <ActivityIndicator color={theme.colors.primary} size="large" />
    </RNModal>
  );
};

export default Loading;
