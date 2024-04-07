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

// Getting All Jobs Data
const getAllJobs = async (req, res) => {
  const { userId } = req.query;

  try {
      // Find the dev based on userId
      const dev = await Developer.findOne({ userId });
      if (!dev) {
          return res.status(404).json({ message: "Developer not found." });
      }

      // Get the job ids for bookmarked, applied, and offered jobs
      const bookmarkedJobIds = dev.myJobs.filter(job => job.isBookmarked).map(job => job.job);
      const appliedJobIds = dev.myJobs.filter(job => job.isApplied).map(job => job.job);
      const offeredJobIds = dev.myJobs.filter(job => job.isOffer).map(job => job.job);

      // Fetch all jobs that are bookmarked, applied, or offered
      const bookmarkedJobs = await JobPost.find({
          status: "open",
          _id: { $in: bookmarkedJobIds }
      }).populate('postedBy');

      const appliedJobs = await JobPost.find({
          status: "open",
          _id: { $in: appliedJobIds }
      }).populate('postedBy');

      const offeredJobs = await JobPost.find({
          status: "open",
          _id: { $in: offeredJobIds }
      }).populate('postedBy');

      // Fetch all jobs
      const allJobs = await JobPost.find({ status: "open" }).populate('postedBy');

      res.status(200).json({
          allJobs,
          bookmarkedJobs,
          appliedJobs,
          offeredJobs
      });
  } catch (error) {
      console.error("Error fetching jobs:", error);
      res.status(500).json({ message: "Error fetching jobs" });
  }
};

// Updating Bookmarks Dashboard
const updateBookmarks = async (req, res) => {
  const { userId, jobId, isBookmarked } = req.body;
  let updatedIsBookmarked;
  if (isBookmarked == true) {
    updatedIsBookmarked = false;
  } else {
    updatedIsBookmarked = true;
  }
  
  try {
    // Find the developer based on userId
    const developer = await Developer.findOne({ userId });
    if (!developer) {
      return res.status(404).json({ message: "Developer not found." });
    }

    // Find the index of the job in myJobs
    const jobIndex = developer.myJobs.findIndex((job) => job.job.toString() === jobId);

    if (jobIndex !== -1) {
      // If the job is already in myJobs, update its bookmark status
      developer.myJobs[jobIndex].isBookmarked = updatedIsBookmarked;
    } else {
      // If the job is not in myJobs, add it and mark it as bookmarked
      developer.myJobs.push({
        job: jobId,
        isBookmarked: true,
      });
    }

    // Save the updated developer document
    await developer.save();

    res.status(200).json({ message: "Bookmark updated successfully" });
  } catch (error) {
    console.error("Error updating bookmark:", error);
    res.status(500).json({ message: "Error updating bookmark" });
  }
};

//Individual Bookmark
const individualBookmarks = async (req, res) => {
  const { userId, jobId, isBookmarked } = req.body;
  try {
    // Find the developer based on userId
    const developer = await Developer.findOne({ userId });
    if (!developer) {
      return res.status(404).json({ message: "Developer not found." });
    }

    // Find the index of the job in myJobs
    const jobIndex = developer.myJobs.findIndex((job) => job.job.toString() === jobId);

    if (jobIndex !== -1) {
      // If the job is already in myJobs, update its bookmark status
      developer.myJobs[jobIndex].isBookmarked = isBookmarked;
    } else {
      // If the job is not in myJobs, add it and mark it as bookmarked
      developer.myJobs.push({
        job: jobId,
        isBookmarked: true,
      });
    }

    // Save the updated developer document
    await developer.save();

    res.status(200).json({ message: "Bookmark updated successfully" });
  } catch (error) {
    console.error("Error updating bookmark:", error);
    res.status(500).json({ message: "Error updating bookmark" });
  }
};


const editJob = async (req, res) => {
  // TODO: update Job info with job_id in req
};

const deleteJob = async (req, res) => {
  // TODO: remove Job with job_id in req
};


module.exports = { createJob, getAllJobs, editJob, deleteJob,updateBookmarks,individualBookmarks};
