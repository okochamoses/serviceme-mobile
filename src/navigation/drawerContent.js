import React, {useContext, useState, useEffect} from 'react';
import {Image, Share, Switch, View, Alert, Platform} from 'react-native';
import Typo from '../components/Typo';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Block from '../components/Block';
import Line from '../components/Line';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../constants';
import AsyncStorage from '@react-native-community/async-storage';
import InitActions from '../redux/InitActions';
import {useDispatch, useSelector} from 'react-redux';
import storage from '../utils/storage';

const DrawerContent = props => {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState({});

  const isLoggedIn = useSelector(({init}) => init.isLoggedIn);
  const currentScreen = useSelector(({init}) => init.isAuthenticated);

  const _getCategories = async () => {
    setProfile(await storage.getProfile());
  };

  useEffect(() => {
    const loadCategories = async () => {
      await _getCategories();
    };
    loadCategories();
  }, []);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Serviceme.ng | Get all the services you can think of at your fingertips! \nDownload at https://www.serviceme.ng',
        url: 'https://www.serviceme.ng',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(result.activityType);
          // shared with activity type of result.activityType
        } else {
          console.log('BBB: ' < result.activityType);
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('CLOSED: ', result.activityType);
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const logoutAlert = () =>
    Alert.alert('Logout', 'Are you sure you want to logout', [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => logout(),
      },
    ]);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('profile');
      dispatch(InitActions.navigateToAuth());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.white}}>
      <DrawerContentScrollView {...props}>
        <View>
          <Block center style={{padding: 30}}>
            <Image
              source={require('../assets/images/logo.png')}
              style={{height: 100, resizeMode: 'contain'}}
            />
          </Block>
        </View>
        <Line />

        <View>
          <DrawerItem
            icon={() => (
              <Icon name="apps" size={18} color={theme.colors.primary} />
            )}
            label="Dashboard"
            onPress={() => props.navigation.navigate('Dashboard')}
          />
          <DrawerItem
            icon={() => (
              <Icon name="buffer" size={18} color={theme.colors.primary} />
            )}
            label="Categories"
            onPress={() => props.navigation.navigate('Categories')}
          />
          <DrawerItem
            activeTintColor={theme.colors.primary}
            icon={() => (
              <Icon name="magnify" size={18} color={theme.colors.primary} />
            )}
            label="Search"
            onPress={() => props.navigation.navigate('Search')}
          />
          <DrawerItem
            icon={() => (
              <Icon
                name="share-variant"
                size={18}
                color={theme.colors.primary}
              />
            )}
            label="Share"
            onPress={onShare}
          />
          <DrawerItem
            icon={() => (
              <Icon
                name="bell-outline"
                size={18}
                color={theme.colors.primary}
              />
            )}
            label="Notifications"
            onPress={() => props.navigation.navigate('Notifications')}
          />
        </View>
        <Line />
        <View>
          <DrawerItem
            icon={() => (
              <Icon name="cogs" size={18} color={theme.colors.primary} />
            )}
            label="Settings"
            onPress={() => props.navigation.navigate('Settings')}
          />
          {profile ? (
            <DrawerItem
              icon={() => (
                <Icon name="logout" size={18} color={theme.colors.primary} />
              )}
              label="Logout"
              onPress={() => logoutAlert()}
            />
          ) : (
            <DrawerItem
              icon={() => (
                <Icon name="at" size={18} color={theme.colors.primary} />
              )}
              label="Sign In / Register"
              onPress={() =>  dispatch(InitActions.navigateToAuth())}
            />
          )}
          {/* {profile !== null ? (
              <DrawerItem
                icon={() => (
                  <Icon
                    name="logout"
                    size={18}
                    color={theme.colors.primary}
                  />
                )}
                label="Logout"
                onPress={() => logoutAlert()}
              />
            ) : null} */}
        </View>
      </DrawerContentScrollView>

      <Block row center style={{paddingBottom: 50, paddingLeft: 20}}>
        {profile.isProvider ? (
          <>
            <Switch
              //   disabled={this.state.loading}
              style={{
                transform:
                  Platform.OS === 'ios' ? [{scaleX: 0.8}, {scaleY: 0.8}] : [],
              }}
              trackColor={{
                false: theme.colors.primary,
                true: theme.colors.success,
              }}
              ios_backgroundColor={theme.colors.primary}
              onValueChange={
                () => dispatch(InitActions.navigateToProvider())
                // this.setState({
                //   registerAsProvider: !this.state.registerAsProvider,
                // })
              }
              //   value={this.state.registerAsProvider}
            />
            <Typo>Switch to provider dashboard</Typo>
          </>
        ) : null}
      </Block>
    </View>
  );
};

export default DrawerContent;
