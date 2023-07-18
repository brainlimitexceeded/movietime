import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const ShowContainer = ({ theater, shows }) => {
  return (
    <Paper elevation={3} style={{ marginBottom: '2rem' }}>
      <Typography variant="h6" style={{ padding: '0.5rem' }}>
        {theater.theater_name}
      </Typography>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '1rem',
          padding: '0.5rem',
        }}
      >
        {shows.map((show) => (
          <div
            key={show.show_id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '1rem',
            }}
          >
            <Button variant="contained" color="primary" onClick={() => window.location.hash = `#allocate?id=${show.show_id}`}>
              {show.show_time}
            </Button>
            <Typography variant="body2">Price: ${show.ticket_price}</Typography>
          </div>
        ))}
      </div>
    </Paper>
  );
};



function Book() {
  const selectedCity = useSelector((state) => state.selectedCity);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [date, setDate] = useState('');
  const [shows, setShows] = useState([]);
  const [movie, setMovie] = useState(null);
  const movieid = window.location.hash.split('=')[1];
  const theme = useTheme();

  useEffect(() => {
    // Fetch shows based on filter criteria
    fetchShows();
  }, [priceRange, date]);

  useEffect(() => {
    fetchMovieDetails();
  }, [selectedCity]);

  const fetchShows = async () => {
    try {
      // Perform fetch request to get shows based on filter criteria
      const url = `/api/movies/shows?price=${priceRange[0]}-${priceRange[1]}&date=${date}&city=${selectedCity.name}&movieid=${movieid}`;
      const response = await fetch(url);
      const data = await response.json();
      setShows(data);
    } catch (error) {
      console.error(error);
      // Handle error gracefully
    }
  };

  const fetchMovieDetails = async () => {
    try {
      const response = await fetch(`/api/movies/details/${movieid}`);
      const data = await response.json();
      setMovie(data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  // Group shows by theater
  const groupedShows = shows.reduce((groups, show) => {
    const theaterId = show.theater.theater_id;
    if (!groups[theaterId]) {
      groups[theaterId] = {
        theater: show.theater,
        shows: [],
      };
    }
    groups[theaterId].shows.push(show);
    return groups;
  }, {});

  return (
    <Box p={2}>
      <Box
        boxShadow={1}
        p={2}
        style={{ backgroundColor: theme.palette.secondary.light }}
      >
                <Typography variant="h4" align="center" style={{ color: theme.palette.primary.main }}>
          Movie: {movie && movie.title}
        </Typography>
      </Box>

      <Box mt={2} boxShadow={1}  p={2} sx={{ backgroundColor: theme.palette.secondary.light }}>
        <Typography variant="h6" component="span">
          <FontAwesomeIcon icon={faFilter} style={{ marginRight: '0.5rem' }} />
          Filters
        </Typography>

        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">Price Range:</Typography>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Slider value={priceRange} onChange={handlePriceRangeChange} min={0} max={1000} step={10} />
              <Box display="flex" alignItems="center">
                <Typography variant="body1">{priceRange[0]}$</Typography>
                <Typography variant="body1">-</Typography>
                <Typography variant="body1">{priceRange[1]}$</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">Date:</Typography>
            <TextField
              value={date}
              onChange={handleDateChange}
              type="date"
              variant="outlined"
              size="small"
              fullWidth
            />
          </Grid>
        </Grid>
      </Box>

      <Box mt={2}  >
        <Typography variant="h4" component="h2" textAlign="center" sx={{ marginBottom: '1rem', borderBottom: '2px solid #ccc', paddingBottom: '0.5rem' }}>
          Available Shows
        </Typography>
        {/* Display show results here */}
        {Object.values(groupedShows).map((group) => (
          <ShowContainer key={group.theater.theater_id} theater={group.theater} shows={group.shows} />
        ))}
      </Box>
    </Box>
  );
}

export default Book;

