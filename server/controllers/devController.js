const Dev = require("../models/dev");
const JobPost = require("../models/jobpost")

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

  try {
    // Convert experience to a number
    const experienceValue = parseInt(experience);

    // Validate that portfolioLink and githubLink are provided
    if (!portfolioLink || !githubLink) {
      return res.status(400).json({ success: false, message: "Portfolio link and Github link are required." });
    }

    const newUser = new Dev({
      userId,
      country,
      experience: experienceValue,
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
  
    res.status(201).json({ success: true, message: "User registered successfully.", newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ success: false, message: "Error registering user." });
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
  } = req.body;

  const { id } = req.params;
  try {
    const updatedDev = await Dev.findOneAndUpdate(
      { _id: id },
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
        githubLink,
      },
      { new: true }
    );

    if (!updatedDev) {
      return res.status(404).json({ error: "User not found" });
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
      return res.status(404).json({ success: false, message: "Developer not found." });
    }

    const jobIndex = dev.myJobs.findIndex(job => job.job.toString() === jobId);
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
    } else {
      // Job found in developer's list, handle according to status
      if (dev.myJobs[jobIndex].isAcceptedOffer) {
        return res.status(400).json({ success: false, message: "Application already accepted." });
      } else if (dev.myJobs[jobIndex].isRejectedOffer) {
        return res.status(400).json({ success: false, message: "Your application is rejected." });
      } else if (dev.myJobs[jobIndex].isOffer) {
        // Update isAcceptedOffer to true if offer has been made and not rejected
        dev.myJobs[jobIndex].isApplied = true;
        dev.myJobs[jobIndex].isAcceptedOffer = true;
        dev.myJobs[jobIndex].coverLetter = coverLetter;
      } else if (dev.myJobs[jobIndex].isBookmarked) {
        // Update isApplied to true if job is bookmarked
        dev.myJobs[jobIndex].isApplied = true;
        dev.myJobs[jobIndex].coverLetter = coverLetter;
      } else if (dev.myJobs[jobIndex].isApplied) {
        // Applicant has already applied, cannot apply again
        return res.status(400).json({ success: false, message: "You have already applied for this job." });
      } else {
        // Update isApplied to true if job is not bookmarked
        dev.myJobs[jobIndex].isApplied = true;
        dev.myJobs[jobIndex].coverLetter = coverLetter;
      }
    }

    await dev.save();

    // Update the JobPost model with the application
    const job = await JobPost.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found." });
    }
    
    job.applicants.push({
      applicant: dev._id,
      coverLetter: coverLetter,
    });

    await job.save();

    res.status(200).json({ success: true, message: "Application submitted successfully." });
  } catch (error) {
    console.error("Error submitting application:", error);
    res.status(500).json({ success: false, message: "Error submitting application." });
  }
};


module.exports = { devRegister, devEdit, devApplication };
