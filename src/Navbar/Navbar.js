/*
TODO:
- zrobic wariant ze zamiast ikonki uzytkownika jest opcja logowania
- dodac do uzytkownika opcje wylogowania się (rozwijane menu) itd
*/


import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Avatar,
  Divider,
  ListItemIcon
} from "@mui/material";
// ikonki
// jakbyś chciał jakieś dodać albo zmienić to 
// stąd: https://mui.com/material-ui/material-icons/


import MenuIcon from "@mui/icons-material/Menu";
import DryCleaningIcon from '@mui/icons-material/DryCleaning';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { Link } from "react-router-dom";
import { useState } from "react";
// jeśli będziesz to zmieniał to musi być odpowiedni komponent
// dla tej strony tak jak dla strony głównej jest Home
// podlinkowany w routerze w App do linku "/"

const navLinks = [
  { label: "Strona główna", path: "/", icon: HomeIcon },
  { label: "Konto", path: "/konto", icon: AccountBoxIcon },
  { label: "Koszyk", path: "/koszyk", icon: ShoppingCartIcon }
];
// responsywność i styl zrobiłem bezpośrednio
// w wbudowanym w materialUI narzędziu do tego w sensie
// sx to style xs, md itd to rozmiar okna że mobilny, desktopowy

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <AppBar position="sticky">
        <Toolbar sx={{ position: "relative" }}>
          {/* LEWA STRONA: Hamburger + Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Hamburger: widoczny tylko w wersji mobilnej */}
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setDrawerOpen(true)}
              sx={{ display: { xs: "inline-flex", md: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <DryCleaningIcon />
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{ textDecoration: "none", color: "inherit", fontWeight: 600 }}
            >
              ShoppingHaul
            </Typography>
          </Box>

          {/* ŚRODEK: linki dla wersji desktopowej */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 2,
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)"
            }}
          >
            {navLinks.map((link) => (
              <Button
                key={link.label}
                component={Link}
                to={link.path}
                color="inherit"
              >
                {link.icon&& <link.icon sx={{ mr: 1 }}/>}
                {link.label}
              </Button>
            ))}
          </Box>

          {/* PRAWA STRONA: użytkownik */}
          <Box sx={{ ml: "auto" }}>
            <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Menu dla mobilnej */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ "& .MuiDrawer-paper": { width: 250 } }}
      >
        <Box role="presentation" onClick={() => setDrawerOpen(false)}>
          <Typography sx={{ m: 2, fontWeight: 600 }}>Navigation</Typography>
          <Divider />
          <List>
            {navLinks.map((link) => (
              <ListItemButton key={link.label} component={Link} to={link.path}>
                {link.icon && (
                  <ListItemIcon>
                    <link.icon />
                  </ListItemIcon>
                )}
                <ListItemText primary={link.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

