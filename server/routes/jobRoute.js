const express = require("express");
const jobRouter = express.Router();
const cors = require("cors");
const {
  createJob,
  getJob,
  getAllJobs,
  editJob,
  deleteJob,
  addBookmark,
  removeBookmark,
  getBookmarkedJobs,
  getDevJobs
} = require("../controllers/jobController");

jobRouter.post("/create", createJob);
jobRouter.get("/", getJob);
jobRouter.get("/all", getAllJobs);
jobRouter.patch("/edit", editJob);
jobRouter.delete("/delete", deleteJob);
jobRouter.post("/addBookmark/:jobId/:userId", addBookmark);
jobRouter.post("/removeBookmark/:jobId/:userId", removeBookmark);
jobRouter.get("/getBookmarkedJobs/:userId", getBookmarkedJobs);
jobRouter.get("/getDevJobs/:userId", getDevJobs);

module.exports = jobRouter;
