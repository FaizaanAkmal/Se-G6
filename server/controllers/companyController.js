const User = require("../models/user");
const Company = require("../models/company");
const JobPost = require("../models/jobpost");

const companyRegister = async (req, res) => {
  try {
    // Destructure the required fields from the request body
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
      userId,
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

    // set User's profileCompleted to true
    const user = await User.findById(userId);
    user.profileCompleted = true;
    await user.save();

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
    userId,
  } = req.body;
  try {
    const updatedCompany = await Company.findOneAndUpdate(
      { userId: userId }, // Filter: Find the company by its ID
      {
        name: companyName,
        website,
        type: companyType,
        country,
        industry,
        size: companySize,
        overview: companyOverview,
        workCulture: companyWorkCulture,
        benefits: companyBenefits,
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

const getMyJobs = async (req, res) => {
  // TODO: Get the jobs from the company's myJobs array
  const { userId } = req.params;
  try {
    const company = await Company.findOne({ userId: userId }).populate({
      path: "myJobs.job",
      populate: { path: "postedBy" },
    });
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.status(200).json({ myJobs: company.myJobs });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateBookmark = async (req, res) => {
  // TODO: Update the bookmark in the company's myJobs array
  const { userId, myJobId, isPinned, pinnedAt } = req.body;
  try {
    const company = await Company.findOne({ userId: userId });
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }
    const myJob = company.myJobs.find((myJob) => myJob._id.toString() === myJobId);
    if (!myJob) {
      return res.status(404).json({ error: "Job not found" });
    }
    myJob.isPinned = isPinned;
    myJob.pinnedAt = pinnedAt;
    await company.save();

    res.status(200).json();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCompany = async (req, res) => {
  const { userId } = req.query;
  try {
    //const company = await Company.findById(companyId);
    const company = await Company.findOne({ userId: userId });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCompany = async (req, res) => {
  const { userId } = req.query;

  try {
    // Use findByIdAndDelete to find and delete the user by id
    const deletedCompany = await Company.findOneAndDelete({ userId: userId });

    if (!deletedCompany) {
      // If no user found with the given id, return appropriate message or handle accordingly
      return res.json({ success: "false", error: "User not found" });
    }

    // Return success message or any relevant data
    return res.json({ success: "true", message: "User deleted successfully." });
  } catch (error) {
    // Handle errors
    return res.json({ success: "false", error: error.message });
  }
};

module.exports = {
  companyRegister,
  companyEdit,
  getMyJobs,
  updateBookmark,
  getCompany,
  deleteCompany,
};
