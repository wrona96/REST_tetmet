const mongoose = require('mongoose')
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');

const GeoSchema = new mongoose.Schema({
  city: {
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
    type: GeoSchema,
    default: {
      'city': 'Poznań',
      'lat': 52.40000,
      'long': 16.91667
    }
  },
  members: {
    type: [mongoose.Schema.Types.ObjectId],
    default: ['3ca7346942e6f13b34582098']
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
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

Events.plugin(uniqueValidator);
module.exports = mongoose.model('Events', Events)
