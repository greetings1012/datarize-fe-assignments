import { ApiError } from '../types/api';

export const NO_RETRY_STATUS_CODES = new Set([400, 401, 403, 404, 422, 429]);

export const shouldRetry = (
  failureCount: number,
  error: ApiError | null | undefined,
): boolean => {
  if (!error) {
    return failureCount < 1;
  }

  return !NO_RETRY_STATUS_CODES.has(error.status) && failureCount < 1;
};
