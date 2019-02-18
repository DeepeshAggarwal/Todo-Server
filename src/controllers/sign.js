"use strict";

var util = require("./../lib/util.js"),
  signService = require("./../services/signService.js"),
  logger = require("./../lib/logger.js").get("signController");

function signIn(body, res) {
  logger.info("Entering signIn");
  if (util.isValidSignInRequest(body.email) === true) {
    signService
      .signIn(body.email, body.password)
      .then(response => {
        logger.info(response);
        res.send(response);
      })
      .catch(error => {
        logger.error(error);
        res.status(500).send({ message: error.message });
      });
  } else {
    res.status(400).send("Wrong Request. Please Validate the request");
  }
}

function signUp(body, res) {
  if (util.isValidSignUpRequest(body.email, body.name) === true) {
    signService
      .signUp(body)
      .then(response => {
        logger.info(response);
        res.send(response);
      })
      .catch(error => {
        logger.error(error);
        res.status(500).send({ message: error.message });
      });
  } else {
    res.status(400).send("Wrong Request. Please Validate the request");
  }
}

function validate(token, res) {
  if(token) {
    signService.validateToken(token)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(error => {
      res.status(500).send({ message: error.message });
    })
  }
}

module.exports = {
  signIn: signIn,
  signUp: signUp,
  validate: validate
};
