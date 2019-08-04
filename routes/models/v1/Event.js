const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },

    desc: {
      type: String,
      required: true
    },

    address: {
      type: String,
      required: true
    },

    zipcode: {
      type: String,
      required: true
    },

    hostedBy: {
      type: String,
      required: true
    },

    startsAt: {
      type: Date,
      required: true
    },

    endsAt: {
      type: Date,
      required: true
    },

    photo: {
      data: Buffer,
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('events', EventSchema);
