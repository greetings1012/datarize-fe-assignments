import axios, { AxiosError } from 'axios';
import { getErrorMessage } from '../constants/messages';

// API 클라이언트 기본 설정
export const client = axios.create({
  baseURL: 'http://localhost:4000/api',
});

// 에러 발생 시 한글 메시지로 변환
client.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const message = getErrorMessage(error.response?.status);
    const customError = new Error(message);
    (customError as any).originalError = error;
    return Promise.reject(customError);
  },
);
