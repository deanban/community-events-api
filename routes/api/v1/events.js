const express = require('express');
const Event = require('../../models/v1/Event');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const validation = require('../../../validations/events');

const router = express.Router();

//@route GET api/users / test
//@dsc tests users route
//@access public
router.get('/test', (req, res, next) =>
  res.json({ msg: 'Hello World from Events!' })
);

//@route GET api/events/
//@dsc add new event
//@access private
router.post(
  '/new',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    const { id } = req.user;
    const { name, desc } = req.body;

    const { eventErrors, isValid } = validation.validateEvent(req.body);

    if (!isValid) return res.status(400).json(eventErrors);

    const newEvent = new Event({ user: id, name, desc });

    newEvent.save().then(event => {
      const { id, user, name, desc } = event;
      res.json({
        id,
        user,
        name,
        desc
      });
    });
  }
);

// router.post(
//   '/update/:eventid/address',
//   passport.authenticate('jwt', { session: false }),
//   (req, res, next) => {
//     const { addrErrors, isValidAddr } = validation.validateAddress(req.body);
//     const { eventid } = req.params;
//     const {
//       street,
//       zipcode,
//       hostname,
//       phone,
//       email,
//       startsAt,
//       endsAt
//     } = req.body;
//   }
// );

module.exports = router;
