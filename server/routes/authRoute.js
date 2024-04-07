const express = require("express");
const router = express.Router();
const cors = require("cors");
const { registerUser, loginUser, getUser, editUser } = require("../controllers/userController");

// All the routes Defined
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser/:id", getUser)
router.patch("/editUser/:id", editUser)

module.exports = router;
