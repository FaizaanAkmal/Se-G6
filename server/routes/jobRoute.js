const express = require("express");
const jobRouter = express.Router();
const cors = require("cors");
const {
  createJob,
  getJob,
  getAllJobs,
  editJob,
  deleteJob,
} = require("../controllers/jobController");

jobRouter.post("/create", createJob);
jobRouter.get("/", getJob);
jobRouter.get("/all", getAllJobs);
jobRouter.patch("/edit", editJob);
jobRouter.delete("/delete", deleteJob);

module.exports = jobRouter;
