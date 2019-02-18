'use strict';

var express = require('express'),
  logger = require('./src/lib/logger.js').get('app'),
  bodyParser = require('body-parser'),
  SwaggerUi = require('swagger-tools/middleware/swagger-ui'),
  open = require('opn'),
  SwaggerExpress = require('swagger-express-mw');
const mongooseModels = require('./src/models');
const whiteListURLs = ['/signIn', '/signUp', '/validate', '/docs']
var app = express();
module.exports = app;

var config = {
  appRoot: __dirname, // required config
  swaggerFile: `${__dirname}/src/swagger/swagger.yaml`, // swagger config file location
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) {
    throw err;
  }
  app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Key, Access-Control-Allow-Origin'
    );
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  }, function(req, res, next) {
    let path = req.path;
    if(isWhiteListURL(req, path)) {
      next();
    } else {
      res.status(401).send();
    }
    
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(SwaggerUi(swaggerExpress.runner.swagger));

  var routes = require('./src/routes/routes.js')(app);
  swaggerExpress.register(app);

  var port = process.env.PORT || 3001;
  app.listen(port, function() {
    logger.info('listening on', port);
  });
});

// TODO export this
function isWhiteListURL(req, path) {
  if(process.env.NODE_ENV !== 'production') {
    return true;
  }
  if(path in whiteListURLs) {
    let authorizationHeader = req.header('Authorization');
    if(authorizationHeader) {
      return true;
    }
  }
  return false;
}
