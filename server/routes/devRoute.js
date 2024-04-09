const express = require("express");
const devRouter = express.Router();
const cors = require("cors");
const { devRegister, devEdit, devApplication, getDev } = require("../controllers/devController");

devRouter.post("/profileSetup", devRegister);
devRouter.post("/application",devApplication)
devRouter.patch("/profileEdit/:id", devEdit);
devRouter.get("/getProfile/:id", getDev)

module.exports = devRouter;
