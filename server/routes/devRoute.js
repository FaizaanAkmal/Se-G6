const express = require("express");
const devRouter = express.Router();
const cors = require("cors");
const {
  devRegister,
  devEdit,
  devApplication,
  getDev,
  deleteDev,
} = require("../controllers/devController");

devRouter.post("/profileSetup", devRegister);
devRouter.patch("/profileEdit/:id", devEdit);
devRouter.post("/application", devApplication);
devRouter.get("/getProfile/:id", getDev);
devRouter.delete("/deleteDev/:id", deleteDev);

module.exports = devRouter;
