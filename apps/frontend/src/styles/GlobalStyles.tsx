import { css, Global } from '@emotion/react';

import { reset } from './reset';
import { Theme } from './theme';

export const GlobalStyles = () => (
  <Global
    styles={(theme: Theme) => css`
      ${reset}

      body {
        font-family:
          -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          'Helvetica Neue', Arial, sans-serif;
        background-color: ${theme.colors.background};
        color: ${theme.colors.textMain};
      }
    `}
  />
);
