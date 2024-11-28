import {combineReducers} from 'redux';
import {authReducer} from './authReducer';
import {homeReducer} from './homeReducer';
import loaderReducer from './loaderReducer';
import {watchlistReducer} from './watchlistReducer';
import {trendingPpleReducer} from './trendindPpleReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
  loader: loaderReducer,
  watchlist: watchlistReducer,
  trendingPeople: trendingPpleReducer,
});

export default rootReducer;
