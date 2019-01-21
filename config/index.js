var env = process.env.NODE_ENV || 'development',
  cfg = require('./' + env.toLowerCase() + '.js');

module.exports = cfg;
