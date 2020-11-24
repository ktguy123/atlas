const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = require('./../config/config').secret;

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  hash: String,
  salt: String
}, {timestamps: true});

UserSchema.methods.validPassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.generateJWT = function() {

  return jwt.sign({
    id: this._id,
    username: this.username
  }, secret)
};

UserSchema.methods.toAuthJSON = function(){
  return {
    id: this._id,
    username: this.username,
    email: this.email,
    token: this.generateJWT()
  };
};

module.exports = mongoose.model('UserModel', UserSchema);