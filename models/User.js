const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
      }
    }
  ],
  photo: {
    data: Buffer,
    type: String
  },

  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('users', UserSchema);
