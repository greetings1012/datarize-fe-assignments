import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { Dashboard } from './pages/Dashboard';

const shouldRetry = (failureCount: number, error: any) => {
  if (failureCount >= 3) return false;

  const status = error.originalError?.response?.status || error.status;

  // 클라이언트 에러(4xx)는 재시도하지 않음
  if (status && status >= 400 && status < 500) {
    return false;
  }

  return true;
};

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
