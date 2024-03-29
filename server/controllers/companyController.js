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
    } = req.body;

    // Create a new company instance
    const newCompany = new Company({
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

const createJobPost = async (req, res) => {
  try {
    // Destructure the required fields from the request body
    console.log("Response From creating JobPost: ", req.body);
    const {
      title,
      description,
      requirement,
      preferredSkills,
      preferredLanguages,
      preferredTechnologies,
      experience,
      jobType,
      environment,
      compensation,
    } = req.body;

    // Create a new job post instance
    const newJobPost = new JobPost({
      title,
      description,
      requirement,
      preferredSkills,
      preferredLanguages,
      preferredTechnologies,
      experience,
      jobType,
      environment,
      compensation,
    });

    // Save the new job post to the database
    const savedJobPost = await newJobPost.save();

    // Send a success response with the ObjectId of the created job post
    res.status(201).json({
      message: "Job post created successfully",
      jobPostId: savedJobPost._id,
    });
  } catch (error) {
    console.error("Error creating job post:", error);
    // Send an error response if an error occurs during job post creation
    res.status(500).json({ message: "Error creating job post" });
  }
};

module.exports = { companyRegister, companyEdit, createJobPost };
