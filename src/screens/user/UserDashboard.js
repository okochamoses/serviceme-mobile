import React, {useState, useEffect, useContext} from 'react';
import {Dimensions, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import Typo from '../../components/Typo';
import Container from '../../components/Container';
import Block from '../../components/Block';
import theme from '../../constants';
import Input from '../../components/Input';
import action from '../../redux/InitActions';

const {height, width} = Dimensions.get('screen');
import {getCategories} from '../../services/authentication';
import Modal from '../../components/Modal';

const UserDashboard = ({navigation}) => {
  const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const dispath = useDispatch();

  const _getCategories = async () => {
    dispath(action.toggleLoading());
    const response = await getCategories();
    if (response.status === 0) {
      setCategories(response.data);
    } else {
      // toggleIsLoading();
      setErrorMessage(response.description);
      // toggleIsAuthenticated();
    }
    // toggleIsLoading();
  };
  useEffect(() => {
    async function loadCategories() {
      await _getCategories();
    }
    loadCategories();
    console.log(categories);
  }, []);
  return (
    <Container full style={{width, flexShrink: 1}}>
      <Modal type="error" message={errorMessage} show={true} />
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
        {categories.map(category => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Categories', {id: category._id})
            }>
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
