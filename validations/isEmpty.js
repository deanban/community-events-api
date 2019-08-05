const isEmpty = value =>
  value === undefined ||
  value === null ||
  !isNaN(value) ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0) ||
  (value instanceof Date &&
    Object.prototype.toString.call(value) === '[object Date]');

module.exports = isEmpty;
