'use strict';

var log4js = require('log4js');
var path = require("path");
const LOGGER_LEVEL = process.env.LOGGER_LEVEL ? process.env.LOGGER_LEVEL : 'debug';
log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file(path.join(__dirname, 'somefile.log')));

function get(name) {
    var logger = log4js.getLogger(name);
    logger.setLevel(LOGGER_LEVEL);
    return logger;
}

module.exports = {
    get: get
};
