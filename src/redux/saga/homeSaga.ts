import {showMessage} from 'react-native-flash-message';
import {
  deleteRatingApi,
  getRatedMoviesApi,
  getTrendingMoviesApi,
  postRatingApi,
} from '../../utils/apiFunction';
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
import {call, delay, put, takeLatest} from 'redux-saga/effects';
import {popUpType} from '../../constants';
import {hideAppLoader, showAppLoader} from '../action/loaderAction';

export interface Movie {
  backdrop_path: string;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

function* trendingMoviesSaga(action) {
  try {
    if (action?.data === 1) {
      yield put(showAppLoader());
    }
    const response: MovieResponse = yield call(
      getTrendingMoviesApi,
      action?.data ?? 1,
    );
    if (response.results) {
      yield put({
        type: TRENDING_MOVIES_SUCCESS,
        data: response.results,
        currentPage: response.page,
        totalPage: response.total_pages,
      });
    } else {
      yield put({
        type: TRENDING_MOVIES_FAIL,
        data: 'No data received from API',
      });
    }
  } catch (error: any) {
    yield put({
      type: TRENDING_MOVIES_FAIL,
      data: error.message || 'Unknown error',
    });
  } finally {
    yield put(hideAppLoader());
  }
}
export function* watchtrendingMoviesSaga() {
  yield takeLatest(TRENDING_MOVIES, trendingMoviesSaga);
}

interface RateMovieAction {
  type: typeof RATE_MOVIE;
  data: {
    movieId: number;
    rating: number;
  };
}

interface RatedResponse {
  success: boolean;
  status_message: string;
}

function* rateMovieSaga(action: RateMovieAction) {
  try {
    yield put(showAppLoader());
    // const {movieId, rating} = action.data;
    const response: RatedResponse = yield call(postRatingApi, action.data);
    if (response?.success) {
      yield put({
        type: RATE_MOVIE_SUCCESS,
        data: response,
      });
      yield delay(2000);
      yield put({
        type: GET_RATED_MOVIES,
      });
      showMessage({
        message: 'Rating saved successfully',
        type: popUpType.success,
      });
    } else {
      yield put({
        type: RATE_MOVIE_FAIL,
        data: 'Rating Failed',
      });
    }
  } catch (error: any) {
    yield put({
      type: RATE_MOVIE_FAIL,
      data: error.message || 'Unknown error',
    });
    showMessage({
      message: error.message || 'Something went wrong',
      type: popUpType.danger,
    });
  } finally {
    yield put(hideAppLoader());
  }
}
export function* watchRateMovie() {
  yield takeLatest(RATE_MOVIE, rateMovieSaga);
}

function* deleteRateMovieSaga(action: RateMovieAction) {
  try {
    yield put(showAppLoader());
    // const {movieId, rating} = action.data;
    const response: RatedResponse = yield call(deleteRatingApi, action.data);
    if (response?.success) {
      yield put({
        type: DELETE_RATE_MOVIE_SUCCESS,
        data: response,
      });
      yield delay(2000);
      yield put({
        type: GET_RATED_MOVIES,
      });
      showMessage({
        message: 'Rating Deleted successfully',
        type: popUpType.success,
      });
    } else {
      yield put({
        type: DELETE_RATE_MOVIE_FAIL,
        data: 'Delete Rating Failed',
      });
    }
  } catch (error: any) {
    yield put({
      type: DELETE_RATE_MOVIE_FAIL,
      data: error.message || 'Unknown error',
    });
    showMessage({
      message: error.message || 'Something went wrong',
      type: popUpType.danger,
    });
  } finally {
    yield put(hideAppLoader());
  }
}
export function* watchDeleteRateMovie() {
  yield takeLatest(DELETE_RATE_MOVIE, deleteRateMovieSaga);
}

function* getRatedMovieSaga() {
  try {
    yield put(showAppLoader());
    const response: MovieResponse = yield call(getRatedMoviesApi);
    if (response) {
      yield put({
        type: GET_RATED_MOVIES_SUCCESS,
        data: response?.results,
      });
    } else {
      yield put({
        type: GET_RATED_MOVIES_FAIL,
        data: 'Get Rating Failed',
      });
      showMessage({
        message: 'Something went wrong! Get Rating Failed',
        type: popUpType.danger,
      });
    }
  } catch (error: any) {
    yield put({
      type: GET_RATED_MOVIES_FAIL,
      data: error.message || 'Unknown error',
    });
    showMessage({
      message: error.message || 'Something went wrong',
      type: popUpType.danger,
    });
  } finally {
    yield put(hideAppLoader());
  }
}
export function* watchGetRatedMovie() {
  yield takeLatest(GET_RATED_MOVIES, getRatedMovieSaga);
}
