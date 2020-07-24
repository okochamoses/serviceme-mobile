import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Auth from '../screens/Auth';
import Login from '../screens/Login';
import RegisterProvider from '../screens/RegisterProvider';
import Terms from '../screens/auth/Terms';
import CompleteRegistration1 from '../screens/auth/CompleteRegistration1';
import UploadImages from '../screens/auth/UploadImages';
import theme from "../constants"
import headerProps from './headerProps';
import RegistrationComplete from '../screens/auth/RegistrationComplete';

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
    <AuthStack.Screen
      name="Terms and Conditions"
      options={({ navigation, route }) => {
        return {...(headerProps("chevron-left", () => navigation.goBack()))}
      }}
      component={Terms}
    />
    <AuthStack.Screen
      name="Complete Registration 1"
      key={"Complete Registration 1"}
      options={({ navigation, route }) => {
        return {...(headerProps("chevron-left", () => navigation.goBack())), headerTitle: "Complete Registration"}
      }}
      component={CompleteRegistration1}
    />
    <AuthStack.Screen
      name="Upload Images"
      key={"Upload Images"}
      options={({ navigation, route }) => {
        return {...(headerProps("chevron-left", () => navigation.goBack())), headerTitle: "Upload Images"}
      }}
      component={UploadImages}
    />
    <AuthStack.Screen
      name="Registration Complete"
      key={"Registration Complete"}
      options={{
        headerShown: false
      }
      }
      component={RegistrationComplete}
    />
  </AuthStack.Navigator>
);

export default AuthStackNavigator;
