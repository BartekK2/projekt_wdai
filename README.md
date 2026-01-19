# Projekt na Wstęp do Aplikacji Internetowych - Simple Online Store

### Twórcy:
- Bartłomiej Król
- Szymon Pytel

### Opis Projektu
Aplikacja sklepu internetowego umożliwiająca przeglądanie produktów, dodawanie ich do koszyka, oraz wystawianie opinii.

### Funkcjonalności
1.  **Strona Główna**
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
    
6.  **Konto administratora**:
    - Możliwość usuwania dowolnych opinii w serwisie.

### Użyta Technologia i Biblioteki

**Frontend:**
-   React
-   React Router
-   Material UI
-   DotLottie

**Backend:**
-   Node.js + Express
-   SQLite + Sequelize
-   JWT

### Uruchomienie Projektu

**Backend:**
```bash
cd backend
npm install
node server.js
```
Serwer uruchomi się na porcie **5001**.
W katalogu `backend` znajduje się plik `postman_dokumentacja.postman_collection.json` do przetestowania endpointów.

**Frontend:**
```bash
cd frontend
npm install
npm start
```
Aplikacja uruchomi się na porcie 3000.

### Konto Administratora
W systemie istnieje konto administratora:
- **Login:** admin
- **Hasło:** admin
Posiada ono uprawnienia do usuwania wszystkich opinii w serwisie.

### Konto użytkownika
W bazie jest też konto użytkownika:
- **Login:** xd
- **Hasło:** xd