import axios, { AxiosError } from 'axios';

import { API_ERROR_MESSAGES } from '../constants/messages';
import { ApiError } from '../types/api';

export const client = axios.create({
  baseURL: 'http://localhost:4000/api',
});

client.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status || 0;
    let message: string = API_ERROR_MESSAGES.UNKNOWN;

    if (!window.navigator.onLine) message = API_ERROR_MESSAGES.NETWORK_ERROR;

    switch (status) {
      case 0:
        message = API_ERROR_MESSAGES.SERVER_UNREACHABLE;
        break;
      case 401:
        message = API_ERROR_MESSAGES.UNAUTHORIZED;
        break;
      case 404:
        message = API_ERROR_MESSAGES.NOT_FOUND;
        break;
      case 500:
        message = API_ERROR_MESSAGES.SERVER_ERROR;
        break;
      default:
        message = API_ERROR_MESSAGES.UNKNOWN;
    }

    const apiError: ApiError = {
      status,
      message,
    };

    return Promise.reject(apiError);
  },
);
