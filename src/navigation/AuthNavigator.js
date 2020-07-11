import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Auth from '../screens/Auth';
import Login from '../screens/Login';
import RegisterProvider from '../screens/RegisterProvider';

const AuthStack = createStackNavigator();

const AuthStackNavigator = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="Welcome"
      options={{headerShown: false}}
      component={Auth}
    />
    <AuthStack.Screen
      name="Login"
      options={{headerTitle: null, headerBackTitleVisible: false}}
      component={Login}
    />
    <AuthStack.Screen
      name="Register"
      options={{headerTitle: null, headerBackTitleVisible: false}}
      component={RegisterProvider}
    />
  </AuthStack.Navigator>
);

export default AuthStackNavigator;
