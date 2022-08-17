import { createTheme } from '@mui/material';

export const theme = createTheme({
  typography: {
    fontFamily: ['Montserrat', 'Helvetica Neue', 'Arial', 'sans-serif'].join(
      ','
    ),
    letterSpacing: '1.2em',
    button: {
      fontWeight: 700,
      fontSize: 16,
      textTransform: 'uppercase',
    },
  },
  palette: {
    primary: {
      main: '#2158FC',
      light: '#D2E2FE',
      dark: '#061778',
    },
    secondary: {
      main: '#6a82fb',
      light: '#f0f8fe',
      dark: '#364485',
    },
  },
});

theme.typography = {
  ...theme.typography,
  h4: {
    ...theme.typography.h4,
    fontWeight: 700,
    fontSize: 24,
    [theme.breakpoints.down('md')]: {
      fontSize: 20,
    },
  },
};
