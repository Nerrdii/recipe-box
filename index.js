const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const keys = require('./config/keys');

require('./auth/passport');

mongoose.set('useFindAndModify', false);
mongoose.connect(keys.mongoURI, { useNewUrlParser: true }, () =>
  console.log('Connected to MongoDB')
);

const app = express();

app.use(bodyParser.json());

app.use(passport.initialize());

app.use('/api/recipes', require('./routes/recipes'));
app.use('/auth', require('./routes/auth'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => `Server started on port ${PORT}`);
