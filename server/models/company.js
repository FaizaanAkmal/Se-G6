const mongoose = require('mongoose');
const { Schema } = mongoose;

//Company Model
const companySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  website: {
    type: String,
    unique: true,
    required: true
  },
  type: {
    type: String,
    required: true,
    //enum: ["Agency", "Corporate", "Start-up"]
  },
  country: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
    //enum: [ "Agriculture", "Construction", "Energy", "Finance", "Healthcare", "IT", "Manufacturing", "Retail", "Transportation", "Tourism"] // Define possible user types
  },
  size: {
    type: String,
    required: true,
    //enum: ["0 to 100", "101 to 500", "above 500"]
  },
  overview: {
    type: String,
    required: true,
  },
  workCulture: {
    type: String,
    required: true,
  },
  benefits: {
    type: String
  }
});

const companyModel = mongoose.model('Company', companySchema);

module.exports = companyModel;
