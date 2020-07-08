/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useContext} from 'react';
import { NavigationContainer, DefaultTheme } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator } from "@react-navigation/drawer"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import Auth from './src/screens/Auth';
import Login from './src/screens/Login';
import RegisterProvider from './src/screens/RegisterProvider';
import ProviderDashboard from './src/screens/provider/Dashboard';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import constant from "./src/constants/index"
import Typo from './src/components/Typo';
import { AuthContext } from './src/contexts/AuthContext';

const AuthStack = createStackNavigator();
const Dashboard = createDrawerNavigator();
const Register = createMaterialTopTabNavigator();
const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#FFF"
  },
}

const DashboardStack = () => (
  <Dashboard.Navigator  screenOptions={{
      headerLeft: () => (
        <TouchableOpacity style={{paddingHorizontal: 10}} onPress={ ()=> navigation.opedDrawer()}>
          <Icon name="menu" size={32} color="#fff"/>
        </TouchableOpacity>
      ),
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontFamily: "SFProDisplay-Regular",
        fontSize: 18
      },
      headerStyle: {
        backgroundColor: constant.colors.primary,
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      },
      headerTintColor: "#fff"
    }} >
    <Dashboard.Screen name="ProviderDashboard" component={ProviderDashboard} />
  </Dashboard.Navigator>
)

const RegisterTab = () => (
  <Register.Navigator>
    <Register.Screen name="Customer" component={RegisterProvider} />
    <Register.Screen name="Provider" component={Auth} />
  </Register.Navigator>
)

const AuthStackNav = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Welcome" options={{ headerShown: false }} component={Auth} />
    <AuthStack.Screen name="Login" options={{ headerTitle: null }} component={Login} />
    <AuthStack.Screen name="Register" options={{ headerTitle: null }} component={RegisterTab} />
    <AuthStack.Screen name="Dashboard"
      // options={{
      //   headerLeft: () => (
      //     <TouchableOpacity style={{paddingHorizontal: 10}} onPress={ ()=> navigation.opedDrawer()}>
      //       <Icon name="menu" size={32} color="#fff"/>
      //     </TouchableOpacity>
      //   ),
      //   headerTitleAlign: "center",
      //   headerTitleStyle: {
      //     fontFamily: "SFProDisplay-Regular",
      //     fontSize: 18
      //   },
      //   headerStyle: {
      //     backgroundColor: constant.colors.primary,
      //     elevation: 0, // remove shadow on Android
      //     shadowOpacity: 0, // remove shadow on iOS
      //   },
      //   headerTintColor: "#fff"
      // }} 
      component={DashboardStack} />
  </AuthStack.Navigator>
)



const App = () => {
  const auth = useContext(AuthContext);
  return (
      <NavigationContainer theme={Theme}>
        {auth.isAuthenticated ? <AuthStackNav /> : <DashboardStack />}
      </NavigationContainer>
  )
  // return (
  //   <>
  //     <StatusBar barStyle="dark" />
  //     <SafeAreaView>
  //       <ScrollView
  //         contentInsetAdjustmentBehavior="automatic"
  //         style={styles.scrollView}>
  //         <Header />
  //         {global.HermesInternal == null ? null : (
  //           <View style={styles.engine}>
  //             <Text style={styles.footer}>Engine: Hermes</Text>
  //           </View>
  //         )}
  //         <View style={styles.body}>
  //           <Button>Login</Button>
  //           <Button bordered>Sign Up</Button>
  //           <View style={styles.sectionContainer}>
  //             <Text style={styles.sectionTitle}>Step One</Text>
  //             <Text style={styles.sectionDescription}>
  //               Edit <Text style={styles.highlight}>App.js</Text> to change this
  //               screen and then come back to see your edits.
  //             </Text>
  //           </View>
  //           <View style={styles.sectionContainer}>
  //             <Text style={styles.sectionTitle}>See Your Changes</Text>
  //             <Text style={styles.sectionDescription}>
  //               <ReloadInstructions />
  //             </Text>
  //           </View>
  //           <View style={styles.sectionContainer}>
  //             <Text style={styles.sectionTitle}>Debug</Text>
  //             <Text style={styles.sectionDescription}>
  //               <DebugInstructions />
  //             </Text>
  //           </View>
  //           <View style={styles.sectionContainer}>
  //             <Text style={styles.sectionTitle}>Learn More</Text>
  //             <Text style={styles.sectionDescription}>
  //               Read the docs to discover what to do next:
  //             </Text>
  //           </View>
  //           <LearnMoreLinks />
  //         </View>
  //       </ScrollView>
  //     </SafeAreaView>
  //   </>
  // );
};

export default App;
