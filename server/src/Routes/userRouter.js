const express = require("express");
const userRouter = express.Router();
const userController = require("../Controllers/userController");

userRouter.post('/get-password',userController.getPassword)


module.exports = userRouter