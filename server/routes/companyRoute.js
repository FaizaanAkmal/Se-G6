const express = require("express");
const companyRouter = express.Router();
const cors = require("cors");
const {
  companyRegister,
  companyEdit,
  getMyJobs,
  updateBookmark,
  getCompany, 
  deleteCompany,
  getApplicants
} = require("../controllers/companyController");

//Handling Company Creation and Editing Routes
companyRouter.post("/profileSetup", companyRegister);
companyRouter.patch("/profileEdit/:id", companyEdit);
companyRouter.get("/myJobs/:userId", getMyJobs);
companyRouter.patch("/bookmark", updateBookmark);
companyRouter.get("/getProfile/:id", getCompany);
companyRouter.delete("/deleteCompany/:id", deleteCompany);
companyRouter.get("/getApplicants",getApplicants)

module.exports = companyRouter;
