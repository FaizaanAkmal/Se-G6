const express = require("express");
const jobRouter = express.Router();
const cors = require("cors");
const {
  createJob,
  getAllJobs,
  editJob,
  deleteJob,
  updateBookmarks,
  individualBookmarks,
  getRelatedJobs,
  
} = require("../controllers/jobController");

jobRouter.post("/create", createJob);
jobRouter.get("/all", getAllJobs);
jobRouter.get("/related",getRelatedJobs)
jobRouter.patch("/edit", editJob);
jobRouter.delete("/delete", deleteJob);
jobRouter.put("/updateBookmarks",updateBookmarks)
jobRouter.put("/individualBookmarks",individualBookmarks)

module.exports = jobRouter;
