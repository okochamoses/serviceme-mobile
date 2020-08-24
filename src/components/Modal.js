import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNModal from 'react-native-modal';
import Block from './Block';
import Typo from './Typo';
import theme from '../constants';
import Button from './Button';
import { AuthContext } from '../contexts/AuthContext';
import action from "../redux/InitActions"
import { useDispatch, useSelector } from 'react-redux';

const Modal = ({message, type, open, close}) => {
  const isError = open === undefined ? useSelector(state => state.init.isError) : open
  const dispatch = useDispatch();
  
  const toggleError = () => {
    return open === undefined ? dispatch(action.toggleError()) : close()
  }
  switch (type) {
    case 'error':
      return (
        <RNModal
          animationType="slide"
          isVisible={isError}
          onBackdropPress={() => toggleError()}
          hasBackdrop={true}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Block center vCenter>
                <Icon
                  name="close-circle"
                  size={48}
                  color={theme.colors.primary}
                />
                <Typo
                  style={{paddingVertical: 10, textAlign: 'center'}}
                  weight="l">
                  {message}
                </Typo>
                <Button onPress={() => toggleError()}>Close</Button>
              </Block>
            </View>
          </View>
        </RNModal>
      );

    case 'success':
      return (
        <RNModal
          animationType="slide"
          isVisible={isError}
          onBackdropPress={() => toggleError()}
          hasBackdrop={true}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Block center vCenter>
                <Icon name="check" size={48} color={theme.colors.success} />
                <Typo
                  style={{paddingVertical: 10, textAlign: 'center'}}
                  weight="l">
                  {message}
                </Typo>
                <Button bordered onPress={() => toggleError()}>
                  Close
                </Button>
              </Block>
            </View>
          </View>
        </RNModal>
      );
    default:
      return (
        <RNModal
          animationType="slide"
          isVisible={isError}
          onBackdropPress={() => toggleError()}
          hasBackdrop={true}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Block center vCenter>
                <Typo
                  style={{paddingVertical: 10, textAlign: 'center'}}
                  weight="l">
                  {message}
                </Typo>
                <Button bordered onPress={() => toggleError()}>
                  Close
                </Button>
              </Block>
            </View>
          </View>
        </RNModal>
      );
  }
};

export default Modal;

const styles = StyleSheet.create({
  centeredView: {
    //   flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    opacity: 1,
    width: '80%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
