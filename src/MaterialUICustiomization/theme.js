import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#840032',
      light: '#9f023eff',
      dark: '#550222ff',
      contrastText: '#fff',
    },
    secondary: {
      main: '#E59500',
    },
    background: {
      default: '#f3f3f3ff',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: { fontSize: '2rem', fontWeight: 700 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8 }, 
      },
    },
  },
});