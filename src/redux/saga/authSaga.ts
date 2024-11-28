import {call, put, takeLatest} from 'redux-saga/effects';
import {
  LOGIN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REQUEST_TOKEN,
  REQUEST_TOKEN_FAIL,
  REQUEST_TOKEN_SUCCESS,
  SESSION,
  SESSION_SUCCESS,
  SESSION_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT,
} from '../Type';
import {
  createSessionApi,
  createTokenApi,
  loginApi,
  logoutApi,
} from '../../utils/apiFunction';
import {showMessage} from 'react-native-flash-message';
import {popUpType, RouteName} from '../../constants';
import {navigate} from '../../services/navigationService';
import {hideAppLoader, showAppLoader} from '../action/loaderAction';
interface RequestAction {
  type: any;
  data: {
    username: string;
    password: string;
  };
}
export interface TokenApiResponseState {
  success: boolean;
  expires_at: string;
  request_token: string;
}
function* handleRequestToken(action: RequestAction) {
  try {
    const {username, password} = action.data;
    console.log('Username:', username, 'Password:', password);
    yield put(showAppLoader());
    const response: TokenApiResponseState = yield call(createTokenApi);
    console.log('TOKEN API Response:', response);
    if (response.success) {
      yield put({
        type: REQUEST_TOKEN_SUCCESS,
        data: response.request_token,
      });
      yield put({
        type: LOGIN,
        data: {username, password, request_token: response.request_token},
      });
    } else {
      yield put({
        type: REQUEST_TOKEN_FAIL,
        data: 'Token request failed',
      });
    }
  } catch (error: any) {
    yield put({
      type: REQUEST_TOKEN_FAIL,
      error: error.message || 'Unknown error',
    });
  } finally {
    yield put(hideAppLoader());
  }
}

export function* watchTokenSaga() {
  yield takeLatest(REQUEST_TOKEN, handleRequestToken);
}

interface LoginAction {
  type: any;
  data: {
    username: string;
    password: string;
    request_token: string;
  };
}
function* handleLogin(action: LoginAction) {
  try {
    const {username, password, request_token} = action.data;
    yield put(showAppLoader());
    const response: any = yield call(loginApi, {
      username,
      password,
      request_token,
    });
    console.log('LOGIN API Response:', response);
    if (response.success) {
      yield put({
        type: LOGIN_SUCCESS,
        data: response,
      });
      yield put({
        type: SESSION,
        data: {request_token: response.request_token},
      });
    } else {
      yield put({
        type: LOGIN_FAIL,
        data: 'Login failed',
      });
    }
  } catch (error: any) {
    yield put({
      type: LOGIN_FAIL,
      data: error.message || 'Unknown error',
    });
  } finally {
    yield put(hideAppLoader());
  }
}
export function* watchLoginSaga() {
  yield takeLatest(LOGIN, handleLogin);
}

interface SessionAction {
  type: any;
  data: {
    request_token: string;
  };
}
function* handleSession(action: SessionAction) {
  try {
    const {request_token} = action.data;
    yield put(showAppLoader());
    const response: {success: boolean; session_id: string} = yield call(
      createSessionApi,
      {request_token},
    );
    console.log('SESSION API Response:', response);
    if (response.success) {
      yield put({
        type: SESSION_SUCCESS,
        data: response?.session_id,
      });
      showMessage({
        message: 'successfully loggedIn',
        type: popUpType.success,
      });
      navigate(RouteName.HOME);
    } else {
      yield put({
        type: SESSION_FAIL,
        data: 'Session failed',
      });
    }
  } catch (error: any) {
    yield put({
      type: SESSION_FAIL,
      data: error.message || 'Unknown error',
    });
  } finally {
    yield put(hideAppLoader());
  }
}
export function* watchSessionSaga() {
  yield takeLatest(SESSION, handleSession);
}

function* logoutSaga() {
  try {
    yield put(showAppLoader());
    const response: {success: boolean} = yield call(logoutApi);
    console.log('LOGOUT API Response:', response);
    if (response.success) {
      yield put({
        type: LOGOUT_SUCCESS,
      });
      showMessage({
        message: 'Successfully logut',
        type: popUpType.success,
      });
    } else {
      yield put({
        type: LOGOUT_FAIL,
        data: 'Session failed',
      });
    }
  } catch (error: any) {
    yield put({
      type: LOGOUT_FAIL,
      data: error.message || 'Unknown error',
    });
  } finally {
    yield put(hideAppLoader());
    navigate(RouteName.LOGIN);
  }
}
export function* watchLogoutSaga() {
  yield takeLatest(LOGOUT, logoutSaga);
}
