var config = {};

// config domain
config.domain = process.env.DOMAIN

//mongo database
config.mongo = {};
config.mongo.host = process.env.MONGO_HOST;
config.mongo.db = process.env.MONGO_DB;
config.mongo.port = process.env.MONGO_PORT;
config.mongo.username = process.env.MONGO_USERNAME;
config.mongo.password = process.env.MONGO_PASSWORD;

//jwt keys
config.jwt = {};
config.jwt.public = process.env.JWT_PUBLIC_KEY
config.jwt.private = process.env.JWT_PRIVATE_KEY

module.exports = config;
