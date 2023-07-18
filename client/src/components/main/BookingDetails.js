import { Typography, Box, Card, CardContent, makeStyles, useTheme } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  heading: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
  },
  label: {
    fontWeight: 'bold',
    marginRight: theme.spacing(1),
  },
}));

// Booking Details Component
const BookingDetails = ({ showData }) => {
  const classes = useStyles();
  const {
    show_id,
    movie_id,
    auditorium_id,
    show_time,
    show_date,
    auditorium_name,
    theater,
    seats
  } = showData;
  const theme = useTheme();
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" className={classes.heading}>
          Booking Details
        </Typography>
        <Typography variant="body1" gutterBottom>
          <span className={classes.label}>Show ID:</span> {show_id}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <span className={classes.label}>Movie ID:</span> {movie_id}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <span className={classes.label}>Auditorium ID:</span> {auditorium_id}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <span className={classes.label}>Show Time:</span> {show_time}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <span className={classes.label}>Show Date:</span> {show_date}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <span className={classes.label}>Auditorium:</span> {auditorium_name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <span className={classes.label}>Theater:</span> {theater.theater_name}
        </Typography>
        {/* <Typography variant="body1" gutterBottom>
          <span className={classes.label}>Theater address:</span> {theater.address}
        </Typography> */}
        <Typography variant="body1">
          <span className={classes.label}>Theater contact:</span> {theater.contact_number}
        </Typography>
        <Typography variant="body1">
          <span className={classes.label}>Selected Seats:</span> {seats}
        </Typography>
      </CardContent>
    </Card>
  );
};

// Pricing Details Component
const PricingDetails = ({ showData }) => {
  const classes = useStyles();
  const { seats, ticket_price } = showData;
  const fee = 10
  const payableAmount = seats.length * ticket_price + fee;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" className={classes.heading}>
          Pricing Details
        </Typography>
        <Typography variant="body1">
          <span className={classes.label}>Booking Amount:</span> {ticket_price*seats.length}
        </Typography>
        <Typography variant="body1">
          <span className={classes.label}>Convenience Fee:</span> {fee}
        </Typography>
        <Typography variant="body1">
          <span className={classes.label}>Payable Amount:</span> {payableAmount}
        </Typography>
      </CardContent>
    </Card>
  );
};

export { BookingDetails, PricingDetails };
