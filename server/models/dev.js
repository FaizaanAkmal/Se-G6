const mongoose = require("mongoose");
const { Schema } = mongoose;
const devProfile = require("../models/dev");

//Dev Model
const devSchema = new Schema({
  country: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  languages: {
    type: [String],
    required: true,
  },
  technologies: {
    type: [String],
    required: true,
  },
  interestedJobType: {
    type: String,
    required: true,
  },
  environmentPreference: {
    type: String,
    required: true,
  },
  portfolio: {
    type: String,
    required: true,
  },
  gitLink: {
    type: String,
    required: true,
  },
});

const devModel = mongoose.model("Dev", devSchema);

module.exports = devModel;

// reference user_id from User
// profileComplete: boolean
// appliedTo or jobHistory: [job_ids]
// bookmarked: [job_ids]
