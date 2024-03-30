const express = require("express");
const jobRouter = express.Router();
const cors = require("cors");
const {
  createJob,
  getJob,
  editJob,
  deleteJob,
} = require("../controllers/jobController");

jobRouter.post("/create", createJob);
jobRouter.get("/:id", getJob);
jobRouter.patch("/:id", editJob);
jobRouter.delete("/:id", deleteJob);

module.exports = jobRouter;
