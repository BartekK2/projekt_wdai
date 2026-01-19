import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './MaterialUICustiomization/theme';
//podstrony
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login_Registration/Login';
import Shop from './pages/Shop/ShopPage';
import ProductPage from './pages/ProductPage/ProductPage'
import CartPage from './pages/Cart/CartPage';
import AdminPage from './pages/Admin/AdminPage';
import OrderHistoryPage from './pages/OrderHistory/OrderHistoryPage';
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
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product" element={<ProductPage />} />
              <Route path="/koszyk" element={<CartPage />} />
              <Route path="/konto" element={<AdminPage />} />
              <Route path="/historia" element={<OrderHistoryPage />} />

            </Routes>
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>

    </ThemeProvider>
  );
}

export default App;