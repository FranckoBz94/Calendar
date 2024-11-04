import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import sectionTittleIcon from './img/pnglogo.png'; // Importa la imagen

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Nosotros', href: '#nosotros' },
    { text: 'Equipo', href: '#equipo' },
    { text: 'Servicios', href: '#servicios' },
    // { text: 'Contacto', href: '#contacto' },
  ];

  return (
    <>
      <AppBar className="appBarLanding pt-2">
        <Toolbar className='container'>
          <Typography variant="h6" component="a" href="index.html" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
            <img src={sectionTittleIcon} alt="logo" style={{ filter: "grayscale(0) brightness(21)", width: "60px" }} />
          </Typography>
          <Toolbar sx={{ display: { xs: 'none', md: 'block' }, justifyContent: 'center' }}>
            <List sx={{ display: 'flex' }}>
              {menuItems.map((item) => (
                <ListItem button component="a" sx={{ color: "white" }} className="list_menu" href={item.href} key={item.text}>
                  <ListItemText primary={item.text} sx={{ textAlign: 'center' }} className='nameMenu' />
                </ListItem>
              ))}
            </List>
          </Toolbar>
          <IconButton
            edge="end"
            color="inherit"
            className="btn_menu_landing"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)} PaperProps={{
        sx: {
          backgroundColor: "transparent", // Color con transparencia para dar efecto de overlay
          color: "white",
          backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7))",
        },
      }}>
        <Box
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          sx={{ width: 250 }}
        >
          <Box sx={{ py: 2 }} display="flex" justifyContent="center">
            <img src={sectionTittleIcon} alt="logo" style={{ filter: "grayscale(0) brightness(20)", width: "60px" }} />
          </Box>

          <List>
            {menuItems.map((item) => (
              <ListItem button component="a" color='white' className="list_menu" href={item.href} key={item.text}>
                <ListItemText primary={item.text} style={{ fontSize: "15px !important" }} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer >


    </>
  );
};

export default Navbar;
