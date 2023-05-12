import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import Container from '@mui/material/Container';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { useDispatch } from 'react-redux';




function Home() {
  const [location, setLocation] = useState(null);
  const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState(null);
  const [cityObject, setSelectedCityObject] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (location && !dialogOpen) {
      setDialogOpen(true);
    }
  }, [location]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      });
    }
  }, []);

  useEffect(() => {
    if (location) {
       fetch(`/api/cities?latitude=${location.latitude}&longitude=${location.longitude}`)
        .then((response) => response.json())
        .then((data) => setCities(data))
        .catch((error) => console.error('Error:', error));

        fetch(`/api/cities/current?latitude=${location.latitude}&longitude=${location.longitude}`)
        .then((response) => response.json())
        .then((data) => setCurrentCity(data))
        .catch((error) => console.error('Error:', error));
    }
  }, [location]);

  useEffect(() => {
    console.log(cityObject);
    dispatch({ type: 'SET_SELECTED_CITY', payload: cityObject });
  },[cityObject])

  return (
    <div>
      <Container id="home" maxWidth="md" style={{ marginTop: '2em', marginBottom: '2em' }}>
        {location && currentCity && (
           <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
           <DialogTitle>Your location</DialogTitle>
           <DialogContent>
             <DialogContentText>
              {currentCity.name}<LocationCityIcon fontSize="large" style={{ marginRight: '0.5em'}} />
             </DialogContentText>
           </DialogContent>
           <DialogActions>
             <Button onClick={() => setDialogOpen(false)}>
               Close
             </Button>
             <Button onClick={() => {
                setDialogOpen(false)
                window.location = '#movies';
               setSelectedCityObject(currentCity);
             }}>
               Proceed
             </Button>
           </DialogActions>
         </Dialog>
        )}
      <Autocomplete
        options={cities}
        getOptionLabel={(option) => `${option.name}, ${option.country}, ${option.lat}, ${option.lng}`}
        style={{ width: 300 }}
        onChange={(event, newValue) => {
          window.location = '#movies';
          setSelectedCityObject(newValue);
        }}
        renderOption={(props, option) => (
          <li {...props}>
            {option.name}
          </li>
        )}
        renderInput={(params) => <TextField {...params} label="Choose a city" variant="outlined" value={cityObject ? cityObject.name : params.inputProps.value}  />}
      />
      </Container>
    </div>
  );
}

export default Home;
