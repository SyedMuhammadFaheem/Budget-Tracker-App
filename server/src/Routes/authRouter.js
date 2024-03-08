const express = require("express");
const authRouter = express.Router();
const authController = require("../Controllers/authController");



authRouter.post("/login", authController.login);
authRouter.post("/signup", authController.signup);
authRouter.post("/oauth/register", authController.google);

module.exports = authRouter;
