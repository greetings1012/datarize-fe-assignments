import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { Dashboard } from './pages/Dashboard';
import { ApiError } from './types/api';

const NO_RETRY_STATUS_CODES = new Set([400, 401, 403, 404, 422, 429]);

const shouldRetry = (failureCount: number, error: ApiError) => {
  if (failureCount >= 3) return false;
  if (error.status && NO_RETRY_STATUS_CODES.has(error.status)) return false;
  return true;
};

const queryClient = new QueryClient({ 
  defaultOptions: { 
    queries: { 
      retry: shouldRetry, 
      retryOnMount: false, 
      refetchOnWindowFocus: false, 
    } 
  } 
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