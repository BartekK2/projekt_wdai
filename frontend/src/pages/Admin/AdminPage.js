import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../API/AuthContext";
import { dataContext } from "../../API/DataContext";
import {
    Container, Typography, Paper, Box, Button,
    IconButton, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Rating, Chip
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import HistoryIcon from '@mui/icons-material/History';

export default function AdminPage() {
    const { user } = useContext(AuthContext);
    const { getAllReviews, deleteReview } = useContext(dataContext);
    const navigate = useNavigate();

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }
        loadReviews();
    }, [user, navigate]);

    const loadReviews = async () => {
        setLoading(true);
        const data = await getAllReviews();
        setReviews(data || []);
        setLoading(false);
    };

    const handleDelete = async (reviewId, reviewUserId) => {

        const confirmed = window.confirm("Czy na pewno chcesz usunąć tę opinię?");
        if (confirmed) {
            await deleteReview(reviewId);
            loadReviews();
        }
    };

    if (!user) {
        return <Typography>Przekierowywanie...</Typography>;
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                {user.role != 'admin' && <Button
                    variant="contained"
                    startIcon={<HistoryIcon />}
                    onClick={() => navigate('/historia')}
                    sx={{ mr: 2 }}
                >
                    Historia zamówień
                </Button>}
                <Typography variant="h4">
                    {user.role === 'admin' ? '🔧 Panel Administratora' : '👤 Moje Opinie'}
                </Typography>
                <Chip
                    label={user.role === 'admin' ? 'Admin' : 'Użytkownik'}
                    color={user.role === 'admin' ? 'error' : 'primary'}
                />
            </Box>

            {user.role === 'admin' && (
                <Paper sx={{ p: 2, mb: 3, bgcolor: '#fff3e0' }}>
                    <Typography variant="body1">
                        <strong>Tryb Administratora:</strong> Możesz usuwać wszystkie opinie w systemie.
                    </Typography>
                </Paper>
            )}

            <Paper elevation={3}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: 'primary.main' }}>
                                <TableCell sx={{ color: 'white' }}>ID</TableCell>
                                <TableCell sx={{ color: 'white' }}>Produkt ID</TableCell>
                                <TableCell sx={{ color: 'white' }}>Ocena</TableCell>
                                <TableCell sx={{ color: 'white' }}>Treść</TableCell>
                                <TableCell sx={{ color: 'white' }}>Autor ID</TableCell>
                                <TableCell sx={{ color: 'white' }}>Akcje</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">Ładowanie...</TableCell>
                                </TableRow>
                            ) : reviews.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">Brak opinii do wyświetlenia</TableCell>
                                </TableRow>
                            ) : (
                                reviews
                                    .map((review) => (
                                        <TableRow key={review.id}>
                                            <TableCell>{review.id}</TableCell>
                                            <TableCell>{review.ProductId}</TableCell>
                                            <TableCell>
                                                <Rating value={review.stars} readOnly size="small" />
                                            </TableCell>
                                            <TableCell sx={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {review.description}
                                            </TableCell>
                                            <TableCell>{review.UserId}</TableCell>
                                            <TableCell>
                                                <IconButton
                                                    color="error"
                                                    onClick={() => handleDelete(review.id, review.UserId)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    );
}
