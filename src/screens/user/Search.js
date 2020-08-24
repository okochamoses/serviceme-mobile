import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import Container from '../../components/Container';
import Block from '../../components/Block';
import DropDown from '../../components/DropDown';
import Line from '../../components/Line';
import ProviderCard from '../../components/ProviderCard';
import storage from '../../utils/storage';
import locations from '../../utils/states.json';
import {searchBusinesses} from '../../services/authentication';
import Typo from '../../components/Typo';
import {useDispatch} from 'react-redux';
import InitActions from '../../redux/InitActions';
import ModalSelector from 'react-native-modal-selector';
import Input from '../../components/Input';
import theme from '../../constants';

const Search = ({navigation, route}) => {
  const [states, setStates] = useState([]);
  const [lgas, setLgas] = useState([]);
  const [categoryItemList, setCategoryItemList] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedLga, setSelectedLga] = useState('');
  const [businesses, setBusinesses] = useState([]);

  const dispatch = useDispatch();
  const toggleIsLoading = () => dispatch(InitActions.toggleLoading());

  async function load() {
    const cate = await storage.getCategories();
    const list = [];
    cate.forEach(category => {
      list.push({label: category.name, key: category._id});
    });
    const st = [];
    locations.forEach(location => {
      st.push({label: location.name, key: location.code});
    });
    setStates(st);
    setCategoryItemList(list);
    setSelectedCategory(
      route.params.categoryId !== undefined
        ? () => onChangeCategoryItem(route.params.categoryId)
        : '',
    );
  }

  useFocusEffect(
    React.useCallback(() => {
      load();
      return () => {
        setSelectedCategory('');
        setSelectedState('');
        setSelectedLga('');
        setBusinesses([])
      };

    }, []),
    [route, navigation],
  );

  const onChangeCategoryItem = async item => {
    setSelectedCategory(item);
    setSelectedState('');
    setSelectedLga('');
  };

  const onChangeStateItem = async item => {
    let l = [];
    locations.forEach(s => {
      if (s.code === item) {
        s.lgas.forEach(lga => {
          l.push({key: lga, label: lga});
        });
      }
    });
    setLgas(l);
    await setSelectedState(item);
    setSelectedLga('');
    await search(item);
  };

  const onChangeLgaItem = async item => {
    setSelectedLga(item);
    if (selectedCategory !== null || selectedCategory !== '') {
      await search(selectedState, item);
    }
  };

  const search = async (state, lga) => {
    toggleIsLoading();
    const response = await searchBusinesses(
      selectedCategory,
      state ? state : selectedState,
      lga ? lga : selectedLga,
    );
    if (response.status === 0) {
      setBusinesses(response.data);
    }
    toggleIsLoading();
  };

  const getSelectedCategory = () => {
    let name = '';
    categoryItemList.forEach(cat => {
      if (cat.key === selectedCategory) {
        name = cat.label;
      }
    });
    return name;
  };

  const getSelectedState = () => {
    let name = '';
    locations.forEach(cat => {
      if (cat.code === selectedState) {
        name = cat.name;
      }
    });
    return name;
  };

  const renderBusinesses = () => {
    return businesses.map((business, idx) => {
      return (
        <ProviderCard
          key={idx}
          image={business.images.length === 0 ? undefined : business.images[0]}
          providerName={business.businessName}
          providerRating={business.rating}
          providerLga={business.lga}
          providerState={business.state}
          onPress={() => {
            navigation.navigate('Provider Profile', {
              screen: 'Provider',
              params: {business},
            });
          }}
        />
      );
    });
  };

  return (
    <Container full style={{}}>
      <Block style={styles.dropdownContainer} row>
        <ModalSelector
          style={
            ([styles.dropdownContainer], {width: '100%', paddingHorizontal: 20})
          }
          selectTextStyle={{left: 0}}
          data={categoryItemList}
          sectionStyle={{justifyContent: 'space-between'}}
          initValue="Select something yummy!"
          animationType="none"
          optionTextStyle={{color: theme.colors.dark, textAlign: 'left'}}
          backdropPressToClose={true}
          cancelText="Close"
          onChange={option => {
            onChangeCategoryItem(option.key);
          }}>
          <Input
            placeholder="Select Category"
            icon="chevron-down"
            value={getSelectedCategory()}
          />
        </ModalSelector>
      </Block>
      <Block style={styles.dropdownContainer} row>
        <ModalSelector
          style={([styles.dropdownContainer], {width: '50%', paddingLeft: 20})}
          selectTextStyle={{left: 0}}
          data={states}
          sectionStyle={{justifyContent: 'space-between'}}
          onChange={option => {
            onChangeStateItem(option.key);
          }}>
          <Input
            placeholder="Select State"
            icon="chevron-down"
            value={getSelectedState()}
          />
        </ModalSelector>
        <ModalSelector
          style={([styles.dropdownContainer], {width: '50%', paddingRight: 20})}
          selectTextStyle={{left: 0}}
          data={lgas}
          sectionStyle={{justifyContent: 'space-between'}}
          onChange={option => {
            onChangeLgaItem(option.key);
          }}>
          <Input
            placeholder="Select LGA"
            icon="chevron-down"
            value={selectedLga}
          />
        </ModalSelector>
      </Block>
      <Line style={{paddingVertical: 5, paddingTop: 20, zIndex: -1}} />
      {businesses.length === 0 ? (
        <Typo style={{}}>No values to display</Typo>
      ) : (
        renderBusinesses()
      )}
      {/* <ProviderCard providerName="Wicked Cutz" providerRating="4.1" providerLga="Gbagada" providerState="Lagos" /> */}
    </Container>
  );
};

export default Search;

const styles = StyleSheet.create({
  dropdownContainer: {
    paddingTop: 20,
  },
});
