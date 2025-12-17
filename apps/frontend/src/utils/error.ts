import { AxiosError } from 'axios';
import { API_ERROR_MESSAGES } from '../constants/messages';
import { ApiError } from '../types/api';

const STATUS_MESSAGE_MAP: Record<number, string> = {
  400: API_ERROR_MESSAGES.BAD_REQUEST,
  401: API_ERROR_MESSAGES.UNAUTHORIZED,
  403: API_ERROR_MESSAGES.FORBIDDEN,
  404: API_ERROR_MESSAGES.NOT_FOUND,
  422: API_ERROR_MESSAGES.UNPROCESSABLE,
  429: API_ERROR_MESSAGES.TOO_MANY_REQUESTS,
};

export const createApiError = (
  status: number,
  customMessage?: string,
): ApiError => ({
  name: 'ApiError',
  status,
  message:
    customMessage || STATUS_MESSAGE_MAP[status] || API_ERROR_MESSAGES.UNKNOWN,
});

export const handleApiError = (
  error: unknown,
  custom404Message?: string,
): never => {
  if (error instanceof AxiosError && error.response) {
    const status = error.response.status;
    if (status === 404 && custom404Message) {
      throw createApiError(404, custom404Message);
    }
    if (status >= 400 && status < 500) {
      throw createApiError(status);
    }
  }
  throw error;
};
