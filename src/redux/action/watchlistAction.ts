import {ADD_WATCHLIST, GET_WATCHLIST} from '../Type';

export const addWatchlistAction = (data: {movieId: number}) => ({
  type: ADD_WATCHLIST,
  data: data,
});

export const getWatchlistAction = () => ({
  type: GET_WATCHLIST,
});
