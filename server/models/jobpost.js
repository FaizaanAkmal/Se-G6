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
  tags: {
    type: [String],
    required: true
  }
});

const jobPost = mongoose.model('jobpost', JobPost);

module.exports = jobPost;
