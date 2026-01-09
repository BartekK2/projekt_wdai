import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { CardActionArea } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function Product({ category, description, imageURL, name,price}) {
  return (
    <Card sx={{ width: "300px",height:"430px" }} style={{border:"solid 1px",borderRadius:"20px",display:"flex",flexDirection:"column"}} variant="outlined">
        <CardActionArea style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"flex-start"}}>
            <CardMedia
                component="img"
                height="194"
                image={imageURL? imageURL: "https://mui.com/static/images/cards/paella.jpg"}
                alt={name}
                style={{display:"bord",borderBottom:"solid 1px",borderRadius:"20px"}}
            />
            <CardContent>
                
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    {name}
                </Typography>
                <Typography variant="body2" sx={{overflow:'hidden',maxHeight:"115px", color: 'text.secondary' }}>
                    {description}
                </Typography>
            </CardContent>
        </CardActionArea>

        <CardActions disableSpacing style={{borderTop:"solid 1px",borderRadius:"25px",height:"60px"}}>
            <IconButton color='primary'>
            <FavoriteIcon/>
            </IconButton>
            <IconButton>
            <ShareIcon/>
            </IconButton>
            <div style={{marginLeft:"auto",display:"flex",alignItems:"center"}}>
                <Typography variant="body2" sx={{ color: 'text.secondary', marginRight:"10px" }}>
                    {price}zł
                </Typography>
                <IconButton >
                <AddShoppingCartIcon/>
                </IconButton>
            </div>
            
            
        </CardActions>
    </Card>
  );
}