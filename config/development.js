const fs = require('fs');
const path = require('path');
var config = {}; //(module.exports = {});

// domain
config.domain = 'http://localhost:3001';
config.frontendDomain = 'http://localhost:3000'

//mongo database
config.mongo = {};
config.mongo.host = 'localhost';
config.mongo.db = 'todo';
config.mongo.port = '27017';
config.mongo.username = 'todo';
config.mongo.password = 'todo';

config.jwt = {};
// var config = require(path.join(__dirname, '../../', 'config', 'index.js'));
config.jwt.public = fs.readFileSync(path.join(__dirname, 'jwtLocal', 'public.key'), 'utf8');
config.jwt.private = fs.readFileSync(path.join(__dirname, 'jwtLocal', 'private.key'), 'utf8');

console.log("is it gonna read everytime");

module.exports = config;
