const mongoose = require('mongoose');
const { Schema } = mongoose;

//Dev Model
const devSchema = new Schema({
  country: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  bio: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  prefs: {
    type: [String],
    required: true,
  },
  portfolio: {
    type: String,
  },
  gitLink: {
    type: String,
  }
});

const devModel = mongoose.model('Dev', devSchema);

module.exports = devModel;
