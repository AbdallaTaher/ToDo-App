const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");

router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser);
module.exports = router;
