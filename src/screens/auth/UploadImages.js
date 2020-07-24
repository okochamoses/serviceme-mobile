import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Switch,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import Block from '../../components/Block';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../constants';
import Container from '../../components/Container';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {addBusiness} from '../../services/authentication';
import Typo from '../../components/Typo';
import Line from '../../components/Line';
import {ScrollView} from 'react-native-gesture-handler';

const UploadImages = () => {
  const [businessEmail, setBusinessEmail] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [phone, setphone] = useState('');
  const [streetAddress, setstreetAddress] = useState('');
  const [businessState, setbusinessState] = useState('');
  const [lga, setlga] = useState('');
  const [image, setImage] = useState('');
  const [images, setImages] = useState([]);

  const addImageToArray = img => {
    setImages([...images, img]);
  };

  const uploadImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      compressImageQuality: 0.8,
      freeStyleCropEnabled: true,
    }).then(image => {
      setImage(image.data);
      addImageToArray(image.data);
      console.log(image.data);
    });
  };
  return (
    <Container>
      <Typo weight="s" size="m" style={{width: '100%'}}>
        Upload Images
      </Typo>
      <Typo weight="l" style={{width: '100%'}}>
        Please upload some images that describe your business
      </Typo>
      <Block>
        <TouchableOpacity onPress={() => uploadImage()}>
          <Block
            center
            vCenter
            style={{
              height: 200,
              backgroundColor: theme.colors.light,
              borderRadius: 10,
              marginVertical: 10,
              width: null,
            }}>
            <Icon name="plus" size={72} color={theme.colors.white} />
            <Typo weight="" color="mid">
              {images.length}/10
            </Typo>
          </Block>
        </TouchableOpacity>
      </Block>
      <Block row>
        <ScrollView horizontal={true} sty>
          {images.map(img => (
            <Image
              style={{
                marginRight: 20,
                width: 150,
                height: 150,
                resizeMode: 'contain',
                borderWidth: 1,
                borderColor: theme.colors.light,
              }}
              source={{uri: `data:image/gif;base64,${img}`}}
            />
          ))}
        </ScrollView>
      </Block>

      <Line />

      <Typo weight="s" size="m" style={{width: '100%'}}>
        Tell us about your business
      </Typo>
      <Typo weight="l" style={{width: '100%', paddingVertical: 5}}>
        Use this section to show clients you have the skills and experience
        they're looking for.
      </Typo>
      <Typo weight="l" style={{width: '100%', paddingVertical: 5}}>
        - Describe your strengths and skills
      </Typo>
      <Typo weight="l" style={{width: '100%', paddingVertical: 5}}>
        - Highlight projects, accomplishments and education
      </Typo>
      <Typo weight="l" style={{width: '100%', paddingVertical: 5}}>
        - Keep it short and make sure it's error-free
      </Typo>

      <Input
        multiline={true}
        numberOfLines={10}
      />

      <Button onPress={() => uploadImage()}>Proceed to Images</Button>
    </Container>
  );
};

export default UploadImages;
