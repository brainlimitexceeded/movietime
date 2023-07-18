const mongoose = require('mongoose');
const auditoriumSchema = new mongoose.Schema({
  auditorium_id: {
    type: Number,
    required: true,
  },
  auditorium_name: {
    type: String,
    required: true,
  },
  theater_id: {
    type: Number,
    required: true,
  },
  seating_capacity: {
    type: Number,
    required: true,
  },
});

const Audi = mongoose.model('Audi', auditoriumSchema);

module.exports = Audi;



