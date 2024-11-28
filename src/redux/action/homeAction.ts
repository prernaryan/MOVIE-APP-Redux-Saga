import {
  DELETE_RATE_MOVIE,
  RATE_MOVIE,
  TRENDING_MOVIES,
  GET_RATED_MOVIES,
} from '../Type';

// Define the action type interface
interface TrendingMoviesAction {
  type: typeof TRENDING_MOVIES;
  data: number;
}

export const trendinMoviesAction = (page: number): TrendingMoviesAction => {
  return {
    type: TRENDING_MOVIES,
    data: page,
  };
};

export const rateMovie = (data: {movieId: number; rating: number}) => ({
  type: RATE_MOVIE,
  data: data,
});

export const deleteRateMovie = (data: {movieId: number}) => ({
  type: DELETE_RATE_MOVIE,
  data: data,
});

export const getRatedMoviesAction = () => ({
  type: GET_RATED_MOVIES,
});
