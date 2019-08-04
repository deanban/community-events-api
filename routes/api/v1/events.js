const express = require('express');
const Event = require('../../models/v1/Event');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const router = express.Router();

//@route GET api/users / test
//@dsc tests users route
//@access public
router.get('/test', (req, res, next) =>
  res.json({ msg: 'Hello World from Events!' })
);

module.exports = router;
