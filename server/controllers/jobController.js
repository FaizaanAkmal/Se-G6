const JobPost = require("../models/jobpost");

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
    const jobs = await Job.find({ status: "open" }).populate('postedBy'); // Populate the 'postedBy' field with the entire Company object
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

const deleteJob = async (req, res) => {
  // TODO: remove Job with job_id in req
};

module.exports = { createJob, getJob, getAllJobs, editJob, deleteJob };
