import { ThemeProvider } from '@emotion/react';
import { QueryClientProvider } from '@tanstack/react-query';

import { Dashboard } from './pages/Dashboard';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import { queryClient } from './queries/config';

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
