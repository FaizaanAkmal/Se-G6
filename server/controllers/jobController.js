const JobPost = require("../models/jobpost");
const Company = require("../models/company");
const Developer = require("../models/dev")

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
    const jobs = await JobPost.find({ status: "open" }).populate('postedBy'); // Populate the 'postedBy' field with the entire Company object
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

// Adding BookMark Jobs
const addBookmark = async (req, res) => {
  try {
    const { userId, job } = req.body;
    // Find the developer based on the userId
    const developer = await Developer.findOne({ userId });
    // Add the job to the developer's bookmarkedJobs array
    developer.bookmarkedJobs.push(job);
    await developer.save();

    res.status(200).json({ message: "Job bookmarked successfully" });
  } catch (error) {
    console.error("Error adding bookmark:", error);
    res.status(500).json({ message: "Error adding bookmark" });
  }
};


// Removing BookMark Jobs
const removeBookmark = async (req, res) => {
  try {
    const { userId, job } = req.body;
    const { _id: jobId } = job; 


    // Find the developer based on the userId
    const developer = await Developer.findOne({ userId });

    // Remove the job from the developer's bookmarkedJobs array
    developer.bookmarkedJobs = developer.bookmarkedJobs.filter(
      (job) => job.toString() !== jobId
    );
    await developer.save();

    res.status(200).json({ message: "Bookmark removed successfully" });
  } catch (error) {
    console.error("Error removing bookmark:", error);
    res.status(500).json({ message: "Error removing bookmark" });
  }
};


//Getting BookMarked jobs
const getBookmarkedJobs = async (req, res) => {
  try {
      const { userId } = req.params;
      const developer = await Developer.findOne({ userId });
      const bookmarkedJobs = developer.bookmarkedJobs;
      res.status(200).json(bookmarkedJobs);
  } catch (error) {
      console.error("Error fetching bookmarked jobs:", error);
      res.status(500).json({ message: "Error fetching bookmarked jobs" });
  }
};


//Getting Specific Developer Jobs
const getDevJobs = async (req, res) => {
  try {
    const { userId } = req.params;
    const developer = await Developer.findOne({ userId });
    const bookmarkedJobs = developer.bookmarkedJobs;
    const jobs = await JobPost.find({ _id: { $in: bookmarkedJobs } }).populate('postedBy');
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching bookmarked jobs:", error);
    res.status(500).json({ message: "Error fetching bookmarked jobs" });
  }
};

module.exports = { createJob, getJob, getAllJobs, editJob, deleteJob,addBookmark,removeBookmark,getBookmarkedJobs,getDevJobs };
