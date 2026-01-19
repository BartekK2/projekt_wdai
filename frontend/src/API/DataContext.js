import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';



export const dataContext = createContext();


export const DataProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const API_URL = "http://localhost:5001";


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
            const response = await fetch(`${API_URL}/reviews?productID=${productID}`, {
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
            console.error("Błąd pobierania opinii:", e);
            return [];
        }
    };

    const getProducts = async (categories, minPrice, maxPrice, name, id = null) => {
        try {
            const params = new URLSearchParams({
                minPrice: minPrice,
                maxPrice: maxPrice,
                name: name,
                id: id // w sensie że żeby sie zaczynało od tego
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


    const addToCart = async (productId, quantity) => {
        try {
            const token = user?.token;
            if (!token) return { error: "Zaloguj się aby dodać do koszyka" };

            const response = await fetch(`${API_URL}/cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ productId, quantity })
            });
            if (!response.ok) throw new Error(response.status);
            return await response.json();
        } catch (e) {
            console.error("Błąd dodawania:", e);
        }
    };

    const removeFromCart = async (cartId) => {
        try {
            const token = user?.token;
            if (!token) return;

            const response = await fetch(`${API_URL}/cart/${cartId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error(response.status);
            return await response.json();
        } catch (e) {
            console.error("Błąd usuwania:", e);
        }
    };

    const updateCartQuantity = async (cartId, quantity) => {
        try {
            const token = user?.token;
            if (!token) return;

            const response = await fetch(`${API_URL}/cart/${cartId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ quantity })
            });
            if (!response.ok) throw new Error(response.status);
            return await response.json();
        } catch (e) {
            console.error("Błąd aktualizacji:", e);
        }
    };

    const addReview = async (productId, stars, description) => {
        try {
            const token = user?.token;
            if (!token) return { error: "Zaloguj się" };

            const response = await fetch(`${API_URL}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ productId, stars, description })
            });
            if (!response.ok) throw new Error(response.status);
            return await response.json();
        } catch (e) {
            console.error("Błąd dodawania opinii:", e);
        }
    }

    const getAllReviews = async () => {
        try {
            const token = user?.token;
            if (!token) return [];

            const response = await fetch(`${API_URL}/reviews/all`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error(response.status);
            return await response.json();
        } catch (e) {
            console.error("Błąd pobierania opinii:", e);
            return [];
        }
    };

    const deleteReview = async (reviewId) => {
        try {
            const token = user?.token;
            if (!token) return { error: "Zaloguj się" };

            const response = await fetch(`${API_URL}/reviews/${reviewId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error(response.status);
            return await response.json();
        } catch (e) {
            console.error("Błąd usuwania opinii:", e);
        }
    };

    const checkout = async () => {
        try {
            const token = user?.token;
            if (!token) return { error: "Zaloguj się" };

            const response = await fetch(`${API_URL}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || response.status);
            return data;
        } catch (e) {
            console.error("Błąd checkout:", e);
            return { error: e.message };
        }
    };

    const getOrders = async () => {
        try {
            const token = user?.token;
            if (!token) return [];

            const response = await fetch(`${API_URL}/orders`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error(response.status);
            return await response.json();
        } catch (e) {
            console.error("Błąd pobierania zamówień:", e);
            return [];
        }
    };

    return (
        <dataContext.Provider value={{ getProducts, getCart, getReviews, addToCart, removeFromCart, updateCartQuantity, addReview, getAllReviews, deleteReview, checkout, getOrders }}>

            {children}
        </dataContext.Provider>
    );
};