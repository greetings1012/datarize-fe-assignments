import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { Dashboard } from './pages/Dashboard';

// 쿼리 재시도 로직: 4xx 에러는 재시도하지 않음
const shouldRetry = (failureCount: number, error: any) => {
  if (failureCount >= 3) return false;

  const status = error.originalError?.response?.status || error.status;

  if (status && status >= 400 && status < 500) {
    return false;
  }

  return true;
};

// React Query 기본 설정
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: shouldRetry,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Dashboard />
      </ThemeProvider>
    </QueryClientProvider>
  );
};
