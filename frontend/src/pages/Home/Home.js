import { Button, Typography } from "@mui/material";
import { DotLottiePlayer } from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';
import './Home.css';
import { Link } from "react-router-dom";
import { useEffect, useState,useContext } from "react";
import { AuthContext } from "../../API/AuthContext";

/*
TODO:
- może trzeba by było pogrzebać w animacji żeby zmienić kolor bluzki na inny
bo się zlewa z tłem
*/



function Home() {
  const { user } = useContext(AuthContext);
  
  return (
    <div className="home-container">
      <div className="home-left">
        <Typography variant="h3" component="h1" className="home-title">
          Witaj {user && 'z powrotem'} na naszej stronie!
        </Typography>
        <Typography variant="h6" className="home-subtitle">
          {user?
          'Miłych zakupów!'
          :
          'Zaloguj się, aby rozpocząć, lub zarejestruj nowe konto'
          }
        </Typography>
        {user ?
        <div className="home-buttons">
          <Button variant="contained" color="primary" size="large" component={Link}  to="/shop">
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
