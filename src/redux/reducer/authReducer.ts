import {
  REQUEST_TOKEN,
  REQUEST_TOKEN_SUCCESS,
  REQUEST_TOKEN_FAIL,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SESSION,
  SESSION_SUCCESS,
  SESSION_FAIL,
  LOGOUT,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
} from '../Type';

interface TokenState {
  requestTokenRes: {
    loading: boolean;
    request_token?: string | null;
    error: string | null;
  };
  loginApiRes: {
    loading: boolean;
    error: string | null;
    data?: any;
  };
  sessionAPiRes: {
    loading: boolean;
    error: string | null;
    session_id?: any;
  };
  logoutRes: {
    loading: boolean;
    error: string | null;
    success: boolean;
  };
}

const initialState: TokenState = {
  requestTokenRes: {
    loading: false,
    request_token: null,
    error: null,
  },
  loginApiRes: {loading: false, error: null, data: null},
  sessionAPiRes: {loading: false, error: null, session_id: null},
  logoutRes: {loading: false, error: null, success: false},
};

export const authReducer = (state = initialState, action: any): TokenState => {
  switch (action.type) {
    case REQUEST_TOKEN:
      return {
        ...state,
        requestTokenRes: {loading: true, error: null, request_token: ''},
      };
    case REQUEST_TOKEN_SUCCESS:
      return {
        ...state,
        requestTokenRes: {
          loading: false,
          request_token: action.data,
          error: null,
        },
      };
    case REQUEST_TOKEN_FAIL:
      return {
        ...state,
        requestTokenRes: {loading: false, error: action.data},
      };
    case LOGIN:
      return {
        ...state,
        loginApiRes: {loading: true, error: null, data: null},
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginApiRes: {loading: false, error: null, data: action.data},
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loginApiRes: {loading: false, error: action.data},
      };
    case SESSION:
      return {
        ...state,
        sessionAPiRes: {loading: true, error: null, session_id: null},
      };
    case SESSION_SUCCESS:
      return {
        ...state,
        sessionAPiRes: {loading: false, error: null, session_id: action.data},
      };
    case SESSION_FAIL:
      return {
        ...state,
        sessionAPiRes: {loading: false, error: action.data},
      };
    case LOGOUT:
      return {
        ...state,
      };
    case LOGOUT_SUCCESS:
      return initialState;
    case LOGOUT_FAIL:
      return initialState;
    default:
      return state;
  }
};
