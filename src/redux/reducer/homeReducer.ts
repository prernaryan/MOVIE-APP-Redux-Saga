import {Movie} from '../saga/homeSaga';
import {
  TRENDING_MOVIES,
  TRENDING_MOVIES_SUCCESS,
  TRENDING_MOVIES_FAIL,
  RATE_MOVIE,
  RATE_MOVIE_SUCCESS,
  RATE_MOVIE_FAIL,
  DELETE_RATE_MOVIE,
  DELETE_RATE_MOVIE_SUCCESS,
  DELETE_RATE_MOVIE_FAIL,
  GET_RATED_MOVIES,
  GET_RATED_MOVIES_SUCCESS,
  GET_RATED_MOVIES_FAIL,
} from '../Type';

interface TrendingMoviesState {
  trendingMoviesRes: {
    loading: boolean;
    data?: Movie[] | null;
    error: string | null;
    totalPage: number;
    currentPage: number;
  };
  rateMovieRes: {
    loading: boolean;
    success: boolean;
    error: string | null;
  };
  deleteRateMovieRes: {
    loading: boolean;
    success: boolean;
    error: string | null;
  };
  getRatedMoviesRes: {
    loading: boolean;
    data?: string | null;
    error: string | null;
  };
}

const initialState: TrendingMoviesState = {
  trendingMoviesRes: {
    loading: false,
    data: null,
    error: null,
    totalPage: 1,
    currentPage: 1,
  },
  rateMovieRes: {
    loading: false,
    success: false,
    error: null,
  },
  deleteRateMovieRes: {
    loading: false,
    success: false,
    error: null,
  },
  getRatedMoviesRes: {
    loading: false,
    data: null,
    error: null,
  },
};

export const homeReducer = (
  state = initialState,
  action: any,
): TrendingMoviesState => {
  switch (action.type) {
    case TRENDING_MOVIES:
      return {
        ...state,
        trendingMoviesRes: {
          ...state.trendingMoviesRes,
          loading: true,
          error: null,
        },
      };
    case TRENDING_MOVIES_SUCCESS:
      return {
        ...state,
        trendingMoviesRes: {
          loading: false,
          data:
            action.currentPage > 1 && state.trendingMoviesRes.data
              ? [...state.trendingMoviesRes.data, ...action.data]
              : action.data,
          error: null,
          currentPage: action.currentPage,
          totalPage: action.totalPage,
        },
      };
    case TRENDING_MOVIES_FAIL:
      return {
        ...state,
        trendingMoviesRes: {
          ...state.trendingMoviesRes,
          loading: false,
          error: action.data,
        },
      };
    case RATE_MOVIE:
      return {
        ...state,
        rateMovieRes: {loading: true, success: false, error: null},
      };
    case RATE_MOVIE_SUCCESS:
      return {
        ...state,
        rateMovieRes: {loading: false, success: true, error: null},
      };
    case RATE_MOVIE_FAIL:
      return {
        ...state,
        rateMovieRes: {loading: false, success: false, error: action.data},
      };
    case DELETE_RATE_MOVIE:
      return {
        ...state,
        deleteRateMovieRes: {loading: true, success: false, error: null},
      };
    case DELETE_RATE_MOVIE_SUCCESS:
      return {
        ...state,
        deleteRateMovieRes: {loading: false, success: true, error: null},
      };
    case DELETE_RATE_MOVIE_FAIL:
      return {
        ...state,
        deleteRateMovieRes: {
          loading: false,
          success: false,
          error: action.data,
        },
      };
    case GET_RATED_MOVIES:
      return {
        ...state,
        getRatedMoviesRes: {loading: true, error: null, data: ''},
      };
    case GET_RATED_MOVIES_SUCCESS:
      return {
        ...state,
        getRatedMoviesRes: {
          loading: false,
          data: action.data,
          error: null,
        },
      };
    case GET_RATED_MOVIES_FAIL:
      return {
        ...state,
        getRatedMoviesRes: {loading: false, error: action.data},
      };
    default:
      return state;
  }
};
