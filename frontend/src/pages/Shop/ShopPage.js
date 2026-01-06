import { Button, Typography } from "@mui/material";
import { DotLottiePlayer } from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';
import { Link } from "react-router-dom";
import { useEffect, useState,useContext } from "react";
import { AuthContext } from "../../API/AuthContext";
import CategoryPanel from "./Components/Category";
import Product from "./Components/Product";
import './Shop.css';
import Filter from "./Components/Filter";

function Shop() {
    const { user } = useContext(AuthContext);
    const [categories, setcategories] = useState([]);
    const [pricemin, setpricemin] = useState(0);
    const [pricemax, setpricemax] = useState(100);
    const [products, setproducts] = useState([]);
    // useEffect(() => {
    
    //   return () => {
        
    //   }
    // }, []) tutaj będzie na bieżąco 
    
    return (
        <div className="shop-container">
            <div style={{maxWidth:"100%",height:"100%",display:"flex",justifyContent:"space-between"}}>
                <Filter/>
                <div style={{maxWidth:"100%",height:"100%",overflowY:"scroll", display:"flex",flexDirection:"column",alignItems:"center",gap:"20px"}}>

                <CategoryPanel/>
                <div style={{maxWidth:"100%",display:"flex",gap:"30px", flexWrap:"wrap",justifyContent:"center"}}>
                <Product/>
                <Product/>
                <Product/>
                <Product/>
                <Product/>
                <Product/>
                <Product/>
                <Product/>
                </div>
                </div>

            </div>
        </div>
    );
}

export default Shop;
