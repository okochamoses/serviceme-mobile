import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNModal from 'react-native-modal';
import Block from './Block';
import Typo from './Typo';
import theme from '../constants';
import Button from './Button';
import { AuthContext } from '../contexts/AuthContext';

const Modal = ({message, type}) => {
  const [errorModal, setErrorModal] = useState(false);
  const {isAuthenticated, toggleIsAuthenticated} = useContext(AuthContext)
  switch (type) {
    case 'error':
      return (
        <RNModal
          animationType="slide"
          isVisible={isAuthenticated}
          onBackdropPress={() => toggleIsAuthenticated()}
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
                <Button onPress={() => toggleIsAuthenticated()}>Close</Button>
              </Block>
            </View>
          </View>
        </RNModal>
      );

    case 'success':
      return (
        <RNModal
          animationType="slide"
          isVisible={errorModal}
          onBackdropPress={() => setErrorModal(false)}
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
                <Button bordered onPress={() => setErrorModal(false)}>
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
          isVisible={errorModal}
          onBackdropPress={() => setErrorModal(false)}
          hasBackdrop={true}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Block center vCenter>
                <Typo
                  style={{paddingVertical: 10, textAlign: 'center'}}
                  weight="l">
                  {message}
                </Typo>
                <Button bordered onPress={() => setErrorModal(false)}>
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
