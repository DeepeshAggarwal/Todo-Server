'use strict';

const dao = require('./../dao/dao.js'),
	  jwt = require('./../modules/jwt/index.js'),
	  email = require('./../modules/email/index.js'),
      logger = require('./../lib/logger.js').get('signService');

function signIn(email, password) {
	return new Promise((resolve, reject) => {
		dao.signIn(email, password)
	    .then(user => {
	    	if(user.validated) {
	    		let token = jwt.sign(user);
	    		user.token = token;
	    	}
    		resolve(user);
	    })
	    .catch(error => {
	    	reject(error)
	    });	
	});
}

function signUp(body) {
	// one sign up is complete send the email with creating a new token
	return new Promise((resolve, reject) => {
	    dao.signUp(body)
	    .then(result => {
	    	logger.debug(result);
	    	let token = jwt.sign(result);
	    	email.sendVerification(result.email, token);
	    	resolve(result);
	    }).catch(error => {
	    	reject(error);
	    });
    });
}

function validateToken(token) {
	return new Promise((resolve, reject) => {
		try {
			let payload = jwt.verify(token);
			dao.validateUser(payload.id)
			.then(res => {
				resolve(res);
			})
			.catch(err => {
				reject(err);
			})	
		} catch(err) {
			reject(err);
		}
	})
}

function userExists(userId) {
    return dao.userExists(userId);
}

function userExistsMoreInfo(userInfo, next) {
    dao.userExistsMoreInfo(userInfo, next);
}


module.exports = {
    signIn: signIn,
    signUp: signUp,
    userExists : userExists,
    userExistsMoreInfo: userExistsMoreInfo,
    validateToken: validateToken
}
