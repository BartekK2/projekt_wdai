import { Button, TextField } from "@mui/material";
import { DotLottiePlayer } from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';

function Home() {
  return (
    <div style={{width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center"}}>
        <Button/>
        <TextField/>
        <DotLottiePlayer
        src="/lottie/woman.lottie" // Ścieżka do pliku w folderze public!!!
        autoplay
        loop
      />
    </div>
  );
}

export default Home;