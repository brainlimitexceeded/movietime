const express = require('express');
const router = express.Router();
const cities = require('cities.json');


// Function to calculate distance between two points specified by latitude and longitude
function calculateDistance(lat1, lon1, lat2, lon2) {
  const dx = lat2 - lat1;
  const dy = lon2 - lon1;
  return Math.sqrt(dx*dx + dy*dy);
}

// @route   GET api/cities
// @desc    Get All Items
// @access  Public
router.get('/current', (req, res) => {
  const latitude = parseFloat(req.query.latitude);
  const longitude = parseFloat(req.query.longitude);
  let closestCity = null;
  let minDistance = Infinity;

  cities.forEach(city => {
    const distance = calculateDistance(latitude, longitude, city.lat, city.lng);
    if (distance < minDistance) {
      minDistance = distance;
      closestCity = city;
    }
  });
  
  res.json(closestCity);
});

router.get('/', (req, res) => {
  const latitude = parseFloat(req.query.latitude);
  const longitude = parseFloat(req.query.longitude);
  
  let closestCity = null;
  let minDistance = Infinity;

  // Find the closest city
  cities.forEach(city => {
    const distance = calculateDistance(latitude, longitude, city.lat, city.lng);
    if (distance < minDistance) {
      minDistance = distance;
      closestCity = city;
    }
  });

  // Filter all cities that belong to the same country as the closest city
  const citiesInSameCountry = cities.filter(city => city.country === closestCity.country);

  res.json(citiesInSameCountry);
});



module.exports = router;
