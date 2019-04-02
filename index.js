const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const passport = require('passport');

require('dotenv').config();
require('./services/passport');

mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useFindAndModify: false },
  () => console.log('Connected to MongoDB')
);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(passport.initialize());

app.use('/api/recipes', require('./routes/recipes'));
app.use('/api/auth', require('./routes/auth'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
