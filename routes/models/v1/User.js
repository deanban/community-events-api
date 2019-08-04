const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    password: {
      type: String,
      required: true
    },

    placeOfWork: [
      {
        name: {
          type: String,
          required: true
        },

        address: {
          type: String,
          required: true
        },

        phone: {
          type: String,
          required: true
        }
      }
    ],

    photo: {
      data: Buffer,
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('users', UserSchema);
