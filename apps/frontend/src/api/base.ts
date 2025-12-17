import axios, { AxiosError } from 'axios';

import { API_ERROR_MESSAGES } from '../constants/messages';
import { ApiError } from '../types/api';

export const client = axios.create({
  baseURL: 'http://localhost:4000/api',
});

client.interceptors.response.use(
  (response) => response,
  (error: AxiosError | ApiError) => {
    // 이미 ApiError인 경우 그대로 반환
    if (error.name === 'ApiError') {
      return Promise.reject(error);
    }

    // 네트워크 에러나 5xx 에러만 처리
    const axiosError = error as AxiosError;
    const status = axiosError.response?.status || 0;
    let message: string = API_ERROR_MESSAGES.UNKNOWN;

    if (!window.navigator.onLine) {
      message = API_ERROR_MESSAGES.NETWORK_ERROR;
    } else if (status === 0) {
      message = API_ERROR_MESSAGES.SERVER_UNREACHABLE;
    } else if (status >= 500) {
      message = API_ERROR_MESSAGES.SERVER_ERROR;
    }

    const apiError: ApiError = {
      name: 'ApiError',
      status,
      message,
    };

    return Promise.reject(apiError);
  },
);
