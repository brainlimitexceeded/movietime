const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  auditorium_id: {
    type: Number,
    required: true,
  },
  row: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
});

const Seat = mongoose.model('Seat', seatSchema);

module.exports = Seat;
