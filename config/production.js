var config = {};

//mongo database
config.mongo = {};
config.mongo.host = process.env.MONGO_HOST;
config.mongo.db = process.env.MONGO_DB;
config.mongo.port = process.env.MONGO_PORT;
config.mongo.username = process.env.MONGO_USERNAME;
config.mongo.password = process.env.MONGO_PASSWORD;

module.exports = config;
