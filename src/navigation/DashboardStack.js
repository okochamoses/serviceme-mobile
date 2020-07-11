import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import theme from '../constants';
import {createDrawerNavigator} from '@react-navigation/drawer';

import ProviderDashboard from '../screens/provider/Dashboard';
import BusinessesScreen from '../screens/provider/Businesses';
import BusinessProfile from '../screens/provider/BusinessProfile';
import headerProps from './headerProps';

const Dashboard = createDrawerNavigator();
const Businesses = createStackNavigator();

const BusinessStack = () => (
  <Businesses.Navigator initialRouteName="Businesses & Categories">
    <Businesses.Screen
      options={({navigation}) =>
        headerProps('menu', navigation.openDrawer, 'plus', () =>
          navigation.navigate('Profile'),
        )
      }
      name="Businesses & Categories"
      component={BusinessesScreen}
    />
    <Businesses.Screen
      options={({navigation}) =>
        headerProps('chevron-left', () => navigation.goBack())
      }
      name="Profile"
      component={BusinessProfile}
    />
  </Businesses.Navigator>
);

const DashboardStack = () => (
  <Dashboard.Navigator
    drawerContentOptions={{
      activeTintColor: theme.colors.primary,
      labelStyle: {fontSize: theme.sizes.md},
    }}>
    <Dashboard.Screen name="Dashboard" component={ProviderDashboard} />
    <Dashboard.Screen name="Businesses" component={BusinessStack} />
  </Dashboard.Navigator>
);

export default DashboardStack;
