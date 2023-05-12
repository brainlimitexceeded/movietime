import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import applogo from '../../resources/applogo.jpg';  // Adjust the relative path to match your project structure
  

function Header() {
  const handleNavLinkClick = () => {
    // window.location.reload();
  }
  return (
    
    <AppBar position="static">
      <Toolbar>
      <img src={applogo} alt="logo" style={{maxHeight: '50px', marginRight: '10px'}}/>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Movie Booking Dashboard
        </Typography>
        <Button color="inherit" href="#home" onClick={handleNavLinkClick}>Home</Button>
        <Button color="inherit" href="#movies" onClick={handleNavLinkClick}>Movies</Button>
        <Button color="inherit" href="#bookings" onClick={handleNavLinkClick}>Bookings</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
