import { Global, css } from '@emotion/react';
import { Theme } from './theme';
import { reset } from './reset';

export const GlobalStyles = () => (
  <Global
    styles={(theme: Theme) => css`
      ${reset}

      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        background-color: ${theme.colors.background};
        color: ${theme.colors.textMain};
      }
    `}
  />
);
