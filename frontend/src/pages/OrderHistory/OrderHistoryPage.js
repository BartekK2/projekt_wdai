import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../API/AuthContext";
import { dataContext } from "../../API/DataContext";
import {
    Container, Typography, Paper, Box,
    Accordion, AccordionSummary, AccordionDetails,
    Table, TableBody, TableCell, TableRow, Chip
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function OrderHistoryPage() {
    const { user } = useContext(AuthContext);
    const { getOrders } = useContext(dataContext);
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }
        loadOrders();
    }, [user, navigate]);

    const loadOrders = async () => {
        setLoading(true);
        const data = await getOrders();
        setOrders(data || []);
        setLoading(false);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('pl-PL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (!user) {
        return <Typography>Przekierowywanie...</Typography>;
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>📦 Historia Zamówień</Typography>

            {loading ? (
                <Typography>Ładowanie...</Typography>
            ) : orders.length === 0 ? (
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="h6" color="text.secondary">
                        Nie masz jeszcze żadnych zamówień
                    </Typography>
                </Paper>
            ) : (
                orders.map((order) => (
                    <Accordion key={order.id} sx={{ mb: 2 }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between', pr: 2 }}>
                                <Typography variant="h6">
                                    Zamówienie #{order.id}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                    <Chip
                                        label={order.status === 'completed' ? 'Zrealizowane' : order.status}
                                        color="success"
                                        size="small"
                                    />
                                    <Typography variant="body2" color="text.secondary">
                                        {formatDate(order.createdAt)}
                                    </Typography>
                                    <Typography variant="h6" color="primary">
                                        {order.totalPrice.toFixed(2)} PLN
                                    </Typography>
                                </Box>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Table size="small">
                                <TableBody>
                                    {order.OrderItems && order.OrderItems.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.productName}</TableCell>
                                            <TableCell align="right">{item.quantity} szt.</TableCell>
                                            <TableCell align="right">{item.priceAtPurchase.toFixed(2)} PLN/szt</TableCell>
                                            <TableCell align="right">
                                                <strong>{(item.quantity * item.priceAtPurchase).toFixed(2)} PLN</strong>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </AccordionDetails>
                    </Accordion>
                ))
            )}
        </Container>
    );
}
