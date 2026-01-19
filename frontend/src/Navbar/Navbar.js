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
import MenuIcon from "@mui/icons-material/Menu";
import DryCleaningIcon from '@mui/icons-material/DryCleaning';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../API/AuthContext";

const navLinks = [
  { label: "Strona główna", path: "/", icon: HomeIcon },
  { label: "Konto", path: "/konto", icon: AccountBoxIcon },
  { label: "Koszyk", path: "/koszyk", icon: ShoppingCartIcon }
];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <AppBar position="sticky" sx={{ height: "64px" }}>
        <Toolbar sx={{ position: "relative" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
              sx={{ display: { xs: "none", sm: "block" }, textDecoration: "none", color: "inherit", fontWeight: 600 }}
            >
              ShoppingHaul
            </Typography>
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 2,
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)"
            }}
          >
            <Button
              component={Link}
              to='/'
              color="inherit"
            >
              <HomeIcon sx={{ mr: 1 }} />
              Strona główna
            </Button>
            {user && user.role === 'admin' && (
              <Button
                component={Link}
                to='/konto'
                color="inherit"
              >
                <AdminPanelSettingsIcon sx={{ mr: 1 }} />
                Admin
              </Button>
            )}
            {user && user.role === 'user' && (
              <Button
                component={Link}
                to='/konto'
                color="inherit"
              >
                <AccountBoxIcon sx={{ mr: 1 }} />
                Konto
              </Button>
            )}
            {user && user.role === 'user' && (
              <Button
                component={Link}
                to='/koszyk'
                color="inherit"
              >
                <ShoppingCartIcon sx={{ mr: 1 }} />
                Koszyk
              </Button>
            )}
          </Box>

          <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
            {user ?
              <>
                <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: "secondary.main" }} style={{ border: "2px solid black" }}>{user && user.username[0].toUpperCase()}</Avatar>
                <Button variant="contained" color="secondary"
                  style={{ color: "white" }} onClick={logout}>Wyloguj się</Button>
              </>
              :
              <Button variant="contained" color="secondary" sx={{ color: "white" }} component={Link}
                to="/login">
                Zaloguj się
              </Button>
            }
          </Box>
        </Toolbar>
      </AppBar>
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
              <ListItemButton key={link.label} component={Link} to={link.path} >
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

