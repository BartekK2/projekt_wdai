/*
TODO:
- dodaj przekierowanie gdzieś na sklep czy coś po uplywie kilku
sekund od zalogowania zeby jeszcze byl widoczny komunikat

- dodaj przekierowanie gdy uzytkownik jest juz zalogowany
*/


import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";

import { login, register } from "../../API/AUTH";

export default function AuthPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialAction = queryParams.get("action") || "login";

  const [mode, setMode] = useState(initialAction); // "login" lub "registration"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ustaw tryb przy wejściu na stronę
  useEffect(() => {
    setMode(initialAction);
    setError("");
    setSuccess("");
    setUsername("");
    setPassword("");
  }, [initialAction]);

  const handleSubmit = () => {
    setError("");
    setSuccess("");
    console.log(username,password)
    if (!username || !password) {
      setError("Wypełnij wszystkie pola!");
      return;
    }

    if (mode === "login") {
      const ok = login(username, password);
      if (ok) {
        setSuccess("Zalogowano pomyślnie!");
      } else {
        setError("Niepoprawny login lub hasło!");
      }
    } else if (mode === "registration") {
      const ok = register(username, password);
      if (ok) {
        setSuccess("Rejestracja udana! Możesz teraz zalogować się.");
        setMode("login");
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
