const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: Date,
    default: Date.now
  }
});

module.exports = Item = mongoose.model('city', ItemSchema);
