const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  postal_code: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const theaterSchema = new mongoose.Schema({
  theater_id: {
    type: Number,
    required: true,
  },
  theater_name: {
    type: String,
    required: true,
  },
  contact_number: {
    type: String,
    required: true,
  },
  address: {
    type: addressSchema,
    required: true,
  },
});

const Theatre = mongoose.model('Theatre', theaterSchema);

module.exports = Theatre;
