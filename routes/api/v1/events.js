const express = require('express');
const User = require('../../models/v1/User');
const Event = require('../../models/v1/Event');
const passport = require('passport');
const mongoose = require('mongoose');

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

router.post(
  '/:id/address',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    const { addrErrors, isValidAddr } = validation.validateAddress(req.body);

    if (!isValidAddr) return res.status(400).json(addrErrors);

    const {
      street,
      zipcode,
      hostname,
      phone,
      email,
      startsAt,
      endsAt
    } = req.body;

    // console.log(mongoose.Types.ObjectId.isValid(req.params.id));

    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      Event.findById(req.params.id)
        .then(event => {
          const eventAddr = {
            street,
            zipcode
          };
          console.log(event);

          event.address.unshift(eventAddr);

          event
            .save()
            .then(event => {
              const { id, user, name, desc, address } = event;
              res.json(event);
            })
            .catch(err => {
              throw err;
            });
        })
        .catch(err => next(err));
    }
  }
);

module.exports = router;
