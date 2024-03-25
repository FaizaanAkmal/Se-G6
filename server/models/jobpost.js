const mongoose = require('mongoose');
const { Schema } = mongoose;

const JobPost = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requirement: {
    type: String,
    required: true
  },
  preferredSkills: {
    type: [String],
    required: true
  },
  preferredLanguages: {
    type: [String],
    required: true
  },
  preferredTechnologies: {
    type: [String],
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  jobType: {
    type: String,
    required: true
  },
  environment: {
    type: String,
    required: true
  },
  compensation: {
    type: String,
    required: true
  }
});

const jobPost = mongoose.model('jobpost', JobPost);

module.exports = jobPost;
