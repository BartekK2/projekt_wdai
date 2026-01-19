# Projekt na Wstęp do Aplikacji Internetowych - Simple Online Store

### Twórcy:
- Bartłomiej Król
- Szymon Pytel

### Opis Projektu
Aplikacja sklepu internetowego umożliwiająca przeglądanie produktów, dodawanie ich do koszyka, oraz wystawianie opinii.
Aplikacja została zrealizowana w architekturze Client-Server.

### Funkcjonalności
1.  **Strona Główna**: Landing page sklepu.
2.  **Sklep**:
    - Lista produktów pobierana z bazy danych.
    - Filtrowanie po kategorii, cenie oraz wyszukiwanie po nazwie.
3.  **Szczegóły Produktu**:
    - Wyświetlanie szczegółów produktu.
    - Możliwość dodania produktu do koszyka (wymagane logowanie).
    - System opinii (dodawanie i przeglądanie opinii - dane zapisywane w bazie SQL).
4.  **Koszyk**:
    - Podgląd produktów w koszyku.
    - Zmiana ilości sztuk, usuwanie produktów.
    - Przeliczanie całkowitej kwoty do zapłaty.
5.  **Konto Użytkownika**:
    - Rejestracja i Logowanie (JWT + Refresh Token).
    - Automatyczne odświeżanie tokena przed wygaśnięciem.
    - Sesja użytkownika przechowywana po stronie klienta.

### Użyta Technologia i Biblioteki

**Frontend:**
-   React 19
-   React Router Dom 7
-   Material UI (MUI) - biblioteka komponentów (zgodnie z wymaganiami na 7pkt)
-   DotLottie - animacje

**Backend:**
-   Node.js + Express
-   SQLite + Sequelize (Baza danych SQL - zgodnie z wymaganiami na 7pkt/8pkt)
-   JWT (JSON Web Token) - autentykacja

### Uruchomienie Projektu

**Backend:**
```bash
cd backend
npm install
node server.js
```
Serwer uruchomi się na porcie 5000.

**Frontend:**
```bash
cd frontend
npm install
npm start
```
Aplikacja uruchomi się na porcie 3000.