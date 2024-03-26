const mongoose = require('mongoose');
const { Schema } = mongoose;

//Company Model
const companySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: false
  },
  website: {
    type: String,
    unique: true,
    required: false
  },
  type: {
    type: String,
    required:false,
    //enum: ["Agency", "Corporate", "Start-up"]
  },
  country: {
    type: String,
    required: false,
  },
  industry: {
    type: String,
    required: false,
    //enum: [ "Agriculture", "Construction", "Energy", "Finance", "Healthcare", "IT", "Manufacturing", "Retail", "Transportation", "Tourism"] // Define possible user types
  },
  size: {
    type: String,
    required: false,
    //enum: ["0 to 100", "101 to 500", "above 500"]
  },
  overview: {
    type: String,
    required: false,
  },
  workCulture: {
    type: String,
    required: false,
  },
  benefits: {
    type: String
  }
});

const companyModel = mongoose.model('Company', companySchema);

module.exports = companyModel;

// reference user_id from User
// profileComplete: boolean
// jobPosts: [job_ids]