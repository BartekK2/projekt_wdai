import { createContext, useState, useEffect,useContext } from 'react';
import { AuthContext } from './AuthContext';



export const dataContext = createContext();


export const DataProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const API_URL = "http://localhost:5000";


    const getCart = async () => {
        try {
            const token = user?.token; 
            
            if (!token) {
                console.error("Brak tokena, użytkownik niezalogowany");
                return [];
            }

            const response = await fetch(`${API_URL}/cart`, {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                    // 3. To jest kluczowe - wysyłamy token w nagłówku
                    'Authorization': `Bearer ${token}` 
                }
            });

            if (!response.ok) {
                // Obsługa wygasłego tokena (np. wylogowanie)
                if (response.status === 401 || response.status === 403) {
                    console.log("Sesja wygasła");
                    // tutaj ewentualnie logout()
                }
                throw new Error(response.status);
            }

            const data = await response.json();
            return data; 

        } catch (e) {
            console.error("Błąd pobierania koszyka:", e);
            return [];
        }
    };


    const getReviews = async (productID) => {
        try {
            const params = new URLSearchParams({
                productID: productID
            });
            const response = await fetch(`${API_URL}/products?${params.toString()}`, {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json' 
                }
            });
            if (!response.ok) {
                throw new Error(response.status);
            }
            const data = await response.json();
            return data; 
        } catch (e) {
            console.error("Błąd:", e);
            return [];
        }
    };

    const getProducts = async (categories, minPrice, maxPrice,name) => {
        try {
            const params = new URLSearchParams({
                minPrice: minPrice,
                maxPrice: maxPrice,
                name: name // w sensie że żeby sie zaczynało od tego
            });
            categories.forEach(cat => params.append('categories', cat));
            const response = await fetch(`${API_URL}/products?${params.toString()}`, {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json' 
                }
            });
            if (!response.ok) {
                throw new Error(response.status);
            }
            const data = await response.json();
            return data; 
        } catch (e) {
            console.error("Błąd:", e);
            return [];
        }
    };

    return (
        <dataContext.Provider value={{ getProducts,getCart,getReviews }}>
            {children}
        </dataContext.Provider>
    );
};