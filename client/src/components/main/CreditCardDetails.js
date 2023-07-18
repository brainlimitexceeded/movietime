import { Typography, Box, TextField, Button, makeStyles, useTheme, ThemeProvider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  heading: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
}));

// Credit Card Details Component
const CreditCardDetails = () => {
  const classes = useStyles();
  const theme = useTheme();
  const handlePayment = () => {
    // Handle payment logic
    fetch(`/api/payment/create-checkout-session`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        // setShow(data);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
    
  };

  return (
    <ThemeProvider theme={theme}>
    <Box p={2} bgcolor="background.paper">
      <Typography variant="h6" className={classes.heading}>
        Credit Card Details
      </Typography>
      <TextField
        label="Card Number"
        fullWidth
        margin="normal"
        className={classes.textField}
      />
      <TextField
        label="Expiration Date"
        fullWidth
        margin="normal"
        className={classes.textField}
      />
      <TextField
        label="CVV"
        fullWidth
        margin="normal"
        className={classes.textField}
      />
      <Button variant="contained" color="primary" onClick={handlePayment}>
        Pay Now
      </Button>
    </Box>
    </ThemeProvider>

  );
};

export default CreditCardDetails;
