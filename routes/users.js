const express = require('express');
const router = express.Router();

//registrate
router.get('/register', (req, res, next) => {
  res.send('register');
});

//authenticate
router.post('/authenticate', (req, res, next) => {
  res.send('authenticate');
});

//profile
router.get('/profile', (req, res, next) => {
  res.send('profile');
});

module.exports = router;
