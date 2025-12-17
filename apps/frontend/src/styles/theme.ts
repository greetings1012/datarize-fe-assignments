export const theme = {
  colors: {
    primary: '#FFD902',
    primaryLight: '#FAFF6B',
    background: '#F2F2F2',
    white: '#FFFFFF',
    textMain: '#191919',
    textSecondary: '#383838',
    textMuted: '#B8B8B8',
    border: '#E8E8E8',
    error: '#E46962',
    hover: '#F2F2F2',
  },

  borderRadius: {
    small: '0.5rem',
    medium: '0.75rem',
    large: '1rem',
    round: '50%',
  },
  shadows: {
    main: '0 4px 20px rgba(0, 0, 0, 0.05)',
    modal: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },
} as const;

export type Theme = typeof theme;
