const express = require('express');
const mongoose = require('mongoose');
const cities = require('./routes/api/cities'); 

const app = express();

app.use(express.json());

const db = require('./config/keys').mongoURI;

mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use('/api/cities', cities);

const port = process.env.PORT || 5400;

app.listen(port, () => console.log(`Server started on port ${port}`));
