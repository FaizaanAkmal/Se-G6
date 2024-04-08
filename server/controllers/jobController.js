const JobPost = require("../models/jobpost");
const Company = require("../models/company");

//creating a new job post
const createJob = async (req, res) => {
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
      userId,
    } = req.body;

    // Find the company based on the userId
    const company = await Company.findOne({ userId });
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
      postedBy: company._id,
    });

    // Save the new job post to the database
    const savedJobPost = await newJobPost.save();

    // Save the new job in company's myJobs
    company.myJobs.push({ job: savedJobPost._id });
    await company.save();

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

const getJob = async (req, res) => {
  // TODO: return Job with job_id in req
};

const getAllJobs = async (req, res) => {
  // TODO: return all Jobs matching query in req
  try {
    const jobs = await JobPost.find({ status: "open" }).populate("postedBy"); // Populate the 'postedBy' field with the entire Company object
    // console.log("Jobs",jobs)

    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Error fetching jobs" });
  }
};

const editJob = async (req, res) => {
  // TODO: update Job info with job_id in req
};

const closeJob = async (req, res) => {
  // TODO: change the Job status with job_id in req to "closed" and set isPinned=False, pinnedAt=null in company's myJobs array
  try {
    const { userId, myJobId, jobId } = req.body;
    const company = await Company.findOne({ userId: userId });
    const job = await JobPost.findOne({ _id: jobId });
    // console.log(req.body);
    // Check if company and job are found
    if (!company || !job) {
      console.log(company, job);
      return res.status(404).json({ message: "Company or job not found" });
    }

    // Change the Job status to "closed"
    job.status = "closed";
    await job.save();

    // Remove the job from company's myJobs
    company.myJobs = company.myJobs.filter(
      (job) => job._id.toString() !== myJobId
    );
    await company.save();

    res.status(200).json({ message: "Job closed successfully" });
  } catch (error) {
    console.error("Error closing job:", error);
    res.status(500).json({ message: "Error closing job" });
  }
};

module.exports = { createJob, getJob, getAllJobs, editJob, closeJob };
