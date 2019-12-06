const mongoose = require('mongoose')
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');

const GeoSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true
  },
  lat: {
    type: Number,
    min: -90,
    max: 90,
    required: true,
  },
  long: {
    type: Number,
    min: -180,
    max: 180,
    required: true
  }
}, {_id: false})

const Events = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false,
    minlength: 7,
    maxlength: 25
  },
  describe: {
    type: String,
    required: true,
    minlength: 30,
    maxlength: 150
  },
  location: {
    type: GeoSchema
  },
  members: {
    type: [mongoose.Schema.Types.ObjectId]
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  slots: {
    type: Number,
    set: v => parseInt(v),
    min: 3,
    max: 99
  },
  tags: {
    type: [String],
    enum: [
      'Brak', 'Piwo', 'Karty', 'Planszówki'
    ],
    default: ["Brak"]
  },
  start_time: {
    type: Date,
    required: true,
    validate: function() {
      return validator.isAfter(this.start_time.toString())
    }
  }
}, {versionKey: false})

Events.methods = {
  isOwner: function(uID) {
    return this.owner == uID;
  }
}
Events.plugin(uniqueValidator);
module.exports = mongoose.model('Events', Events)
