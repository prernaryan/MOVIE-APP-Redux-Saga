import {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {heightPixel} from './responsve';
import {Value} from '../constants';

export const errorMessage = (error: any) => {
  return (
    error.response?.data?.status_message ||
    error.response?.data?.error ||
    error.message
  );
};
export const ToastHandler = (
  message: any,
  isSuccess: boolean,
  description?: string,
): void => {
  const messageText =
    typeof message === 'string' ? message : JSON.stringify(message);
  return showMessage({
    message: messageText,
    description,
    style: {
      height: heightPixel(Value.CONSTANT_VALUE_48),
      bottom: heightPixel(Value.CONSTANT_VALUE_20),
    },
    duration: 3000,
    // type: isSuccess ? popUpType.success : popUpType.danger,
  });
};
export const storeDataLocally = async (key: string, value: any) =>
  AsyncStorage.setItem(key, JSON.stringify(value));

export const getDataLocally = async (key: string) => {
  const data: any = await AsyncStorage.getItem(key);
  return JSON.parse(data);
};
export const removeLocalData = (key: string) => {
  AsyncStorage.removeItem(key);
};

export const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
