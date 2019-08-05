const express = require('express');
const User = require('../../models/v1/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const router = express.Router();

const capitalize = require('../../helpers/capitalize');
const validate = require('../../../validations/register');

//@route GET api/users / test
//@dsc tests users route
//@access public
router.get('/test', (req, res, next) =>
  res.json({ msg: 'Hello World from Users!' })
);

//@route POST api/users/register
//@dsc register users route
//@access public
router.post('/signup', (req, res, next) => {
  const { name, email, password, place, address, phone } = req.body;

  const { errors, isValid } = validate.validateUser(req.body);
  const { workErrors, isEmpty } = validate.validateWork(req.body);

  if (!isValid) return res.status(400).json(errors);
  if (!isEmpty) return res.status(400).json(workErrors);

  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.email = 'An user with that email already exists.';
        return res.status(400).json(errors);
      } else {
        const newUser = new User({
          name: capitalize(name),
          email,
          password,
          placeOfWork: [
            {
              place: capitalize(place),
              address,
              phone
            }
          ]
        });

        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => next(err));
          });
        });
      }
    })
    .catch(err => next(err));
});

module.exports = router;
