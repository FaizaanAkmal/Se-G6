const JobPost = require("../models/job");

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
    // TODO
};

const editJob = async (req, res) => {
    // TODO
};

const deleteJob = async (req, res) => {
    // TODO
};

module.exports = { createJob, getJob, editJob, deleteJob };
