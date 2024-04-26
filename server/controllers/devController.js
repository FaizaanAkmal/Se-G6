const User = require("../models/user");
const Dev = require("../models/dev");
const JobPost = require("../models/jobpost");

// TODO
const devRegister = async (req, res) => {
  const {
    userId,
    country,
    experience,
    bio,
    skills,
    languages,
    technologies,
    interestedJobType,
    environmentPreference,
    portfolioLink,
    githubLink,
  } = req.body;

  // Check if any of the required fields are missing
  if (
    !userId ||
    !country ||
    !experience ||
    !bio ||
    !skills ||
    !languages ||
    !technologies ||
    !interestedJobType ||
    !environmentPreference ||
    !portfolioLink ||
    !githubLink
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }

  try {
    // Validate that portfolioLink and githubLink are provided
    if (!portfolioLink || !githubLink) {
      return res.status(400).json({
        success: false,
        message: "Portfolio link and Github link are required.",
      });
    }

    const newUser = new Dev({
      userId,
      country,
      experience,
      bio,
      skills,
      languages,
      technologies,
      interestedJobType,
      environmentPreference,
      portfolio: portfolioLink,
      gitLink: githubLink,
    });

    await newUser.save();

    // set User's profileCompleted to true
    const user = await User.findById(userId);
    user.profileCompleted = true;
    await user.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      newUser,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(500)
      .json({ success: false, message: "Error registering user." });
  }
};

// TODO
const devEdit = async (req, res) => {
  const {
    country,
    experience,
    bio,
    skills,
    languages,
    technologies,
    interestedJobType,
    environmentPreference,
    portfolioLink,
    githubLink,
    userId,
  } = req.body;

  try {
    const updatedDev = await Dev.findOneAndUpdate(
      { userId: userId },
      {
        country,
        experience,
        bio,
        skills,
        languages,
        technologies,
        interestedJobType,
        environmentPreference,
        portfolioLink,
        gitLink: githubLink,
      },
      { new: true }
    );

    if (!updatedDev) {
      return res.status(404).json({ error: "Dev not found" });
    }

    res.status(200).json(updatedDev);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Handling The Developer Application
const devApplication = async (req, res) => {
  const { userId, jobId, coverLetter } = req.body;

  try {
    const dev = await Dev.findOne({ userId });
    if (!dev) {
      return res
        .status(404)
        .json({ success: false, message: "Developer not found." });
    }

    const jobIndex = dev.myJobs.findIndex(
      (job) => job.job.toString() === jobId
    );
    if (jobIndex === -1) {
      // Job not found in developer's list, add it
      dev.myJobs.push({
        job: jobId,
        isBookmarked: false,
        isOffer: false,
        isAcceptedOffer: false,
        isRejectedOffer: false,
        isApplied: true,
        coverLetter: coverLetter,
      });
    }

    await dev.save();

    // Update the JobPost model with the application
    const job = await JobPost.findById(jobId);
    if (!job) {
      return res
        .status(404)
        .json({ success: false, message: "Job not found." });
    }

    job.applicants.push(dev._id);

    await job.save();

    res
      .status(200)
      .json({ success: true, message: "Application submitted successfully." });
  } catch (error) {
    console.error("Error submitting application:", error);
    res
      .status(500)
      .json({ success: false, message: "Error submitting application." });
  }
};

const getDev = async (req, res) => {
  const { userId } = req.query;
  try {
    //const company = await Company.findById(companyId);
    const dev = await Dev.findOne({ userId: userId });
    if (!dev) {
      return res.status(404).json({ message: "Dev not found" });
    }
    res.status(200).json(dev);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteDev = async (req, res) => {
  const { userId } = req.query;
  try {
    // Use findByIdAndDelete to find and delete the user by id
    const deletedDev = await Dev.findOneAndDelete({ userId: userId });

    if (!deletedDev) {
      // If no user found with the given id, return appropriate message or handle accordingly
      return res.status(404).json({ error: "User not found" });
    }

    // Return success message or any relevant data
    return res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    // Handle errors
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { devRegister, devEdit, devApplication, getDev, deleteDev };
