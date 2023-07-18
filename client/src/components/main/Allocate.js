import { useEffect, useState } from 'react';
import { Typography, Box, Container, Grid } from '@material-ui/core';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';




function Allocate() {
  const show_id = window.location.hash.split('=')[1];
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [amount, setAmount] = useState(0);
  const [show, setShow] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    fetch(`/api/movies/show?show_id=${show_id}`)
      .then((response) => response.json())
      .then((data) => {
        setShow(data);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
    // Fetch seats data from the backend API
    // Update the API endpoint and the way you fetch the data based on your implementation
    fetch(`/api/seats?show_id=${show_id}`)
      .then((response) => response.json())
      .then((data) => {
        setSeats(data);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }, [show_id]);

  const handleSeatSelect = (seat) => {
    if (seat.status !== 'booked') {
      const updatedSeats = seats.map((s) => {
        if (s._id === seat._id) {
          return { ...s, status: s.status === 'selected' ? 'available' : 'selected' };
        }
        return s;
      });
      setSeats(updatedSeats);
      const updatedSelectedSeats = updatedSeats.filter((s) => s.status === 'selected');
      setSelectedSeats(updatedSelectedSeats);
      console.log(updatedSelectedSeats);
      setAmount(updatedSelectedSeats.length*show.ticket_price)
    }
  };

  // Group seats by rows
  const groupedSeats = {};
  seats.forEach((seat) => {
    if (!groupedSeats[seat.row]) {
      groupedSeats[seat.row] = [];
    }
    groupedSeats[seat.row].push(seat);
  });

  return (
    <Container style={{ marginTop: '50px', marginBottom: '50px' }}>
      <Typography variant="h4" justifyContent="center" style={{ marginBottom: '16px', textAlign: 'center' }}>
        Select Your Seats
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {Object.keys(groupedSeats).map((row) => (
          <Grid key={row} item container xs={12} spacing={2} justifyContent="center">
            {groupedSeats[row].map((seat) => (
              <Grid key={seat._id} item>
                <Box
                  onClick={() => handleSeatSelect(seat)}
                  bgcolor={seat.status === 'booked' ? 'black' : seat.status === 'selected' ? 'green' : 'white'}
                  color={seat.status === 'booked' ? 'white' : 'black'}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  width="40px"
                  height="60px"
                  textAlign="center"
                  cursor={seat.status === 'booked' ? 'not-allowed' : 'pointer'}
                >
                  <EventSeatIcon />
                  <Typography variant="caption">{seat.row}{seat.number}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
        <Box
          boxShadow={6}
          bgcolor="background.paper"
          p={3}
          borderRadius="50%"
          style={{ width: 'fit-content' }}
        >
          <Typography variant="body1" style={{ textAlign: 'center' }}>
            Eyes this way. Chosen seats turn green.
          </Typography>
        </Box>
      </div>
      <Typography variant="h4" style={{ textAlign: 'center' }}>
        <Box display="flex" alignItems="center" justifyContent="center">
            <AttachMoneyIcon fontSize="large" />
            <span style={{ fontSize: '24px', marginLeft: '8px' }}>{amount}</span>
        </Box>
        </Typography>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Button variant="contained"  onClick={() => window.location.hash = `#payment?show_id=${show_id}&seats=${selectedSeats.map((obj) => obj._id)}`}>
                Confirm
        </Button>
      </div>
    </Container>
  );
}

export default Allocate;




