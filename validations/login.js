const validator = require('validator');
const isEmpty = require('./isEmpty');
// import isEmpty from "./is-empty";

module.exports = function validateLogin(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!validator.isEmail(data.email)) {
    errors.email = 'Invalid Email.';
  }
  if (validator.isEmpty(data.email)) {
    errors.email = 'Email is Required!';
  }
  if (validator.isEmpty(data.password)) {
    errors.password = 'Password is Required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
