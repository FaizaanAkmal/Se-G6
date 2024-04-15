const express = require("express");
const jobRouter = express.Router();
const cors = require("cors");
const {
  createJob,
  getAllJobs,
  getRelatedJobs,
  individualBookmarks,
  editJob,
  closeJob,
  deleteJob,
  updateBookmarks,
  deleteApplicants,
  acceptOffer,
  rejectOffer
  
} = require("../controllers/jobController");

jobRouter.post("/create", createJob);
jobRouter.get("/all", getAllJobs);
jobRouter.get("/related",getRelatedJobs)
jobRouter.patch("/edit", editJob);
jobRouter.patch("/close", closeJob);
jobRouter.delete("/delete", deleteJob);
jobRouter.delete("/delete/:id", deleteJob);
jobRouter.delete("/deleteApplicant/:id", deleteApplicants)
jobRouter.put("/updateBookmarks",updateBookmarks)
jobRouter.put("/individualBookmarks",individualBookmarks)
jobRouter.post("/acceptOffer",acceptOffer)
jobRouter.post("/rejectOffer",rejectOffer)

module.exports = jobRouter;
