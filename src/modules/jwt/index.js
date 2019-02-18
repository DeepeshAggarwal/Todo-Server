const config = require('../../../config/index.js');
const jwt   = require('jsonwebtoken');

var privateKEY = config.jwt.private
var publicKEY  = config.jwt.public

//TODO ADD STANDARD JWT OPTIONS LIKE jti, iat etc.
module.exports = {
 sign: (payload, $Options) => {  
  // Token signing options
  var signOptions = {
      expiresIn:  "1d",    // 1 days validity
      algorithm:  "RS256"    
  };
  return jwt.sign(payload, privateKEY, signOptions);
  },
  verify: (token, $Option) => {
    var verifyOptions = {
        expiresIn:  "1d",
        algorithm:  ["RS256"]
    };
    return jwt.verify(token, publicKEY, verifyOptions);
  }
}