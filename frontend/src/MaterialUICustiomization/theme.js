import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#be3838ff',
      light: '#9f023eff',
      dark: '#550222ff',
      contrastText: '#fff',
    },
    secondary: {
      main: '#f2b84bff',
      contrastText: '#fff',
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
        root: { borderRadius: 8,border:"solid 2px black" },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { border:"solid 2px black" },
      },
    },
  },
});