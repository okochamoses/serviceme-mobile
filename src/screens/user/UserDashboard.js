import React, {useState, useEffect, useContext} from 'react';
import {Dimensions, Image, TouchableOpacity, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import Typo from '../../components/Typo';
import Container from '../../components/Container';
import Block from '../../components/Block';
import theme from '../../constants';
import Input from '../../components/Input';
import action from '../../redux/InitActions';
import storage from '../../utils/storage';
import ProviderCard from '../../components/ProviderCard';
import Modal from '../../components/Modal';
import Line from '../../components/Line';

const {height, width} = Dimensions.get('screen');
const img = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS9bBO-hib7wq7ZH2D_c29li8Ew1j9CmVU63w&usqp=CAU"

const UserDashboard = ({navigation}) => {
  const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const toggleIsLoading = () => dispatch(action.toggleLoading());
  const toggleError = () => dispatch(action.toggleError());

  const _getCategories = async () => {
    setCategories(await storage.getCategories());
  };

  useEffect(() => {
    const loadCategories = async () => {
      await _getCategories();
    };
    loadCategories();
  }, []);

  return (
    <Container full style={{width, flexShrink: 1}}>
      <Modal type="error" message={errorMessage} />
      <Block
        row
        center
        style={{
          marginHorizontal: 20,
          height: 100,
          backgroundColor: theme.colors.primary,
        }}>
        <Block center vCenter style={{padding: 20}}>
          <Input
            placeholder="Search"
            icon="magnify"
            containerStyle={{width: width - 40}}
          />
        </Block>
      </Block>
      <Block row style={{width, flexWrap: 'wrap'}}>
        {categories.map((category, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => navigation.navigate('Search', {screen: "Search", params: {categoryId: category._id}})}>
            <Block center style={styles.categoryBlock}>
              <Image
                source={{uri: category.image}}
                resizeMode="contain"
                style={styles.categoryImage}
              />
              <Typo size="sm" color="dark" style={{paddingBottom: 10}}>
                {category.name}
              </Typo>
            </Block>
          </TouchableOpacity>
        ))}
        <View style={{width: "100%", alignItems: "flex-end",}}>
          <TouchableOpacity onPress={() => navigation.navigate("Categories")}>
        <Typo color="primary" style={{padding: 10}}>...see more</Typo>
        </TouchableOpacity>
        </View>
      </Block>
      <Block style={{paddingTop: 20}}>
        <Typo weight="s" style={{paddingLeft: 20, paddingBottom: 10}}>Top Rated Providers</Typo>
        <ProviderCard category="Makeup Artiste" image={img} providerRating="4.0" providerLga="Agege" providerName="Test Provider" providerState="Lagos" />
        <Line margin={1} />
        <ProviderCard category="Makeup Artiste" image={img} providerRating="4.0" providerLga="Agege" providerName="Test Provider" providerState="Lagos" />
        <Line margin={1} />
        <ProviderCard category="Makeup Artiste" image={img} providerRating="4.0" providerLga="Agege" providerName="Test Provider" providerState="Lagos" />
        <Line margin={1} />
        <ProviderCard category="Makeup Artiste" image={img} providerRating="4.0" providerLga="Agege" providerName="Test Provider" providerState="Lagos" />
        <Line margin={1} />
        <ProviderCard category="Makeup Artiste" image={img} providerRating="4.0" providerLga="Agege" providerName="Test Provider" providerState="Lagos" />
      </Block>
    </Container>
  );
};

export default UserDashboard;

const styles = StyleSheet.create({
  categoryBlock: {
    borderBottomColor: theme.colors.light,
    borderBottomWidth: 1,
    borderRightColor: theme.colors.light,
    borderRightWidth: 1,
    width: width / 3,
    height: width / 3,
    justifyContent: 'flex-end',
  },
  categoryImage: {width: '45%', height: '45%', margin: 10},
});
