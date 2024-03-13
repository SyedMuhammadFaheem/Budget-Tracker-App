const express = require("express");
const userRouter = express.Router();
const userController = require("../Controllers/userController");

userRouter.post('/get-password',userController.getPassword)
userRouter.get('/get-user-details/:id',userController.getUserDetails)
userRouter.put('/update-user-details/:id',userController.updateUserDetails)
userRouter.get('/get-numbers/:id',userController.getNumbers)


module.exports = userRouter