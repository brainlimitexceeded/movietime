const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  cast: {
    type: [String],
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  trailer: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  genre:{
    type:String,
    required:true,
  },
  title: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;

