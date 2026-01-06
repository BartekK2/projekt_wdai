/*
TODO:
- dodaj przekierowanie gdzieś na sklep czy coś po uplywie kilku
sekund od zalogowania zeby jeszcze byl widoczny komunikat

- dodaj przekierowanie gdy uzytkownik jest juz zalogowany
*/


import { useState, useEffect, useContext} from "react";
import { useLocation,useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";

import { AuthContext } from "../../API/AuthContext";

export default function AuthPage() {
  const {user,login, register } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialAction = queryParams.get("action") || "login";

  const [mode, setMode] = useState(initialAction); // "login" lub "registration"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setMode(initialAction);
    setError("");
    setSuccess("");
    setUsername("");
    setPassword("");
  }, [initialAction]);

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true }); 
    }
  }, [user, navigate]);

  const handleSubmit = async () => {
    setError("");
    setSuccess("");
    
    if (!username || !password) {
      setError("Wypełnij wszystkie pola!");
      return;
    }

    if (mode === "login") {
      const result = await login(username, password); 
      
      console.log("Wynik logowania:", result);

      if (result && result.success) {
        setSuccess("Zalogowano pomyślnie!");
        
        setTimeout(() => {
             navigate("/"); 
        }, 2000);
      } else {
        setError(result?.msg || "Niepoprawny login lub hasło!");
      }

    } else if (mode === "registration") {
      const result = await register(username, password);
      
      if (result && result.success) {
        setSuccess("Rejestracja udana! Możesz teraz zalogować się.");
        setMode("login");
        setUsername("");
        setPassword("");
      } else {
        setError("Użytkownik już istnieje!");
      }
    }
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "registration" : "login");
    setError("");
    setSuccess("");
    setUsername("");
    setPassword("");
  };

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        px: 2,
      }}
    >
      <Typography variant="h4" fontWeight={600}>
        {mode === "login" ? "Logowanie" : "Rejestracja"}
      </Typography>

      <Button
        onClick={toggleMode}
        variant="text"
        sx={{ mb: 2, textTransform: "none" }}
      >
        {mode === "login"
          ? "Chcesz się zarejestrować? Kliknij tutaj"
          : "Masz już konto? Zaloguj się"}
      </Button>

      <TextField
        label="Nazwa użytkownika"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        sx={{ maxWidth: 400 }}
      />
      <TextField
        label="Hasło"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        sx={{ maxWidth: 400 }}
      />

      {error && (
        <Typography color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
      {success && (
        <Typography color="success.main" sx={{ mt: 1 }}>
          {success}
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 2, maxWidth: 400 }}
      >
        {mode === "login" ? "Zaloguj się" : "Zarejestruj się"}
      </Button>
    </Box>
  );
}
