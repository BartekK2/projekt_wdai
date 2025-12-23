import { Button, Typography } from "@mui/material";
import { DotLottiePlayer } from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';
import './Home.css'; // import pliku CSS
import { Link } from "react-router-dom";
import {isLoggedIn} from "../../API/AUTH";
import { useEffect, useState } from "react";

/*
TODO:
- może trzeba by było pogrzebać w animacji żeby zmienić kolor bluzki na inny
bo się zlewa z tłem
*/



function Home() {
  const [logged, setisLoggedIn] = useState(false);
  useEffect(() => {
    setisLoggedIn(isLoggedIn());
  }, [])
  
  return (
    <div className="home-container">
      <div className="home-left">
        <Typography variant="h3" component="h1" className="home-title">
          Witaj {logged && 'z powrotem'} na naszej stronie!
        </Typography>
        <Typography variant="h6" className="home-subtitle">
          {logged?
          'Miłych zakupów!'
          :
          'Zaloguj się, aby rozpocząć, lub zarejestruj nowe konto'
          }
        </Typography>
        {logged ?
        <div className="home-buttons">
          <Button variant="contained" color="primary" size="large" component={Link}  to="/login?action=login">
            Nasze produkty
          </Button>
        </div>
        :
        <div className="home-buttons">
          <Button variant="contained" color="secondary" sx={{color:"white"}} size="large" component={Link}  to="/login?action=login">
            Zaloguj się
          </Button>
          <Button color="secondary" variant="outlined" size="large" component={Link}  to="/login?action=registration">
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
