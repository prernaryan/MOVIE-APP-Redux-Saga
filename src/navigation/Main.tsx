import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import Login from '../screens/Login';
import {RootStackParamList} from '../types/navigation.type';
import {navigationRef} from '../services/navigationService';
import {RouteName} from '../constants';
import {useSelector} from 'react-redux';
import Home from '../screens/Dashboard/Home';
import Details from '../screens/Dashboard/Details';
import WatchList from '../screens/Dashboard/WatchList';
import Profile from '../screens/Dashboard/Profile';
import TrendingPeople from '../screens/Dashboard/TrendingPeople';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Main: React.FC = () => {
  const {sessionAPiRes} = useSelector((state: any) => state.auth);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={
          sessionAPiRes?.session_id ? RouteName.HOME : RouteName.LOGIN
        }
        screenOptions={
          {
            headerShown: false,
            gestureEnabled: false,
          } as NativeStackNavigationOptions
        }>
        <Stack.Screen name={RouteName.LOGIN} component={Login} />
        <Stack.Screen name={RouteName.HOME} component={Home} />
        <Stack.Screen name={RouteName.DETAILS} component={Details} />
        <Stack.Screen name={RouteName.WATCH_LIST} component={WatchList} />
        <Stack.Screen name={RouteName.PROFILE} component={Profile} />
        <Stack.Screen
          name={RouteName.TRENDINGPEOPLE}
          component={TrendingPeople}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
