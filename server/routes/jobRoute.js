const express = require("express");
const jobRouter = express.Router();
const cors = require("cors");
const {
  createJob,
  getAllJobs,
  getRelatedJobs,
  updateBookmarks,
  individualBookmarks,
  editJob,
  closeJob,
  deleteJob,
} = require("../controllers/jobController");

jobRouter.post("/create", createJob);
jobRouter.get("/all", getAllJobs);
jobRouter.get("/related",getRelatedJobs)
jobRouter.patch("/edit", editJob);
jobRouter.patch("/close", closeJob);
jobRouter.delete("/delete", deleteJob);
jobRouter.put("/updateBookmarks",updateBookmarks)
jobRouter.put("/individualBookmarks",individualBookmarks)

module.exports = jobRouter;
