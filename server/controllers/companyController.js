const Company = require("../models/company");

const companyRegister = async (req, res) => {
  // console.log("Data Received:",req.body)
  const {
    companyName,
    website,
    companyType,
    country,
    industry,
    companySize,
    companyOverview,
    companyWorkCulture,
    companyBenefits,
  } = req.body;

  // Create a new company
  const newCompany = new Company({
    name: companyName,
    website: website,
    type: companyType,
    country: country,
    industry: industry,
    size: companySize,
    overview: companyOverview,
    workCulture: companyWorkCulture,
    benefits: companyBenefits,
  });

  try {
    // Save the new company to the database
    const savedCompany = await newCompany.save();

    // Send a success message along with the ObjectId of the created company
    res.json({ message: "Success", companyId: savedCompany._id });
  } catch (error) {
    console.error("Error creating company:", error);
    res.status(500).json({ message: "Error creating company" });
  }
};

// update company info (TODO)
const companyEdit = async (req, res) => {
  const {
    companyName,
    website,
    companyType,
    country,
    industry,
    companySize,
    companyOverview,
    companyWorkCulture,
    companyBenefits,
  } = req.body;

  const { id } = req.params;
  try {
    const updatedCompany = await Company.findOneAndUpdate(
      { _id: id }, // Filter: Find the company by its ID
      {
        companyName,
        website,
        companyType,
        country,
        industry,
        companySize,
        companyOverview,
        companyWorkCulture,
        companyBenefits,
      }, // Update
      { new: true } // Options: Return the updated document
    );

    // If the company doesn't exist, return 404
    if (!updatedCompany) {
      return res.status(404).json({ error: "Company not found" });
    }

    res.status(200).json(updatedCompany);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { companyRegister, companyEdit };
