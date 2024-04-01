const express = require("express");
const companyRouter = express.Router();
const cors = require("cors");
const {
  companyRegister,
  companyEdit,
} = require("../controllers/companyController");

//Handling Company Creation and Editing Routes
companyRouter.post("/profileSetup", companyRegister);
companyRouter.patch("/profileEdit", companyEdit);

module.exports = companyRouter;
