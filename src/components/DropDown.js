import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import theme from '../constants';
import { Dimensions } from 'react-native';

const X = ({placeholder, zIndex, options, onChangeItem, value}) => {
  return (
    <DropDownPicker
      items={options ? options : []}
      placeholder={placeholder}
      placeholderStyle={{color: theme.colors.mid}}
      // zIndex={zIndex}
      searchable={true}
      customTickIcon={() => <Icon name="map" size={18} color="#900" />}
      max={80}
      defaultValue={value ? value: null}
      dropDownMaxHeight={Dimensions.get("screen").height - 300}
      containerStyle={{
        flex: 1,
        width: 'auto',
        backgroundColor: theme.colors.white,
      }}
      style={{
        height: 50,
        backgroundColor: theme.colors.white,
        borderColor: theme.colors.light,
      }}
      itemStyle={{
        flex: 1,
        justifyContent: 'flex-start',
      }}
      dropDownStyle={{backgroundColor: '#fafafa'}}
      onChangeItem={item => onChangeItem(item.value)}
    />
  );
};

export default X;
