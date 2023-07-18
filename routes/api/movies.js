const express = require('express');
const router = express.Router();

// Import the models
const Movie = require('../../models/Movie');
const Theater = require('../../models/Theatre');
const Audi = require('../../models/Audi');
const Show = require('../../models/Show');

router.get('/show', async (req, res) => {
  try {
    const { show_id } = req.query;
    const show = await Show.findOne({
      show_id
    }).exec();
    // Retrieve the theater information for the show
    const auditorium = await Audi.findOne({ auditorium_id: show.auditorium_id }).exec();
    const theater = await Theater.findOne({ theater_id: auditorium.theater_id }).exec();
     let showData = {
      show_id: show.show_id,
      movie_id: show.movie_id,
      auditorium_id: show.auditorium_id,
      show_time: show.show_time,
      show_date: show.show_date,
      ticket_price: show.ticket_price,
      auditorium_name: auditorium.auditorium_name,
      theater: theater,
    };
    res.json(showData);
  } catch (error) {
    console.log(error);
    // Handle any errors that occur during the database query
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

router.get('/shows', async (req, res) => {
  const { price, date, city, movieid } = req.query;

  // Extract the minimum and maximum price from the price range
  const [minPrice, maxPrice] = price.split('-').map(Number);

  try {
    // Find all shows based on the given date, movie ID, and price range
    const shows = await Show.find({
      movie_id: movieid,
      ticket_price: { $gte: minPrice, $lte: maxPrice },
    }).exec();

    // Retrieve the theater information for each show
    const showData = await Promise.all(
      shows.map(async (show) => {
        const auditorium = await Audi.findOne({ auditorium_id: show.auditorium_id }).exec();
        const theater = await Theater.findOne({ theater_id: auditorium.theater_id }).exec();

        return {
          show_id: show.show_id,
          movie_id: show.movie_id,
          auditorium_id: show.auditorium_id,
          show_time: show.show_time,
          show_date: show.show_date,
          ticket_price: show.ticket_price,
          theater: theater,
        };
      })
    );

    // Filter shows by city
    const filteredShows = showData.filter((show) => show.theater.address.city === city);

    // Send the filtered shows as the response
    res.json(filteredShows);
  } catch (error) {
    console.log(error);
    // Handle any errors that occur during the database query
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});




router.get('/details/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const movie = await Movie.findOne({ 'id': id });
  
      if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
      }
  
      res.json(movie);
    } catch (error) {
      console.log(err);
      res.status(500).json({ error: 'An error occurred while fetching movie details' });
    }
  });
  
  router.get('/', async (req, res) => {
    try {
      const { genres, city } = req.query;
      let genreList = [];
      if (genres) {
        genreList = genres.split(',');
      }
  
      // Find theaters in the requested city
      const theaters = await Theater.find({ 'address.city': city });
      const auditoriums = await Audi.find({ 'theater_id': { $in: theaters.map(theater => theater.theater_id) } });
      // const auditoriums = await Auditorium.find();
      // Find shows in auditoriums of the theaters in the requested city
      const shows = await Show.find({ auditorium_id: { $in: auditoriums.map(audis => audis.auditorium_id) } });
      // auditoriums.forEach(t => {
      //     console.log(t); // You can replace this with your desired output format
      // });
  
      // Fetch movies that match any genre from the list and are present in the shows
      const movies = await Movie.find({ genre: { $in: genreList }, id: { $in: shows.map(show => show.movie_id) } });
  
      res.json(movies);
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: 'An error occurred while fetching movies' });
    }
  });
  
module.exports = router;
