import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Autocomplete, Chip } from '@mui/material';
import Grid from '@mui/material/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faFilter } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';







function Movies() {
    const selectedCity = useSelector(state => state.selectedCity);
    const [genres, setGenres] = useState([]);
    const [movies, setMovies] = useState([]);
    const theme = useTheme();
    const genreOptions = ['Action', 'Comedy', 'Drama', 'Romance', 'Sci-Fi', 'Thriller'];


    useEffect(() => {
        // Fetch movies based on filter criteria
        if(selectedCity) {
            fetchMovies();
        }
    }, [ genres]);

    

    const fetchMovies = async () => {
        // Perform fetch request to get movies based on filter criteria
        const url = `/api/movies?genres=${genres}&city=${selectedCity.name}`;
        const response = await fetch(url);
        const data = await response.json();
        setMovies(data);
    };


    const handleGenreChange = (event, value) => {
        setGenres(value);
    };
    
    if (!selectedCity) {
        window.location.hash = '#home';
        return null;
    }
    return (
        <Box p={2}>

            <Box mt={2} boxShadow={1} border={1}  borderRadius={4} p={2} sx={{ backgroundColor: theme.palette.secondary.light }}>
            <Typography variant="h6" component="span">
          <FontAwesomeIcon icon={faFilter} style={{ marginRight: '0.5rem' }} />
          Filters
        </Typography>
                <Grid container spacing={2} mt={2}>
        <Grid item xs={12} sm={12}>
          <Typography variant="body1">Genre:</Typography>
          <Autocomplete
            multiple
            options={genreOptions}
            value={genres}
            onChange={handleGenreChange}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                size="small"
                placeholder="Select genre(s)"
                fullWidth
              />
            )}
          />
          <Box mt={1}>
            {genres.map((genre) => (
              <Chip
                key={genre}
                label={genre}
                onDelete={() => setGenres(genres.filter((g) => g !== genre))}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
                
        </Box>


        <Box mt={2}>
  <Typography variant="h6">Available Shows</Typography>
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '16px',
    }}
  >
    {/* Display movie results here */}
    {movies.map(movie => (
      <div
        key={movie.id}
        style={{
          padding: '16px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          borderRadius: '4px',
        }}
      >
        {/* Create a link with the movie title and image */}
        <Link to={`#details?id=${movie.id}`} style={{ textDecoration: 'none' }} onClick={() => window.location.hash = `#details?id=${movie.id}`}>
          <Typography variant="subtitle1">{movie.title}</Typography>
          <img
            src={movie.image}
            alt={movie.title}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </Link>
      </div>
    ))}
  </div>
</Box>


         </Box>
                    );
                }
                
export default Movies;
                





  
