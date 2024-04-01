const express = require("express");
const devRouter = express.Router();
const cors = require("cors");
const {
  devRegister,
  devEdit,
  getJobs,
} = require("../controllers/devController");

devRouter.post("/profileSetup", devRegister);
devRouter.patch("/profileEdit", devEdit);

module.exports = devRouter;
