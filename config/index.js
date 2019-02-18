const env = process.env.NODE_ENV || 'development';
const cfg = require('./' + env.toLowerCase() + '.js');

cfg.mail = {
	apiKey: process.env.SENDGRID_API_KEY,
	fromEmail: process.env.FROM_EMAIL
};

module.exports = cfg;
