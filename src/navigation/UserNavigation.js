import React, { useEffect, useContext } from "react"
import UserDashboard from "../screens/user/UserDashboard";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Categories from "../screens/user/Categories";
import Search from "../screens/user/Search";
import Settings from "../screens/user/Settings";
import Messages from "../screens/user/Messages";
import ProviderProfile from "../screens/user/ProviderProfile";
import Notifications from "../screens/user/Notifications";
import theme from "../constants"
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import AuthContextProvider, { AuthContext } from "../contexts/AuthContext";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";
import headerProps from "./headerProps"
import DrawerContent from "./drawerContent";

const User = createDrawerNavigator();

const DashboardStack = createStackNavigator();
const DashboardNavigator = () => (
    <DashboardStack.Navigator>
        <DashboardStack.Screen options={({ navigation }) => headerProps("menu", () => navigation.openDrawer())} name="Dashboard" component={UserDashboard} />
    </DashboardStack.Navigator>
)

const CategoriesStack = createStackNavigator();
const CategoriesNavigator = () => (
    <CategoriesStack.Navigator>
        <CategoriesStack.Screen options={({ navigation }) => headerProps("menu", () => navigation.openDrawer())} name="Categories" component={Categories} />
    </CategoriesStack.Navigator>
)

const SearchStack = createStackNavigator();
const SearchNavigator = () => (
    <SearchStack.Navigator>
        <SearchStack.Screen options={({ navigation }) => headerProps("menu", () => navigation.openDrawer())} name="Search" component={Search} />
    </SearchStack.Navigator>
)

const ShareStack = createStackNavigator();
const ShareNavigator = () => (
    <ShareStack.Navigator>
        <ShareStack.Screen options={({ navigation }) => headerProps("menu", () => navigation.openDrawer())} name="Share" component={Share} />
    </ShareStack.Navigator>
)


const SettingsStack = createStackNavigator();
const SettingsNavigator = () => (
    <SettingsStack.Navigator>
        <SettingsStack.Screen options={({ navigation }) => headerProps("menu", () => navigation.openDrawer())} name="Settings" component={Settings} />
    </SettingsStack.Navigator>
)


const MessagesStack = createStackNavigator();
const MessagesNavigator = () => (
    <MessagesStack.Navigator>
        <MessagesStack.Screen options={({ navigation }) => headerProps("menu", () => navigation.openDrawer())} name="Messages" component={Messages} />
    </MessagesStack.Navigator>
)

const ProviderProfileStack = createStackNavigator();
const ProviderProfileNavigator = () => (
    <ProviderProfileStack.Navigator>
        <ProviderProfileStack.Screen options={({ navigation }) => headerProps("chevron-left", () => navigation.goBack())} name="ProviderProfileScreen" component={ProviderProfile} />
    </ProviderProfileStack.Navigator>
)

const NotificationsStack = createStackNavigator();
const NotificationsNavigator = () => (
    <NotificationsStack.Navigator>
        <NotificationsStack.Screen options={({ navigation }) => headerProps("menu", () => navigation.openDrawer())} name="Notifications" component={Notifications} />
    </NotificationsStack.Navigator>
)

const UserStack = () => {
    const isLoading = useSelector(state => state.isLoading)
    return(
        <>
    <User.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <User.Screen name="Dashboard" component={DashboardNavigator} />
        <User.Screen name="Categories" component={CategoriesNavigator} />
        <User.Screen name="Search" component={SearchNavigator} />
        <User.Screen name="Share" component={ShareNavigator} />
        <User.Screen name="Settings" component={SettingsNavigator} />
        <User.Screen name="Messages" component={MessagesNavigator} />
        <User.Screen name="Provider Profile" component={ProviderProfileNavigator} />
        <User.Screen name="Notifications" component={NotificationsNavigator} />
        <User.Screen name="Logout" component={SearchNavigator} />
    </User.Navigator>
    <Loading isLoading={isLoading} />
    </>
)}

export default UserStack;