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
        name: {
          type: String,
          required: true
        },

        zipcode: {
          type: Number,
          required: true
        }
      }
    ],

    hostedBy: [
      {
        name: {
          type: String,
          required: true
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
          type: Date,
          required: true
        },

        endsAt: {
          type: Date,
          required: true
        }
      }
    ],

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
