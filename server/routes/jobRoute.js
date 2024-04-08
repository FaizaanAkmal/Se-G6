const express = require("express");
const jobRouter = express.Router();
const cors = require("cors");
const {
  createJob,
  getJob,
  getAllJobs,
  editJob,
  closeJob,
} = require("../controllers/jobController");

jobRouter.post("/create", createJob);
jobRouter.get("/", getJob);
jobRouter.get("/all", getAllJobs);
jobRouter.patch("/edit", editJob);
jobRouter.patch("/close", closeJob);

module.exports = jobRouter;
