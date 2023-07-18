const express = require('express');
const mongoose = require('mongoose');
const cities = require('./routes/api/cities'); 
const movies = require('./routes/api/movies'); 
const seats = require('./routes/api/seats');
const payment = require('./routes/api/payment');

const app = express();

app.use(express.json());

const db = require('./config/keys').mongoURI;

mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use('/api/cities', cities);
app.use('/api/movies', movies);
app.use('/api/seats', seats);
app.use('/api/payment', payment);

const port = process.env.PORT || 5400;

app.listen(port, () => console.log(`Server started on port ${port}`));
