import Details from '../screens/Dashboard/Details';
import Home from '../screens/Dashboard/Home';
import WatchList from '../screens/Dashboard/WatchList';
import Login from '../screens/Login';

export enum RouteName {
  LOGIN = 'login',
  HOME = 'home',
  DETAILS = 'details',
  WATCH_LIST = 'watchList',
  PROFILE = 'profile',
  TRENDINGPEOPLE = 'trendingPeople',
}

export const UNAUTHORISED_SCREENS = {
  [RouteName.LOGIN]: Login,
};

export const AUTHORISED_SCREENS = {
  [RouteName.HOME]: Home,
  [RouteName.DETAILS]: Details,
};

export const CUSTOM_SCREENS = {
  [RouteName.LOGIN]: Login,
  [RouteName.HOME]: Home,
  [RouteName.WATCH_LIST]: WatchList,
};
