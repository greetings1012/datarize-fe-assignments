import { QueryClient } from '@tanstack/react-query';

// 쿼리 재시도 횟수
const QUERY_RETRY_COUNT = 3;

// 4xx 에러는 재시도하지 않음
const shouldRetry = (failureCount: number, error: any) => {
  if (failureCount >= QUERY_RETRY_COUNT) {
    return false;
  }

  const status = error.originalError?.response?.status || error.status;

  if (status && status >= 400 && status < 500) {
    return false;
  }

  return true;
};

// 쿼리 기본 설정
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: shouldRetry,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});
