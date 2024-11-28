import {
  ADD_WATCHLIST,
  ADD_WATCHLIST_SUCCESS,
  ADD_WATCHLIST_FAIL,
  GET_WATCHLIST,
  GET_WATCHLIST_SUCCESS,
  GET_WATCHLIST_FAIL,
} from '../Type';
import {showMessage} from 'react-native-flash-message';
import {call, delay, put, takeLatest} from 'redux-saga/effects';
import {popUpType} from '../../constants';
import {hideAppLoader, showAppLoader} from '../action/loaderAction';
import {addWatchlistApi, getWatchlistApi} from '../../utils/apiFunction';
import {MovieResponse} from './homeSaga';

export interface AddWatchlistAction {
  type: typeof ADD_WATCHLIST;
  data: {
    movieId: number;
  };
  payload: {
    success: boolean;
    message: string;
  };
}

export interface AddWatchlistResponse {
  success: boolean;
  status_message: string;
  data: {
    movieId: number;
    rating: number;
  };
}

function* addWatchListSaga(action: AddWatchlistAction) {
  try {
    yield put(showAppLoader());
    const response: AddWatchlistResponse = yield call(
      addWatchlistApi,
      action.data,
    );
    console.log('API Response:', response);
    if (response?.success) {
      yield put({
        type: ADD_WATCHLIST_SUCCESS,
        data: response?.data,
      });
      showMessage({
        message: 'Added to Watchlist successfully',
        type: popUpType.success,
      });
      yield delay(2000);
      yield put({
        type: GET_WATCHLIST,
      });
    } else {
      yield put({
        type: ADD_WATCHLIST_FAIL,
        data: 'failed to add watchlist',
      });
    }
  } catch (error: any) {
    yield put({
      type: ADD_WATCHLIST_FAIL,
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
export function* watchAddWatchList() {
  yield takeLatest(ADD_WATCHLIST, addWatchListSaga);
}

function* getWatchlistSaga() {
  try {
    yield put(showAppLoader());
    const response: MovieResponse = yield call(getWatchlistApi);
    console.log('API Response:', response);
    if (response?.results) {
      yield put({
        type: GET_WATCHLIST_SUCCESS,
        data: response?.results,
      });
    } else {
      yield put({
        type: GET_WATCHLIST_FAIL,
        data: 'failed to get watchlist',
      });
    }
  } catch (error: any) {
    yield put({
      type: GET_WATCHLIST_FAIL,
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
export function* watchGetWatchlist() {
  yield takeLatest(GET_WATCHLIST, getWatchlistSaga);
}
