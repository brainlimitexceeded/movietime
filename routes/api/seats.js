const express = require('express');
const router = express.Router();

// Import the models
const Seat = require('../../models/Seat');
const Show = require('../../models/Show');
const Allocation = require('../../models/Allocation');

router.get('/', async (req, res) => {
    try {
      const { show_id } = req.query;
      const show = await Show.findOne({ show_id });
      const seats = await Seat.find({ 'auditorium_id': show.auditorium_id });
      const seatsData = await Promise.all(
        seats.map(async (seat) => {
          const allocation = await Allocation.findOne({ seat_id: seat._id, show_id });
          const status = allocation ? 'booked' : 'available';
  
          return {
            ...seat.toObject(),
            status,

          };
        })
      );
  
      res.json(seatsData);
    } catch (error) {
      console.log(error);
      // Handle any errors that occur during the database query
      res.status(500).json({ error: 'An error occurred while fetching data' });
    }
  });
  module.exports = router;
