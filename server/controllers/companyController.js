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

const getMyJobs = async (req, res) => {
  // TODO: Get the jobs from the company's myJobs array
  const { userId } = req.params;
  try {
    const company = await Company.findOne({ userId: userId }).populate({
      path: 'myJobs.job',
      populate: { path: 'postedBy' }
    });
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }
    const openPinnedJobs = company.myJobs.filter(myJob => myJob.job.status === 'open' && myJob.isPinned);
    const openJobs = company.myJobs.filter(myJob => myJob.job.status === 'open' && !myJob.isPinned);
    const closedJobs = company.myJobs.filter(myJob => myJob.job.status === 'closed' && !myJob.isPinned);

    openJobs.sort((a, b) => new Date(b.job.datePosted) - new Date(a.job.datePosted));
    openPinnedJobs.sort((a, b) => new Date(b.pinnedAt) - new Date(a.pinnedAt));
    closedJobs.sort((a, b) => new Date(b.job.datePosted) - new Date(a.job.datePosted));

    res.status(200).json({ openPinnedJobs, openJobs, closedJobs });
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
    const myJob = company.myJobs.find(job => job._id.toString() === myJobId);
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

module.exports = { companyRegister, companyEdit, getMyJobs, updateBookmark };
