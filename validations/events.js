const validator = require('validator');
const isEmpty = require('./isEmpty');

function validateEvents(data) {
  let eventErrors = {};
  data.name = !isEmpty(data.name) ? data.name : '';
  data.desc = !isEmpty(data.desc) ? data.desc : '';

  if (!validator.isLength(data.name, { min: 2, max: 40 })) {
    eventErrors.name = 'Event Name Must Be Atleast 2 Characters';
  }
  if (validator.isEmpty(data.name)) {
    eventErrors.name = 'Event Name Required';
  }
  if (validator.isEmpty(data.desc)) {
    eventErrors.desc = 'Event Description Required';
  }

  return {
    eventErrors,
    isValid: eventErrors
  };
}

function validateAddress(data) {
  let addrErrors = {};
  data.name = !isEmpty(data.name) ? data.name : '';
  data.zipcode = !isEmpty(data.zipcode) ? data.zipcode : '';

  if (!validator.isLength(data.name, { min: 2, max: 40 })) {
    addrErrors.name = 'Address Must Be Atleast 5 Characters';
  }
  if (validator.isEmpty(data.name)) {
    addrErrors.name = 'Address Required';
  }
  if (!validator.isPostalCode(data.zipcode)) {
    addrErrors.zipcode = 'Invalid Zipcode';
  }
  if (validator.isEmpty(data.zipcode)) {
    addrErrors.zipcode = 'Zipcode Required';
  }

  return {
    addrErrors,
    isValidAddr: addrErrors
  };
}

function validateHost(data) {
  let hostErrors = {};
  data.name = !isEmpty(data.name) ? data.name : '';

  if (!validator.isLength(data.name, { min: 2, max: 40 })) {
    hostErrors.name = 'Host Name Must Be Atleast 3 Characters';
  }
  if (validator.isEmpty(data.name)) {
    hostErrors.name = 'Host Name Required';
  }

  return {
    hostErrors,
    isValidHost: hostErrors
  };
}

function validateTime(data) {
  let timeErrors = {};
  data.startsAt = !isEmpty(data.startsAt) ? data.startsAt : '';

  if (validator.isEmpty(data.startsAt)) {
    timeErrors.startsAt = 'Start Time Required';
  }

  return {
    timeErrors,
    isValidTime: timeErrors
  };
}

module.exports = {
  validateEvents,
  validateAddress,
  validateHost,
  validateTime
};
