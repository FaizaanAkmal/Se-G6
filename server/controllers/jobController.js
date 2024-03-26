const JobPost = require("../models/jobpost");

//creating a new job post
const createJob = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const job = await JobPost.create({
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
    });

    res.status(201).json({ status: "ok", id: job._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", error: "Something went wrong" });
  }
};

const getJob = async (req, res) => {
    // TODO: return Job with job_id in req
};

const editJob = async (req, res) => {
    // TODO: update Job info with job_id in req
};

const deleteJob = async (req, res) => {
    // TODO: remove Job with job_id in req
};

module.exports = { createJob, getJob, editJob, deleteJob };
