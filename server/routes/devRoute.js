const express = require("express");
const devRouter = express.Router();
const cors = require("cors");
const { devRegister, devEdit , getJobs } = require("../controllers/devController");

devRouter.post("/onboarding", devRegister);
devRouter.patch("/profile", devEdit);
devRouter.get("/getJobs", getJobs);

module.exports = devRouter;
