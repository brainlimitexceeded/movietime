const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
  show_id: {
    type: Number,
    required: true,
  },
  movie_id: {
    type: Number,
    required: true,
  },
  auditorium_id: {
    type: Number,
    required: true,
  },
  show_time: {
    type: String,
    required: true,
  },
  show_date: {
    type: Date,
    required: true,
  },
  ticket_price: {
    type: Number,
    required: true,
  },
});

const Show = mongoose.model('Show', showSchema);

module.exports = Show;
