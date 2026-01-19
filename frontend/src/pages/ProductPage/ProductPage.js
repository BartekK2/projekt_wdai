import { useEffect, useState, useContext } from "react";
import { useLocation } from 'react-router-dom';

import { AuthContext } from "../../API/AuthContext";
import { dataContext } from '../../API/DataContext';

import {
    TextField, Card, CardMedia, Typography, CardContent,
    Avatar, Rating, Button, Box, Divider, Paper
} from '@mui/material';

function Shop() {
    const { user } = useContext(AuthContext);
    const { getProducts, addToCart, getReviews, addReview } = useContext(dataContext);

    const [productInfo, setProductInfo] = useState(null);
    const [reviews, setReviews] = useState([]);

    // Form states
    const [quantity, setQuantity] = useState(1);
    const [userRating, setUserRating] = useState(5);
    const [userReview, setUserReview] = useState("");

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const productId = queryParams.get('id');

    useEffect(() => {
        const fetchData = async () => {
            if (productId) {
                const data = await getProducts([], 0, 10000, "", productId);
                console.log("Product Data:", data);
                setProductInfo(data);

                const reviewData = await getReviews(productId);
                setReviews(reviewData);
            }
        };
        fetchData();
    }, [productId, getProducts, getReviews]);

    const handleAddToCart = async () => {
        if (!user) {
            alert("Zaloguj się aby dodać do koszyka");
            return;
        }
        await addToCart(productInfo.id, quantity);
        alert("Pomyślnie dodano do koszyka");
    };

    const handleAddReview = async () => {
        if (!user) {
            alert("Zaloguj się aby dodać opinię");
            return;
        }
        await addReview(productInfo.id, userRating, userReview);
        // Refresh reviews
        const reviewData = await getReviews(productId);
        setReviews(reviewData);
        setUserReview("");
        setUserRating(5);
    };

    if (!productInfo) return <Typography>Ładowanie...</Typography>;

    return (
        <div className="shop-container" style={{ padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>

            {/* Product Card */}
            <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, maxWidth: 1000, width: "100%", p: 2 }}>
                <CardMedia
                    component="img"
                    sx={{ width: { xs: '100%', md: 400 }, objectFit: "contain", borderRadius: 2 }}
                    image={productInfo.imageURL || "https://mui.com/static/images/cards/paella.jpg"}
                    alt={productInfo.name}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: 2 }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h3">
                            {productInfo.name}
                        </Typography>
                        <Typography variant="h5" color="text.secondary" sx={{ mt: 2 }}>
                            {productInfo.price} PLN
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 2 }}>
                            {productInfo.description}
                        </Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', p: 1, gap: 2 }}>
                        <TextField
                            type="number"
                            label="Ilość"
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                            sx={{ width: 100 }}
                            inputProps={{ min: 1 }}
                        />
                        <Button variant="contained" size="large" onClick={handleAddToCart}>
                            Dodaj do koszyka
                        </Button>
                    </Box>
                </Box>
            </Card>

            {/* Reviews Section */}
            <Paper sx={{ width: "100%", maxWidth: 1000, p: 3 }}>
                <Typography variant="h4" gutterBottom>Opinie</Typography>

                {/* Add Review Form */}
                {user && (
                    <Box sx={{ mb: 4, bgcolor: '#f5f5f5', p: 2, borderRadius: 2 }}>
                        <Typography variant="h6">Dodaj swoją opinię</Typography>
                        <Box sx={{ my: 1 }}>
                            <Rating
                                value={userRating}
                                onChange={(event, newValue) => {
                                    setUserRating(newValue);
                                }}
                            />
                        </Box>
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            placeholder="Twoja opinia..."
                            value={userReview}
                            onChange={(e) => setUserReview(e.target.value)}
                            sx={{ mb: 2, bgcolor: 'white' }}
                        />
                        <Button variant="contained" onClick={handleAddReview}>Wyślij</Button>
                    </Box>
                )}

                {/* Reviews List */}
                <Box>
                    {reviews.length > 0 ? (
                        reviews.map((opinia) => (
                            <Box key={opinia.id} sx={{ mb: 2, pb: 2, borderBottom: '1px solid #ddd' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: "secondary.main" }}>
                                        {/* Fallback if user details not populated */}
                                        U
                                    </Avatar>
                                    <Rating value={opinia.stars} readOnly size="small" />
                                </Box>
                                <Typography variant="body2">{opinia.description}</Typography>
                            </Box>
                        ))
                    ) : (
                        <Typography color="text.secondary">Brak opinii dla tego produktu.</Typography>
                    )}
                </Box>
            </Paper>
        </div>
    );
}

export default Shop;
