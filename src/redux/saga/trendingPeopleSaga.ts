import {
  TRENDING_PEOPLE_SUCCESS,
  TRENDING_PEOPLE,
  TRENDING_PEOPLE_FAIL,
} from './../Type';
import {call, delay, put, takeLatest} from 'redux-saga/effects';
import {popUpType} from '../../constants';
import {hideAppLoader, showAppLoader} from '../action/loaderAction';
import {showMessage} from 'react-native-flash-message';
import {getTrendingPeopleApi} from '../../utils/apiFunction';

interface PersonData {
  page: number;
  results: Person[];
  total_pages: number;
}

interface Person {
  adult: boolean;
  id: number;
  name: string;
  original_name: string;
  media_type: string;
  popularity: number;
  gender: number;
  known_for_department: string;
  profile_path: string;
  known_for: KnownFor[];
}

interface KnownFor {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

function* trendingPeopleSaga(action) {
  try {
    if (action?.data === 1) {
      yield put(showAppLoader());
    }
    const response: PersonData = yield call(getTrendingPeopleApi, action.data);
    console.log('trendingPeopleSaga Response:', response?.results);
    if (response.results) {
      yield put({
        type: TRENDING_PEOPLE_SUCCESS,
        data: response.results,
        currentPage: response.page,
        totalPage: response.total_pages,
      });
    } else {
      yield put({
        type: TRENDING_PEOPLE_FAIL,
        data: 'No data received from API',
      });
    }
  } catch (error: any) {
    yield put({
      type: TRENDING_PEOPLE_FAIL,
      data: error.message || 'Unknown error',
    });
  } finally {
    yield put(hideAppLoader());
  }
}
export function* watchtrendingPeopleSaga() {
  yield takeLatest(TRENDING_PEOPLE, trendingPeopleSaga);
}
