import { useEffect, useState,useContext } from "react";
import { useLocation } from 'react-router-dom';

import { AuthContext } from "../../API/AuthContext";
import { dataContext } from '../../API/DataContext';


import { TextField,Card,CardMedia,Typography, CardContent,Avatar,Rating} from '@mui/material';

function Shop() {
    const { user } = useContext(AuthContext);
    const { getProducts } = useContext(dataContext);

    const [productInfo, setproductInfo] = useState({});
    const [reviews, setReviews] = useState({});
    
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const productId = queryParams.get('id');

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProducts([],0,10000,"",productId); // można to potem ładniej zrobić TODO: 
            console.log("Pobrane dane:", data);
            setproductInfo(data);
        };
        if (productId) {
            console.log("Szukamy produktu o ID:", productId);
            fetchData();
        }
    }, [productId]);
    return (
            <div className="shop-container" style={{ height: "calc(100vh - 64px)"}}>

                <Card  style={{width:"80%",padding:"5rem",margin:"4rem",display:"flex",background:"none"}}>
                    {productInfo &&
                        <>
                            <CardMedia
                                component="img"
                                image={productInfo.imageURL? productInfo.imageURL:"https://mui.com/static/images/cards/paella.jpg"}
                                alt="xd"
                                style={{display:"bord",flex:0,borderBottom:"solid 1px",borderRadius:"20px",maxWidth:"30%"}}
                            />
                            <CardContent sx={{flex:1}}>
                                <Typography variant="h4" sx={{ color: 'text.secondary' }}>
                                    {productInfo.name}
                                </Typography>
                                <Typography variant="h6" sx={{overflow:'hidden',maxHeight:"320px", color: 'text.secondary' }}>
                                    {productInfo.description}
                                </Typography>
                            </CardContent>
                        </>
                    }
                </Card>
                <Typography variant="h6" sx={{overflow:'hidden',color: 'text.secondary' }}>
                                            <Avatar sx={{ width: 32, height: 32,mr:1, bgcolor: "secondary.main" }}>A</Avatar>
                                            <Rating name="read-only" value={2} readOnly />
                                            {productInfo.description}
                                        </Typography>
            </div>
    );
}

export default Shop;
