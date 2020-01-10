const mongoose = require('mongoose');

const Comment = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    unique: true,
    minlength: 7,
    maxlength: 25
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  create_time: {
    type: mongoose.Schema.Types.Date,
    //set: v => (Date.now),
    default: Date.now
  },
}, {_id: false})


const Comments = new mongoose.Schema({
  comments: {
    type: [Comment]
  }
}, {versionKey: false});


module.exports = mongoose.model('Comments', Comments);
