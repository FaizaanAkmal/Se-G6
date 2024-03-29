const mongoose = require('mongoose');
const { Schema } = mongoose;

// Company Model
const companySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true // Assuming companyName is required
  },
  website: {
    type: String,
    unique: true,
    required: true // Assuming website is required
  },
  type: {
    type: String,
    required: true // Assuming companyType is required
  },
  country: {
    type: String,
    required: true // Assuming country is required
  },
  industry: {
    type: String,
    required: true // Assuming industry is required
  },
  size: {
    type: String,
    required: true // Assuming companySize is required
  },
  overview: {
    type: String,
    required: true // Assuming companyOverview is required
  },
  workCulture: {
    type: String,
    required: true // Assuming companyWorkCulture is required
  },
  benefits: {
    type: String,
    required: true // Assuming companyBenefits is required
  }
});

const companyModel = mongoose.model('Company', companySchema);

module.exports = companyModel;
