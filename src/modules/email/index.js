const config = require('../../../config/index.js');
const sgMail = require('@sendgrid/mail');
const logger = require('./../../lib/logger.js').get('module email');

sgMail.setApiKey(config.mail.apiKey);
const msg = {
  from: config.mail.fromEmail,
  subject: 'TODO EMAIL Verification',
};
module.exports = {
 sendVerification: (email, token) => {  
 	msg.to = email;
 	msg.html = 'Hi There. Please Clink on the link to verify: <a href="' + config.frontendDomain + '/validate?token=' + token + '">' + 'link' + '</a>';
 	logger.debug(msg);
	return sgMail.send(msg); 	
 }
}
