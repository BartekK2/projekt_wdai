import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './MaterialUICustiomization/theme';
//podstrony
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login_Registration/Login';
import "./App.css"

// elementy globalne tj np navbar
import Navbar from './Navbar/Navbar'

// serwer autentykacja itd
import { AuthProvider } from './API/AuthContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>

    </ThemeProvider>
  );
}

export default App;