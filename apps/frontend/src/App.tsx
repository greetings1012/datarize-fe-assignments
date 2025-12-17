import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { Dashboard } from './pages/Dashboard';
import styled from '@emotion/styled';

const queryClient = new QueryClient();

const Layout = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Layout>
          <Dashboard />
        </Layout>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
