//create our app server with express
const express = require('express');
const app = express();

//set up ==========================
const path = require('path');                 //installs with cors module so it is not included in the dependencies listen
const bodyParser = require('body-parser');    //pull information from HTML POST
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');         //mongoose for mongodb
const config = require('./config/database');


const users = require('./routes/users');      //loads our custom router module/middleware to our app

const port = 3000;                            //sets our local port to 3000

mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + config.database);
});

mongoose.connection.on('error', (err) => {
  console.log('Database error: ' + err);
});

//configuration ===================
app.use(cors());                              //mounts cors and **MUST be placed before any other routes**
app.use(bodyParser.json());                   //MUST be mounted before ANY routes so the server can pull html from POST

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use(express.static(path.join(__dirname, 'public')));      // set the static files location

app.use('/users', users);                     //mounts our router with a base address of localhost:"our port #"/users

app.get('/', (req, res) => {
  res.send('hello world');
});

//listen for connections on our designated port (start app with node server.js) ===========
app.listen(port, () => {
  console.log('Server started on port ' + port);
});
