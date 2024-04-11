const JobPost = require("../models/jobpost");
const Company = require("../models/company");
const Developer = require("../models/dev");

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

    console.log("UserId: ",userId)

    // Find the company based on the userId
    const company = await Company.findOne({ userId });
    console.log("Company: ",company)
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

//Getting Related Jobs Data
const getRelatedJobs = async (req, res) => {
  const { userId, jobId } = req.query;
  
  try {
    // Find the dev based on userId
    const dev = await Developer.findOne({ userId });
    if (!dev) {
      return res.status(404).json({ message: "Developer not found." });
    }

    // Fetch all jobs
    const allJobs = await JobPost.find({ _id: { $ne: jobId }, status: "open" }).populate('postedBy');

    // Extract applicant IDs from applicants array for each job
    const jobApplicantIds = allJobs.map(job => job.applicants.map(applicant => applicant.applicant.toString()));

    // Get the developer's ID as a string
    const devIdString = dev._id.toString();

    // Calculate matching score for each job
    const jobsWithScore = allJobs.map((job, index) => {
      let score = 0;

      // Check if the developer has already applied to this job
      if (jobApplicantIds[index].includes(devIdString)) {
        // Skip this job if the developer has already applied
        return null;
      }

      // Match based on experience
      if (dev.experience >= job.experience) {
        score += 1;
      }

      // Match based on skills
      dev.skills.forEach(skill => {
        if (job.preferredSkills.includes(skill)) {
          score += 1;
        }
      });

      // Match based on languages
      dev.languages.forEach(language => {
        if (job.preferredLanguages.includes(language)) {
          score += 1;
        }
      });

      // Match based on technologies
      dev.technologies.forEach(tech => {
        if (job.preferredTechnologies.includes(tech)) {
          score += 1;
        }
      });

      // Match based on job type
      if (dev.interestedJobType === job.jobType) {
        score += 1;
      }

      // Match based on environment preference
      if (dev.environmentPreference === job.environment) {
        score += 1;
      }

      return {
        ...job.toObject(),
        score
      };
    });

    // Filter out null values (jobs that were skipped)
    const filteredJobsWithScore = jobsWithScore.filter(job => job !== null);

    // Sort the filtered jobs by score in descending order
    const sortedJobs = filteredJobsWithScore.sort((a, b) => b.score - a.score);

    let topJobs = sortedJobs;

    // If no matching jobs were found, send the first three jobs that the developer has not applied to
    if (sortedJobs.length === 0) {
        topJobs = allJobs.filter(job => !jobApplicantIds.flat().includes(devIdString));
    }

    // Send the top three jobs or all sorted jobs if there are fewer than three
    const numJobsToSend = Math.min(topJobs.length, 3);
    const jobsToSend = topJobs.slice(0, numJobsToSend).map(job => {
      // Check if the job is in the developer's myJobs array
      const devJob = dev.myJobs.find(myJob => myJob.job.toString() === job._id.toString());
      const isBookmarked = devJob ? devJob.isBookmarked : false;
    
      return { ...job, isBookmarked };
    });

    res.status(200).json({
      jobsToSend
    });
  } 
  catch (error) 
  {
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

const closeJob = async (req, res) => {
  // TODO: change the Job status with job_id in req to "closed" and set isPinned=False, pinnedAt=null in company's myJobs array
  try {
    const { userId, myJobId, jobId } = req.body;
    const company = await Company.findOne({ userId: userId });
    const job = await JobPost.findOne({ _id: jobId });

    // Check if company and job are found
    if (!company || !job) {
      return res.status(404).json({ message: "Company or job not found" });
    }

    // Change the Job status to "closed"
    job.status = "closed";
    await job.save();

    // Update the job in company's myJobs
    company.myJobs = company.myJobs.map((job) => {
      if (job._id.toString() === myJobId) {
        job.isPinned = false;
        job.pinnedAt = null;
      }
      return job;
    });

    await company.save();

    res.status(200).json({ message: "Job closed successfully" });
  } catch (error) {
    console.error("Error closing job:", error);
    res.status(500).json({ message: "Error closing job" });
  }
};

const deleteJob = async (req, res) => {
  const userId = req.params.id
  try {
    // Use deleteMany to remove documents where the field matches the identifier
    const result = await JobPost.deleteMany({ postedBy: userId });

    res.status(200).json({ message: `${result.deletedCount} documents deleted` });
  } catch (error) {
    console.error("Error deleting users:", error);
    res.status(400).json({ error: error.message });
  }
};

const deleteApplicants = async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await JobPost.updateMany(
      {},
      {
        $pull: {
          applicants: {applicant : userId }, 
          shortlisted: userId 
        }
      }
    );
    res.status(200).json({ message: "Documents updated" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { createJob, getAllJobs, editJob, closeJob, deleteJob,updateBookmarks, individualBookmarks, getRelatedJobs, deleteApplicants};
