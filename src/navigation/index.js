import React from 'react';
import UserNavigation from './UserNavigation';
import DashboardNavigation from './DashboardStack';
import AuthNavigator from './AuthNavigator';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Loading from '../components/Loading';

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFF',
  },
};

const Nav = () => {
  const isLoading = useSelector(state => state.init.isLoading);

  const renderNavigator = () => {
    switch ('user') {
      case 'auth':
        return <AuthNavigator />;
      case 'user':
        return <UserNavigation />;
      default:
        return <DashboardNavigation />;
    }
  };
  return (
    <NavigationContainer theme={Theme}>
      {renderNavigator()}
      <Loading isLoading={isLoading} />
    </NavigationContainer>
  );
};

export default Nav;
