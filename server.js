/*********************REQUIRES*************************/
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const passport = require('passport');

//passport config
require('./config/passport')(passport);

/*********************SET UPS*************************/
const app = express();

//express recognizes the use of the following four params as
//an error handling function.
//use 'next' in the router files to have those send the errors
//to this middleware.
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    type: 'error',
    message: err.message
  });
});

//cors
app.use(
  cors({
    origin: process.env.CORS_DEV_ORIGIN,
    credentials: true
  })
);

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
//passport middleware
app.use(passport.initialize());

/********************DB config*********************/
const db = require('./config/keys').mongoURI;
//connect to mongo
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('***********DB Connected to mLab***********'))
  .catch(err => console.log(err));

/*********************PORT*************************/
const port = process.env.PORT || 3001;

app.listen(port, () =>
  console.log(`***********Server Running on Port ${port}***********`)
);
