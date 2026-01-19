import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { dataContext } from "../../API/DataContext";
import { AuthContext } from "../../API/AuthContext";
import {
    Box, Typography, Button, List, ListItem, ListItemText,
    IconButton, Divider, Paper, Container
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function CartPage() {
    const { getCart, removeFromCart, updateCartQuantity, checkout } = useContext(dataContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    const refreshCart = async () => {
        const data = await getCart();
        setCartItems(data);
        const sum = data.reduce((acc, item) => acc + item.totalPrice, 0);
        setTotal(sum);
    };

    useEffect(() => {
        if (user) {
            refreshCart();
        }
    }, [user]);

    const handleRemove = async (id) => {
        await removeFromCart(id);
        refreshCart();
    };

    const handleQuantityChange = async (id, currentQty, change) => {
        const newQty = currentQty + change;
        if (newQty < 1) return;
        await updateCartQuantity(id, newQty);
        refreshCart();
    };

    const handleCheckout = async () => {
        setLoading(true);
        const result = await checkout();
        setLoading(false);

        if (result.error) {
            alert("Błąd: " + result.error);
        } else {
            alert("✅ Zamówienie złożone pomyślnie!");
            navigate("/historia");
        }
    };

    if (!user) {
        return (
            <Container sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="h5">Przekierowywanie do logowania...</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>🛒 Twój Koszyk</Typography>
            {cartItems.length === 0 ? (
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                    <Typography>Koszyk jest pusty.</Typography>
                    <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate("/shop")}>
                        Przejdź do sklepu
                    </Button>
                </Paper>
            ) : (
                <Paper elevation={3} sx={{ p: 2 }}>
                    <List>
                        {cartItems.map((item) => (
                            <div key={item.cartId}>
                                <ListItem
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="delete" onClick={() => handleRemove(item.cartId)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                >
                                    <ListItemText
                                        primary={item.name}
                                        secondary={
                                            <>
                                                <Typography component="span" variant="body2" color="text.primary">
                                                    {item.price} PLN x {item.quantity}
                                                </Typography>
                                                {" — Razem: " + item.totalPrice.toFixed(2) + " PLN"}
                                            </>
                                        }
                                    />
                                    <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                                        <IconButton size="small" onClick={() => handleQuantityChange(item.cartId, item.quantity, -1)}>
                                            <RemoveIcon />
                                        </IconButton>
                                        <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                                        <IconButton size="small" onClick={() => handleQuantityChange(item.cartId, item.quantity, 1)}>
                                            <AddIcon />
                                        </IconButton>
                                    </Box>
                                </ListItem>
                                <Divider />
                            </div>
                        ))}
                    </List>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h5">Suma: {total.toFixed(2)} PLN</Typography>
                        <Button
                            variant="contained"
                            color="success"
                            size="large"
                            onClick={handleCheckout}
                            disabled={loading}
                        >
                            {loading ? "Przetwarzanie..." : "💳 Złóż Zamówienie"}
                        </Button>
                    </Box>
                </Paper>
            )}
        </Container>
    );
}

