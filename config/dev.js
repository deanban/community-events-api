const mlab = require('./mlab');

module.exports = {
  mongoURI: `mongodb://${mlab.name}:${
    mlab.pass
  }@ds259347.mlab.com:59347/comm-events`,
  secretKey: `${mlab.secret}`
};
