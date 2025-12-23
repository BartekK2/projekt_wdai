import { Button, Typography } from "@mui/material";
import { DotLottiePlayer } from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';
import './Home.css'; // import pliku CSS
import { Link } from "react-router-dom";
import {getCurrentUser, isLoggedIn} from "../../API/AUTH";

/*
TODO:
- może trzeba by było pogrzebać w animacji żeby zmienić kolor bluzki na inny
bo się zlewa z tłem
*/



function Home() {
  return (
    <div className="home-container">
      <div className="home-left">
        <Typography variant="h3" component="h1" className="home-title">
          Witaj {isLoggedIn && 'z powrotem'} w naszej aplikacji!
        </Typography>
        <Typography variant="h6" className="home-subtitle">
          {isLoggedIn?
          'Miłych zakupów!'
          :
          'Zaloguj się, aby rozpocząć, lub zarejestruj nowe konto'
          }
        </Typography>
        {isLoggedIn ?
        <div className="home-buttons">
          <Button variant="contained" color="primary" size="large" component={Link} to="/login?action=login">
            Nasze produkty
          </Button>
        </div>
        :
        <div className="home-buttons">
          <Button variant="contained" color="primary" size="large" component={Link} to="/login?action=login">
            Zaloguj się
          </Button>
          <Button variant="outlined" color="primary" size="large" component={Link} to="/login?action=registration">
            Zarejestruj się
          </Button>
        </div>
        }
        
      </div>
      <div className="home-right">
        <DotLottiePlayer
          src="/lottie/woman.lottie"
          autoplay
          loop
          className="home-lottie"
        />
      </div>
    </div>
  );
}

export default Home;
