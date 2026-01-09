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
import { dataContext } from '../../API/DataContext';


const categoriesMap={
  "Buty":IceSkatingIcon,
  "Dla dzieci": ChildFriendlyIcon,
  "Odzież": CheckroomIcon,
  "Biżuteria": DiamondIcon,
  "Kosmetyki":CleanHandsIcon
}

function Shop() {
    const { user } = useContext(AuthContext);
    const { getProducts } = useContext(dataContext);
    const [products, setproducts] = useState([]);

    const [categories, setcategories] = useState(Object.keys(categoriesMap));
    const [priceRange, setpriceRange] = useState([0, 2000]);

    const [search, setsearch] = useState("");
    const [isReady, setisReady] = useState(false); // czy załadowano produkty (po zmianie konkretnych warunków)


    const deleteCategory = (categoryName) => {
        setcategories(categories.filter(item => item !== categoryName));
    }

    const addCategory = (categoryName) => {
        setcategories([...categories, categoryName]);
    }

    useEffect(() => {
        const fetchData = async () => {
            console.log(priceRange);
            const data = await getProducts(categories, Math.min(...priceRange), Math.max(...priceRange), search); 
            console.log("Pobrane dane:", data);
            setproducts(data);
        };
        fetchData();
    }, [categories,search,priceRange])
    
    
    return (
        <div className="shop-container" style={{ height: "calc(100vh - 64px)", overflow: "hidden" }}>
            <div style={{width:"100%",padding:"2rem",height:"100%",display:"flex",justifyContent:"space-between"}}>
                <Filter onAddCategory={addCategory} priceRange={priceRange} changePrice={setpriceRange} categoriesMap={categoriesMap}/>
                <div style={{width:"100%",height:"100%",paddingTop:"20px",paddingLeft:"5%", paddingRight:"5%", display:"flex",flexDirection:"column",alignItems:"center",gap:"20px"}}>
                <TextField color="secondary" id="outlined-basic" label="Nazwa produktu" style={{width:"100%"}} onChange={(event)=>setsearch(event.target.value)}/>
                <CategoryPanel chosenCategories={categories} categoriesMap={categoriesMap} onCategoryDelete={deleteCategory}/>
                <div style={{width:"100%",height:"100%",overflowY:"auto",display:"flex",gap:"30px", flexWrap:"wrap",justifyContent:"center"}}>
                    {products.map(({id, category,description, imageURL, name,price}) => 
                    <Product key={id} id={id}description={description} category={category} imageURL={imageURL} name={name} price={price}/>)}
                </div>
                </div>

            </div>
        </div>
    );
}

export default Shop;
