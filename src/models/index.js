'use strict';

var fs = require('fs');
var path = require('path');
var logger = require('../lib/logger.js').get('dbConnection');
var mongoose = require('mongoose');
var env = process.env.NODE_ENV || 'development';
var config = require(path.join(__dirname, '../../', 'config', 'index.js'));
if(env === 'development') {
	console.log(config);	
}

var db;
var url = 'mongodb://' + config.mongo.host + ':' + config.mongo.port + '/' + config.mongo.db;
db = mongoose.connect(
  url,
  { user: config.mongo.username, pass: config.mongo.password }
);

fs.readdirSync(__dirname)
  .filter(function(file) {
    return file.indexOf('.') !== 0 && file !== 'index.js';
  })
  .forEach(function(file) {
    var model = require(path.join(__dirname, file));
  });

module.exports = db;
