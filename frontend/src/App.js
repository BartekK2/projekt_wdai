import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './MaterialUICustiomization/theme';
//podstrony
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login_Registration/Login';
import Shop from './pages/Shop/ShopPage';

import "./App.css"

// elementy globalne tj np navbar
import Navbar from './Navbar/Navbar'

// serwer autentykacja itd
import { AuthProvider } from './API/AuthContext';
import { DataProvider } from './API/DataContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <DataProvider>
          <BrowserRouter>
            <Navbar/>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/shop" element={<Shop />} />
            </Routes>
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>

    </ThemeProvider>
  );
}

export default App;