import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import theme from '../constants';
import {createDrawerNavigator} from '@react-navigation/drawer';

import ProviderDashboard from '../screens/provider/Dashboard';
import AnalyticsScreen from '../screens/provider/Analytics';
import SubscriptionScreen from '../screens/provider/Subscriptions';
import SubscribeScreen from '../screens/provider/Subscribe';
import BusinessesScreen from '../screens/provider/Businesses';
import BusinessProfile from '../screens/provider/BusinessProfile';
import headerProps from './headerProps';
import ProviderDrawerContent from './ProviderDrawerContent';

const Provider = createDrawerNavigator();
const Businesses = createStackNavigator();
const Profile = createStackNavigator();
const Dashboard = createStackNavigator();
const Analytics = createStackNavigator();
const Subscription = createStackNavigator();

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
  </Businesses.Navigator>
);

const DashboardStack = () => (
  <Dashboard.Navigator initialRouteName="Dashboard">
    <Dashboard.Screen
      options={({navigation}) =>
        headerProps('menu', navigation.openDrawer, 'bell-outline', () =>
          navigation.navigate('Profile'),
        )
      }
      name="Dashboard"
      component={ProviderDashboard}
    />
  </Dashboard.Navigator>
);

const ProfileStack = () => (
  <Profile.Navigator initialRouteName="Profile">
    <Profile.Screen
      options={({navigation}) =>
        headerProps('chevron-left', () => navigation.goBack())
      }
      name="Profile"
      component={BusinessProfile}
    />
  </Profile.Navigator>
);

const AnalyticsStack = () => (
  <Analytics.Navigator initialRouteName="Analytics">
    <Analytics.Screen
      options={({navigation}) =>
        headerProps('menu', navigation.openDrawer, 'bell-outline', () =>
          navigation.navigate('Dashboard'),
        )
      }
      name="Analytics"
      component={AnalyticsScreen}
    />
  </Analytics.Navigator>
);

const SubscriptionStack = () => (
  <Subscription.Navigator initialRouteName="Subscription">
    <Subscription.Screen
      options={({navigation}) =>
        headerProps('menu', navigation.openDrawer, 'bell-outline', () =>
          navigation.navigate('Dashboard'),
        )
      }
      name="Subscription"
      component={SubscriptionScreen}
    />
    <Subscription.Screen
      options={({navigation}) =>
        headerProps('chevron-left', () => navigation.goBack())
      }
      name="Subscribe"
      component={SubscribeScreen}
    />
  </Subscription.Navigator>
);

const DashboardNavigator = () => (
  <Provider.Navigator
    drawerContent={props => <ProviderDrawerContent {...props} />}>
    <Provider.Screen name="Dashboard" component={DashboardStack} />
    <Provider.Screen name="Businesses" component={BusinessStack} />
    <Provider.Screen name="Profile" component={ProfileStack} />
    <Provider.Screen name="Analytics" component={AnalyticsStack} />
    <Provider.Screen name="Subscription" component={SubscriptionStack} />
  </Provider.Navigator>
);

export default DashboardNavigator;
