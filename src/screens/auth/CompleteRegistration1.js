import React, {useContext, useState, useEffect} from 'react';
import {ActivityIndicator, Text} from 'react-native';
import theme from '../../constants';
import Container from '../../components/Container';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import {
  addBusiness as addBusinessService,
  getCategories,
} from '../../services/authentication';
import ModalSelector from 'react-native-modal-selector';
import locations from '../../utils/states.json';

const CompleteRegistration1 = ({navigation, route}) => {
  const _getCategories = async () => {
    const response = await getCategories();
    if (response.status === 0) {
      const sorted = [];
      response.data.forEach(cat => {
        sorted.push({label: cat.name, key: cat._id});
      });
      setCategories(sorted);
    } else {
      return null;
    }
  };

  const states = locations.map(location => ({
    label: location.name,
    key: location.code,
  }));

  useEffect(() => {
    async function load() {
      await _getCategories();
    }
    load();
    console.log(categories);
  }, []);

  const {providerId} = route.params
  console.log("PROVIDER ID HERE:" + providerId)

  const [categories, setCategories] = useState([]);
  const [lgas, setLgas] = useState([]);

  const [businessName, setBusinessName] = useState('New Biz');
  const [businessEmail, setBusinessEmail] = useState('okc@email.com');
  const [businessType, setBusinessType] = useState('5f08d346ef31f67a2f6fa55c');
  const [phone, setphone] = useState('2340901212121');
  const [streetAddress, setstreetAddress] = useState('12 K close');
  const [businessState, setbusinessState] = useState('Lagos');
  const [lga, setlga] = useState('Agege');
  const [landmark, setlandmark] = useState('Agege Industries');
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const toggleShow = () => setShow(!show);

  const addBusiness = async () => {
    setLoading(true);
    const response = await addBusinessService(
      businessName,
      streetAddress,
      businessState,
      lga,
      landmark,
      providerId,
      businessType,
      businessEmail,
      phone,
    );
    console.log(response);
    if (response.status === 0) {
      // navigate to completeReg2
      const newBusiness = response.data.businesses.pop();
      navigation.navigate("Upload Images", {businessId: newBusiness._id})
    } else {
      // show error
      setErrorMessage(response.description);
      setShow(true);
    }
    setLoading(false);
  };

  const onSetBusinessState = item => {
    setbusinessState(item);
    setlga('');
    const lgaArr = [];
    locations.forEach(location => {
      if (location.name === item) {
        location.lgas.forEach(l => {
          lgaArr.push({label: l, key: l});
        });
      }
    });
    setLgas(lgaArr);
  };

  const getCategoryFromKey = item => {
    let name = '';
    categories.forEach(cat => {
      if (cat.key === item) {
        name = cat.label;
      }
    });
    return name;
  };

  return (
    <Container>
      <Modal
        message={errorMessage}
        type="error"
        open={show}
        close={() => toggleShow()}
      />
      <Input
        onChangeText={text => setBusinessName(text)}
        label="Business Name"
      />

      <ModalSelector
        style={{width: '100%', maxHeight: '80%'}}
        selectTextStyle={{left: 0}}
        data={categories}
        sectionStyle={{justifyContent: 'space-between'}}
        initValue="Select something yummy!"
        animationType="none"
        optionTextStyle={{color: theme.colors.dark, textAlign: 'left'}}
        backdropPressToClose={true}
        cancelText="Close"
        onChange={option => {
          setBusinessType(option.key);
        }}>
        <Input
          label="Business Type"
          placeholder="Select Category"
          icon="chevron-down"
          value={getCategoryFromKey(businessType)}
        />
      </ModalSelector>

      <Input
        onChangeText={text => setBusinessEmail(text)}
        label="Business Email"
      />
      <Input onChangeText={text => setphone(text)} label="Business Phone" />
      <Input
        onChangeText={text => setstreetAddress(text)}
        label="Street Address"
      />

      <ModalSelector
        style={{width: '100%'}}
        selectTextStyle={{left: 0}}
        data={states}
        sectionStyle={{justifyContent: 'space-between'}}
        initValue="Select something yummy!"
        animationType="none"
        optionTextStyle={{color: theme.colors.dark, textAlign: 'left'}}
        backdropPressToClose={true}
        cancelText="Close"
        optionContainerStyle={{maxHeight: '80%', backgroundColor: 'white'}}
        onChange={option => {
          onSetBusinessState(option.label);
        }}>
        <Input label="State" icon="chevron-down" value={businessState} />
      </ModalSelector>
      <ModalSelector
        style={{width: '100%', paddingTop: 10}}
        selectTextStyle={{left: 0}}
        data={lgas}
        sectionStyle={{justifyContent: 'space-between'}}
        initValue=""
        animationType="none"
        optionTextStyle={{color: theme.colors.dark, textAlign: 'left'}}
        backdropPressToClose={true}
        cancelText="Close"
        onChange={option => {
          setlga(option.label);
        }}>
        <Input label="Local Government Area" icon="chevron-down" value={lga} />
      </ModalSelector>
      <Input onChangeText={text => setlandmark(text)} label="Landmark" />
      <Button onPress={() => addBusiness()}>
        {loading ? (
          <ActivityIndicator color={theme.colors.white} />
        ) : (
          'Proceed to Images'
        )}
      </Button>
    </Container>
  );
};

export default CompleteRegistration1;
