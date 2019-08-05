/*********************REQUIRES*************************/
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
// const formidable = require('express-formidable');
const passport = require('passport');

const users = require('./routes/api/v1/users');
const events = require('./routes/api/v1/events');

//passport config
// require('./config/passport')(passport);

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
// app.use(formidable());
//passport middleware
// app.use(passport.initialize());

//user route
app.use('/api/users', users);
app.use('/api/events', events);

/********************DB config*********************/
const db = require('./config/dbConfig').mongoURI;
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
