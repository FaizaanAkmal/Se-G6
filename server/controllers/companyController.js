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

//Get Applicants of an Individual Job
const getApplicants = async (req, res) => {
  try {
    const { jobId } = req.query; // Custom job ID
    // console.log("Here: ", jobId);
    const jobPost = await JobPost.findById(jobId).populate({
      path: "applicants.applicant",
      model: "Dev",
    });

    const applicants = jobPost.applicants.map((applicant) => ({
      dev: applicant.applicant,
      coverLetter: applicant.coverLetter,
    }));

    // console.log("Applicants: ", applicants);

    const developers = [];

    for (const applicant of applicants) {
      developers.push(applicant.dev);
      const userPromises = users.map((userId) => User.findById(userId));
    }
    const users = developers.map((dev) => dev.userId);
    const userDocs = await Promise.all(userPromises);
    const userNames = userDocs.map(
      (userDoc) => `${userDoc.firstName} ${userDoc.lastName}`
    );

    if (!jobPost) {
      return res.status(404).json({ message: "Job post not found" });
    }

    // Modify the response structure
    const responseData = {
      jobPost: {
        title: jobPost.title,
        datePosted: jobPost.datePosted,
        status: jobPost.status,
        numApplicants: jobPost.applicants.length,
        description: jobPost.description,
        requirements: jobPost.requirement,
        applicants: applicants.map((applicant, index) => ({
          name: userNames[index],
          experience: developers[index].experience,
        })),
      },
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error fetching job post:", error);
    res.status(500).json({ message: "Error fetching job post" });
  }
};

module.exports = {
  companyRegister,
  companyEdit,
  getMyJobs,
  updateBookmark,
  getCompany,
  deleteCompany,
  getApplicants,
};
