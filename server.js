//set up ==========================
const express = require('express');
const path = require('path');                 //installs with cors module so it is not included in the dependencies listen
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

const app = express();

const users = require('./routes/users');

const port = 3000;

mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + config.database);
});

mongoose.connection.on('error', (err) => {
  console.log('Database error: ' + err);
});

//configuration ===================
app.use(cors());
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/users', users);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(port, () => {
  console.log('Server started on port ' + port);
});
