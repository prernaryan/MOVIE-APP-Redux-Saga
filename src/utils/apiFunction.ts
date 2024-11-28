import {API} from '../constants/apis';
import {store} from '../redux/store';
import axiosService from '../services/axiosService';

export const createTokenApi = () => {
  return axiosService.get(API.requestToken);
};

export const loginApi = (data: {
  username: string;
  password: string;
  request_token: string;
}) => {
  return axiosService.post(API.login, data);
};

export const createSessionApi = (data: {request_token: string}) => {
  return axiosService.post(API.sessionId, data);
};

export const getTrendingMoviesApi = (data: number) => {
  return axiosService.get(`${API.trendingMovies}${data}`);
};

export const postRatingApi = (data: {movieId: number; rating: number}) => {
  const session_id = store.getState().auth?.sessionAPiRes?.session_id;
  console.log(session_id, 'session_id');

  const body = {value: data?.rating};
  const url = `${API.ratingMovies}${data?.movieId}/rating?session_id=${session_id}`;
  return axiosService.post(url, body);
};
export const deleteRatingApi = (data: {movieId: number}) => {
  const session_id = store.getState().auth?.sessionAPiRes?.session_id;
  const url = `${API.ratingMovies}${data?.movieId}/rating?session_id=${session_id}`;
  return axiosService.delete(url);
};

export const getRatedMoviesApi = () => {
  const session_id = store.getState().auth?.sessionAPiRes?.session_id;
  const url = `${API.getRatedMovies}${session_id}&sort_by=created_at.asc`;
  return axiosService.get(url);
};

export const addWatchlistApi = (data: {movieId: number}) => {
  const session_id = store.getState().auth?.sessionAPiRes?.session_id;
  const url = `${API.addWatchlist}${session_id}`;
  const body = {media_type: 'movie', media_id: data?.movieId, watchlist: true};
  return axiosService.post(url, body);
};

export const getWatchlistApi = () => {
  const session_id = store.getState().auth?.sessionAPiRes?.session_id;
  const url = `${API.getWatchlist}${session_id}&sort_by=created_at.asc`;
  console.log(url, 'urlurl');

  return axiosService.get(url);
};

export const logoutApi = () => {
  const session_id = store.getState().auth?.sessionAPiRes?.session_id;
  const url = API.deleteSession;
  const body = {session_id: session_id};
  return axiosService.delete(url, {data: body});
};

export const getTrendingPeopleApi = (data: number) => {
  return axiosService.get(`${API.trendingPerson}${data}`);
};
