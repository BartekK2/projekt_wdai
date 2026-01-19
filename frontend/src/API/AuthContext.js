import { createContext, useState, useEffect } from 'react';
export const AuthContext = createContext();

// Dekodowanie payloadu JWT
const decodeToken = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
};

// Czy token zaraz wygasnie
const isTokenExpiringSoon = (token, thresholdSeconds = 60) => {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return true;
    const expiresAt = decoded.exp * 1000;
    return Date.now() > expiresAt - (thresholdSeconds * 1000);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const API_URL = "http://localhost:5001";

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        const savedRefreshToken = localStorage.getItem('refreshToken');
        const savedRole = localStorage.getItem('role');
        const savedUsername = localStorage.getItem('username');
        if (savedToken) {
            const decoded = decodeToken(savedToken);
            setUser({
                token: savedToken,
                refreshToken: savedRefreshToken,
                role: savedRole,
                username: savedUsername,
                id: decoded?.id
            });
        }
    }, []);

    // Odswiezanie tokena
    const refreshAccessToken = async () => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
                logout();
                return null;
            }

            const response = await fetch(`${API_URL}/refresh`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken })
            });

            if (!response.ok) {
                logout();
                return null;
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);

            const decoded = decodeToken(data.token);
            setUser(prev => ({ ...prev, token: data.token, id: decoded?.id }));

            return data.token;
        } catch (e) {
            console.error("Błąd odświeżania tokena:", e);
            logout();
            return null;
        }
    };

    // Pobiera token lub odswieza jesli trzeba
    const getValidToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) return null;

        if (isTokenExpiringSoon(token, 60)) {
            return await refreshAccessToken();
        }
        return token;
    };

    const login = async (username, password) => {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) return { success: false, msg: "Bledne dane" };

            const data = await response.json();
            const decoded = decodeToken(data.token);

            localStorage.setItem('token', data.token);
            localStorage.setItem('refreshToken', data.refreshToken);
            localStorage.setItem('role', data.role);
            localStorage.setItem('username', data.username);

            setUser({ ...data, id: decoded?.id });
            return { success: true };
        } catch (e) {
            return { success: false, msg: "Blad polaaczenia z serwerem" };
        }
    };

    const register = async (username, password) => {
        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            return { success: response.ok };
        } catch (e) {
            return { success: false };
        }
    };

    const logout = () => {
        localStorage.clear();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, refreshAccessToken, getValidToken }}>
            {children}
        </AuthContext.Provider>
    );
};