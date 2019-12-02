const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const immutableValidator = require('mongoose-immutable-plugin');
const crypto = require('crypto');

const Users = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
    unique: true,
    minlength: 7,
    maxlength: 25
  },
  hash_password: {
    type: String,
    select: false
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'Invalid email']
  },
  sex : {
    type: String,
    enum: [
        'male', 'female', 'undefined'
    ],
    default: 'undefined'
  },
  name:{
    type: String,
    minlength: 3,
    maxlength: 25,
    default: 'undefined'
  },
  surname:{
    type: String,
    minlength: 3,
    maxlength: 25,
    default: 'undefined'
  },
  type: {
    type: Number,
    default: 0
  },
  reg_time: {
    type: Date,
    default: Date.now,
    immutable: true
  },
  salt: {
    type: String,
    default: '',
    select: false,
    immutable: true
  }
}, {versionKey: false});

Users.virtual('password').set(function(password) {
  this._password = password;
  this.salt = this.salt == "" ? this.makeSalt() : this.salt;
  this.hash_password = this.encryptPassword(password);
}).get(function() {
  return this._password;
});

Users.methods = {
  makeSalt: function() {
    return crypto.createHmac('whirlpool', (Math.round(new Date().valueOf() * Math.random()) + this.nickname)).digest('hex');
  },
  encryptPassword: function(password) {
    if (!password)
      throw new Error('Password do not exist.');
    try {

      return crypto.createHmac('sha512', this.salt).update(password).digest('hex');
    } catch (err) {
      throw new Error(err);
    }
  },
  auth: function(plain) {
    if (!plain)
      throw new Error('Password do not exist.');
    try {
      return this.hash_password === this.encryptPassword(plain);
    } catch (err) {
      throw new Error('Wrong password.');
    }
  }
};

Users.pre('save', function(next) {
  if (RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}').test(this._password)) {
    next();
  } else {
    throw new Error('Password is too weak.');
  }
});

Users.plugin(uniqueValidator);
Users.plugin(immutableValidator);
module.exports = mongoose.model('Users', Users);
