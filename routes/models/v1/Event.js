const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },

    name: {
      type: String,
      required: true
    },

    desc: {
      type: String,
      required: true
    },

    address: [
      {
        street: {
          type: String
        },

        zipcode: {
          type: String
        }
      }
    ],

    hostedBy: [
      {
        hostname: {
          type: String
        },

        phone: {
          type: String
        },

        email: {
          type: String
        }
      }
    ],

    time: [
      {
        startsAt: {
          type: Date
        },

        endsAt: {
          type: Date
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('events', EventSchema);
