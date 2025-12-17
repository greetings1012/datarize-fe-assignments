import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ApiError } from '../types/api';
import { handleApiError } from './error';

export const NO_RETRY_STATUS_CODES = new Set([400, 401, 403, 404, 422, 429]);

export const shouldRetry = (
  failureCount: number,
  error: ApiError | null | undefined,
): boolean => {
  if (!error) {
    return failureCount < 3;
  }

  if (error.status) {
    return !NO_RETRY_STATUS_CODES.has(error.status) && failureCount < 3;
  }

  return failureCount < 3;
};

export const createQuery = <TData, TError = ApiError>(
  options: Omit<UseQueryOptions<TData, TError>, 'retry'> & {
    queryFn: () => Promise<TData>;
    custom404Message?: string;
  },
) => {
  const { custom404Message, queryFn, ...rest } = options;

  return useQuery<TData, TError>({
    ...rest,
    queryFn: async () => {
      try {
        return await queryFn();
      } catch (error) {
        return handleApiError(error, custom404Message);
      }
    },
  });
};
