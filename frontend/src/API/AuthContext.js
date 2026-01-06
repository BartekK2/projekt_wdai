import { createContext, useState, useEffect } from 'react';
export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const API_URL = "http://localhost:5000";

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        const savedRole = localStorage.getItem('role');
        const savedUsername = localStorage.getItem('username');
        if (savedToken) {
            setUser({ token: savedToken, role: savedRole, username: savedUsername });
        }
    }, []);

    const login = async (username, password) => {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            
            if (!response.ok) return { success: false, msg: "Bledne dane" };
            
            const data = await response.json();
            
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);
            localStorage.setItem('username', data.username);
            
            setUser(data);
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
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};