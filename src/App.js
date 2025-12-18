import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './MaterialUICustiomization/theme';
//podstrony
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Home';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        {/* Tutaj wstaw pozniej navbar i nizej footbar */}
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;