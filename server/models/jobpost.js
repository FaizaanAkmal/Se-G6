const mongoose = require('mongoose');
const { Schema } = mongoose;

const JobPostSchema = new Schema({
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
        default: []
    },
    preferredLanguages: {
        type: [String],
        default: []
    },
    preferredTechnologies: {
        type: [String],
        default: []
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

const JobPost = mongoose.model('JobPost', JobPostSchema);

module.exports = JobPost;
