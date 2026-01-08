import '@dotlottie/react-player/dist/index.css';
import { useEffect, useState,useContext } from "react";
import { AuthContext } from "../../API/AuthContext";
import CategoryPanel from "./Components/Category";
import Product from "./Components/Product";
import './Shop.css';
import Filter from "./Components/Filter";


import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import DiamondIcon from '@mui/icons-material/Diamond';
import IceSkatingIcon from '@mui/icons-material/IceSkating';
import CleanHandsIcon from '@mui/icons-material/CleanHands';
import { TextField } from '@mui/material';


const categoriesMap={
  "Buty":IceSkatingIcon,
  "Dla dzieci": ChildFriendlyIcon,
  "Odzież": CheckroomIcon,
  "Biżuteria": DiamondIcon,
  "Kosmetyki":CleanHandsIcon
}


function Shop() {
    const { user } = useContext(AuthContext);
    const [categories, setcategories] = useState([]);
    const [pricemin, setpricemin] = useState(0);
    const [pricemax, setpricemax] = useState(100);
    const [products, setproducts] = useState([]);
    const [isReady, setisReady] = useState(false); // czy załadowano produkty (po zmianie konkretnych warunków)

    const deleteCategory = (categoryName) => {
        setcategories(categories.filter(item => item !== categoryName));
    }

    const addCategory = (categoryName) => {
        setcategories([...categories, categoryName]);
    }
    
    return (
        <div className="shop-container">
            <div style={{maxWidth:"100%",height:"100%",display:"flex",justifyContent:"space-between"}}>
                <Filter onAddCategory={addCategory} categoriesMap={categoriesMap}/>
                <div style={{maxWidth:"100%",height:"100%",paddingTop:"20px",paddingLeft:"10%", paddingRight:"10%",overflowY:"scroll", display:"flex",flexDirection:"column",alignItems:"center",gap:"20px"}}>
                <TextField color="secondary" id="outlined-basic" label="Nazwa produktu" style={{width:"100%"}}/>
                <CategoryPanel chosenCategories={categories} categoriesMap={categoriesMap} onCategoryDelete={deleteCategory}/>
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
