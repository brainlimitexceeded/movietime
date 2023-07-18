import React, { useEffect, useState } from 'react';
import { Typography, Grid, Box, Container, TextField, Button, makeStyles, useTheme, ThemeProvider } from '@material-ui/core';
import { BookingDetails, PricingDetails } from './BookingDetails';
import ContactDetails from './ContactDetails';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  gridContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
}));

function Payment() {
  const theme = useTheme();
  const classes = useStyles();

  const hashParams = window.location.hash.split('&');
  const showId = hashParams[0].split('=')[1];
  const seats = hashParams[1].split('=')[1];
  const [showData, setShowData] = useState(null);

  useEffect(() => {
    // Call your API to fetch show data using the showId
    fetch(`/api/movies/show?show_id=${showId}`)
      .then((response) => response.json())
      .then((data) => {
        setShowData({ ...data, seats: seats });
        // setShowData(data);
        // console.log(seats);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }, [showId]);

  return (
    <ThemeProvider theme={theme}>
    <Container className={classes.container}>
      {showData ? (
        <Grid container spacing={2} className={classes.gridContainer}>
          <Grid item xs={12} sm={6}>
            <BookingDetails showData={showData} />

            <PricingDetails showData={showData} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ContactDetails />
          </Grid>
        </Grid>
      ) : (
        <Typography variant="body1">Loading show data...</Typography>
      )}
    </Container>
    </ThemeProvider>
  );
}

export default Payment;
