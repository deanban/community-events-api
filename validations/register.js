const Validator = require('validator');
const isEmpty = require('./isEmpty');

const validateUser = data => {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm Password field is required';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const validateWork = data => {
  let errors = {};

  data.place = !isEmpty(data.place) ? data.place : '';
  data.address = !isEmpty(data.address) ? data.address : '';
  data.phone = !isEmpty(data.phone) ? data.phone : '';

  if (validator.isEmpty(data.place)) {
    errors.place = 'Name of your workplace is required.';
  }
  if (validator.isEmpty(data.address)) {
    errors.address = 'Address of your workplace is required.';
  }
  if (validator.isEmpty(data.phone)) {
    errors.phone = 'Workphone is required.';
  }
};

module.exports = { validateUser, validateWork };
