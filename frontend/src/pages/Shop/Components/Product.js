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

export default function Product() {
  return (
    <Card sx={{ maxWidth: 300 }} style={{border:"solid 1px",borderRadius:"20px"}} variant="outlined">
        <CardActionArea>
            <CardMedia
                component="img"
                height="194"
                image="https://mui.com/static/images/cards/paella.jpg"
                alt="Paella dish"
                style={{display:"bord",borderBottom:"solid 1px",borderRadius:"20px"}}
            />
            <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                This impressive paella is a perfect party dish and a fun meal to cook
                together with your guests. Add 1 cup of frozen peas along with the mussels,
                if you like.
                </Typography>
            </CardContent>
        </CardActionArea>

        <CardActions disableSpacing style={{borderTop:"solid 1px",borderRadius:"25px"}}>
            <IconButton color='primary'>
            <FavoriteIcon/>
            </IconButton>
            <IconButton>
            <ShareIcon/>
            </IconButton>
            <IconButton style={{marginLeft:"auto"}}>
            <AddShoppingCartIcon/>
            </IconButton>
            
        </CardActions>
    </Card>
  );
}