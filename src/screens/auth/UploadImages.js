import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Switch,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import Block from '../../components/Block';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../constants';
import Container from '../../components/Container';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {addBusinessImage, updateBusiness} from '../../services/authentication';
import Typo from '../../components/Typo';
import Line from '../../components/Line';
import {ScrollView} from 'react-native-gesture-handler';

const UploadImages = ({navigation, route}) => {
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [image, setImage] = useState([]);

  const addImageToArray = img => {
    setImages([...images, img]);
  };

  const uploadImage = () => {
    ImagePicker.openPicker({
      // width: 1200,
      // height: 800,
      cropping: true,
      includeBase64: true,
      compressImageQuality: 0.8,
      freeStyleCropEnabled: true,
    }).then(async image => {
      setImage(`data:${image.mime};base64,${image.data}`);
      addImageToArray(`data:${image.mime};base64,${image.data}`);
      // call add image endpoint
      const res = await addBusinessImage(
        route.params.businessId,
        `data:${image.mime};base64,${image.data}`,
      );
    });
  };

  // TODO: TEST THIS
  const completeRegistration = async () => {
    if (description == undefined || description === '') {
      // FAILED
      // TODO: Display modal to show description is required
      return;
    }
    const response = await updateBusiness(route.params.businessId, {
      description,
    });

    if (response.status === 0) {
      navigation.navigate('Registration Complete');
    }
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
                backgroundColor: theme.colors.dark,
              }}
              source={{uri: img}}
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
        // bordered
        onChangeText={text => setDescription(text)}
        multiline={true}
        numberOfLines={10}
        placeholder="Enter a description"
      />

      <Button onPress={() => completeRegistration()}>
        Complete Registration
      </Button>
    </Container>
  );
};

export default UploadImages;
