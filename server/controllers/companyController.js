const Company = require("../models/company");
const JobPost = require("../models/jobpost");

const companyRegister = async (req, res) => {
  try {
    // Destructure the required fields from the request body
    console.log("Response From Company: ", req.body);
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
      userId
    } = req.body;

    // Create a new company instance
    const newCompany = new Company({
      userId,
      name: companyName,
      website,
      type: companyType,
      country,
      industry,
      size: companySize,
      overview: companyOverview,
      workCulture: companyWorkCulture,
      benefits: companyBenefits,
    });

    // Save the new company to the database
    const savedCompany = await newCompany.save();

    // Send a success response with the ObjectId of the created company
    res.status(201).json({
      message: "Company created successfully",
      companyId: savedCompany._id,
    });
  } catch (error) {
    console.error("Error creating company:", error);
    // Send an error response if an error occurs during company creation
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
      { userId: id }, // Filter: Find the company by its ID
      {
        name: companyName,
        website,
        type: companyType,
        country,
        industry,
        size: companySize,
        overview: companyOverview,
        workCulture: companyWorkCulture,
        benefits: companyBenefits
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

const getCompany = async (req, res) => {
  const companyId = req.params.id;
  try {
    //const company = await Company.findById(companyId);
    const company = await Company.findOne({ userId: companyId });
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const deleteCompany = async (req, res) => {
    const userId = req.params.id
    
    try{
      // Use findByIdAndDelete to find and delete the user by id
      const deletedCompany = await Company.findOneAndDelete({userId: userId});
      
      if (!deletedCompany) {
        // If no user found with the given id, return appropriate message or handle accordingly
        return res.json({ success: "false", error: "User not found" });
      }
      
      // Return success message or any relevant data
      return res.json({ success: "true", message: 'User deleted successfully.' });
    } catch (error) {
      // Handle errors
      return res.json({ success: "false", error: error.message });
    }

  };

module.exports = { companyRegister, companyEdit, getCompany, deleteCompany };
