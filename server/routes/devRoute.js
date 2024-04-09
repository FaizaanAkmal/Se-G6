const express = require("express");
const devRouter = express.Router();
const cors = require("cors");
const { devRegister, devEdit, devApplication } = require("../controllers/devController");

devRouter.post("/profileSetup", devRegister);
devRouter.post("/application",devApplication)
devRouter.patch("/profileEdit", devEdit);

module.exports = devRouter;
