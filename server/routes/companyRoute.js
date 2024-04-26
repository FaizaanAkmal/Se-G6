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
} = require("../controllers/companyController");

//Handling Company Creation and Editing Routes
companyRouter.post("/profileSetup", companyRegister);
companyRouter.patch("/profileEdit", companyEdit);
companyRouter.get("/myJobs/:userId", getMyJobs);
companyRouter.patch("/bookmark", updateBookmark);
companyRouter.get("/getProfile", getCompany);
companyRouter.delete("/deleteCompany", deleteCompany);

module.exports = companyRouter;
