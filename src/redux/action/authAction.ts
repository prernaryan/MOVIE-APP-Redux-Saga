import {LOGIN, LOGOUT, REQUEST_TOKEN, SESSION} from '../Type';

interface Request {
  username: string;
  password: string;
}
interface RequestLogin {
  username: string;
  password: string;
  request_token: string;
}
export const createTokenAction = (data: Request) => {
  return {
    type: REQUEST_TOKEN,
    data: data,
  };
};
export const loginApiAction = (data: RequestLogin) => {
  return {
    type: LOGIN,
    data: data,
  };
};

export const createSessionAction = (data: {request_token: string}) => {
  return {
    type: SESSION,
    data: data,
  };
};

export const logOutAction = () => {
  return {
    type: LOGOUT,
  };
};
