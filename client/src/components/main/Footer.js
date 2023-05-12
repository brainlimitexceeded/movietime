import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function Footer() {
  return (
    <Box 
      sx={{ 
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        backgroundColor: 'primary.main',
        color: 'white',
        textAlign: 'center',
        p: 1 
      }}>
      <Container>
        <Typography variant="body1">
          &copy; {new Date().getFullYear()} Movie Time
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
