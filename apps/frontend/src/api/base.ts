import axios, { AxiosError } from 'axios';
import { getErrorMessage } from '../constants/messages';

export const client = axios.create({
  baseURL: 'http://localhost:4000/api',
});

client.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const message = getErrorMessage(error.response?.status);
    const customError = new Error(message);
    (customError as any).originalError = error;
    return Promise.reject(customError);
  },
);
