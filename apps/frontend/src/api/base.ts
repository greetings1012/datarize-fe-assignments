import axios, { AxiosError } from 'axios';

export const client = axios.create({
  baseURL: 'http://localhost:4000/api',
});

client.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const message = error.response?.data || error.message;
    // 공통 에러 처리
    console.error('API Error:', message);
    return Promise.reject(error);
  },
);
