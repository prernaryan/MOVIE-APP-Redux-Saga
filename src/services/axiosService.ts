import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import NetInfo from '@react-native-community/netinfo';
import {showMessage} from 'react-native-flash-message';
import {errorMessage} from '../utils/helperFunction';
import {popUpType} from '../constants';
import Config from 'react-native-config';
// Base URL for API requests

const TIMEOUT = 20000; // Request timeout in milliseconds
console.log(Config, 'Config');

// Create an Axios instance with default configuration
const axiosService: AxiosInstance = axios.create({
  baseURL: Config?.BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Config?.ACCESS_TOKEN}`,
  },
});

// Add a request interceptor to handle configuration and network checks
axiosService.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig> => {
    // Check for internet connection
    const {isConnected} = await NetInfo.fetch();
    if (!isConnected) {
      console.error('No internet connection.');
      return Promise.reject('No internet connection');
    }

    return config;
  },
  error => {
    console.error('Request Error:', error.message);
    return Promise.reject(error);
  },
);

// Add a response interceptor to handle errors and responses
axiosService.interceptors.response.use(
  (response: AxiosResponse) => {
    return response?.data ?? response;
  },
  async error => {
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }
    showMessage({
      message: errorMessage(error),
      type: popUpType.danger,
    });
    Promise.reject(errorMessage(error));
    return error.response;
  },
);

export default axiosService;
