const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/users');

//registrate
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(user) {
      res.json({duplicate: true, msg: 'Sorry, that username is taken. Please try another'});
    } else if (!user) {
      User.addUser(newUser, (err, user) => {
        if(err) {
          res.json({success: false, msg: 'Failed to register user'});
        } else {
          res.json({success: true, msg: 'User registered successfully'});
        }
      })
    }
  });
});

//authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user) {
      return res.json({success: false, msg: 'User not found'});
    }
    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch) {
        const token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, msg: 'Incorrect password'});
      }
    });

  });
});

//profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  res.send({user: req.user});
});

module.exports = router;
