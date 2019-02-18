var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = new Schema({
    _id         : Number
  , name        : String
  , email       : {type: String, unique: true }
  , validated   : {type: Boolean, default: false }
  , password    : String
  , teamId      : [{ type: Number, ref: 'Team' }]
});

User.methods.getPublicFields = function () {
    var returnObject = {
        id: this._id,
        name: this.name,
        email: this.email,
        validated: this.validated
    };
    return returnObject;
};
mongoose.model("User", User);

module.exports = User;
