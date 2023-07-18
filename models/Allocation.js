const mongoose = require('mongoose');

const allocationSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  seat_id: {
    type: Number,
    required: true,
  },
  reservation_id: {
    type: Number,
    required: true,
  },
  show_id: {
    type: Number,
    required: true,
  },
});

const Allocation = mongoose.model('Allocation', allocationSchema);

module.exports = Allocation;
