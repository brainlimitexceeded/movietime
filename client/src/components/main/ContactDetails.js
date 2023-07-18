import React, { useState } from 'react';
import { Typography, Box, TextField, Button, useTheme } from '@material-ui/core';
import CreditCardDetails from './CreditCardDetails';
import PaymentForm from './PaymentForm';

const ContactDetails = () => {
  const theme = useTheme();
  const [showCreditCard, setShowCreditCard] = useState(false);

  const handleContinue = () => {
    setShowCreditCard(true);
  };

  return (
    <Box p={2} bgcolor={theme.palette.background.paper}>
      <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: theme.spacing(2) }}>
        Contact Details
      </Typography>
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        style={{ marginBottom: theme.spacing(2) }}
      />
      <TextField
        label="Phone Number"
        fullWidth
        margin="normal"
        style={{ marginBottom: theme.spacing(2) }}
      />
      <Button variant="contained" color="primary" onClick={handleContinue}>
        Continue
      </Button>
      {/* {showCreditCard && <CreditCardDetails />} */}
      {showCreditCard && <PaymentForm />}
    </Box>
  );
};

export default ContactDetails;
