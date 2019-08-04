const express = require('express');
const User = require('../../models/v1/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const router = express.Router();

//@route GET api/users / test
//@dsc tests users route
//@access public
router.get('/test', (req, res, next) =>
  res.json({ msg: 'Hello World from Users!' })
);

module.exports = router;
