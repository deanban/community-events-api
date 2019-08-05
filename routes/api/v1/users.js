const express = require('express');
const User = require('../../models/v1/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const key = require('../../../config/dbConfig').secretKey;

const router = express.Router();

const capitalize = require('../../helpers/capitalize');
const validateRegistration = require('../../../validations/register');
const validateLogin = require('../../../validations/login');

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

  const { errors, isValid } = validateRegistration.validateUser(req.body);
  const { workErrors, isEmpty } = validateRegistration.validateWork(req.body);

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

//@route POST api/users/login
//@dsc login users route
//@access public
router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  const { errors, isValid } = validateLogin(req.body);

  if (!isValid) return res.status(400).json(errors);

  User.findOne({ email })
    .then(user => {
      if (!user) {
        errors.email = 'User with that email does not exist.';
        return res.status(400).json(errors);
      } else {
        bcrypt
          .compare(password, user.password)
          .then(isMatch => {
            if (isMatch) {
              //user matched
              //create jwt payload
              const payload = {
                id: user.id,
                name: user.name
              };
              jwt.sign(payload, key, { expiresIn: '24h' }, (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                });
              });
              // res.json({ msg: "success" });
            } else {
              errors.password = 'Incorrect Password.';
              return res.status(400).json(errors);
            }
          })
          .catch(err => {
            throw err;
          });
      }
    })
    .catch(err => next(err));
});

//@route POST api/users/current
//@dsc authenticate current user
//@access private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({ id: req.user.id, name: req.user.name, email: req.user.email });
  }
);

module.exports = router;
