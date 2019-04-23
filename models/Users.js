const mongoose = require('mongoose')
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');

const Users = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
    unique: true,
    minlength: 7,
    maxlength: 25
  },
  password: {
    type: String,
    select: false,
    required: true,
    validate: [validator.isMD5, 'Invalid password form']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'Invalid email']
  },
  type: {
    type: Number,
    default: 0
  },
  reg_time: {
    type: Date,
    default: Date.now,
    validate: function() {
      return validate.isAfter(this.reg_time.toString())
    }
  }
},{versionKey: false})

Users.plugin(uniqueValidator);
module.exports = mongoose.model('Users', Users)
