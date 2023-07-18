import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { useSelector } from 'react-redux';


function Detail() {
  const location = useLocation();
  const [movie, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);


  useEffect(() => {
    const hash = window.location.hash;
    const id = hash.substring(hash.indexOf('?id=') + 4);
    if (id) {
      fetchMovieDetails(id);
    } else {
      setLoading(false);
    }
  }, [location]);

  const fetchMovieDetails = async (id) => {
    try {
      const response = await fetch(`/api/movies/details/${id}`);
      const data = await response.json();
      setMovieDetails(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching movie details:', error);
      setLoading(false);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const getVideoUrl = (trailerUrl) => {
    const videoId = trailerUrl.split('v=')[1];
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return embedUrl;
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {loading ? (
        <LinearProgress />
      ) : movie ? (
        <Card>
          <CardMedia
            component="img"
            height="450"
            image={movie.image}
            alt={movie.title}
            style={{
              objectFit: 'contain',
              width: '50%',
            }}
          />

          <CardContent style={{ flex: 1 }}>
            <Typography variant="h4" gutterBottom>
              {movie.title}
            </Typography>
            <Typography variant="body1">
              {movie.description}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              Director: {movie.director}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Cast: {movie.cast.join(', ')}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Genre: {movie.genre}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Duration: {movie.duration} minutes
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenDialog}
            >
              Watch Trailer
            </Button>
            <Button variant="contained" color="secondary" onClick={() => window.location.hash = `#book?id=${movie.id}`}>
              Book Tickets
            </Button>
          </CardContent>
        </Card>
      ) : (
        <p>Failed to load movie details.</p>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="lg">
        <CardMedia
          component="iframe"
          height="450"
          src={movie && getVideoUrl(movie.trailer)}
          title={movie && movie.title}
        />
      </Dialog>
    </div>
  );
}

export default Detail;
