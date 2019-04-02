const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.get(
  '/google',
  passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email']
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const { user } = req;

    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.redirect(`/redirect?token=${token}`);
  }
);

module.exports = router;
