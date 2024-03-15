const express = require("express");
const userRouter = express.Router();
const userController = require("../Controllers/userController");

//authorization
userRouter.post('/get-password', userController.getPassword)

//user details
userRouter.get('/get-user-details/:id',userController.getUserDetails)
userRouter.put('/update-user-details/:id', userController.updateUserDetails)

//cards
userRouter.get('/get-numbers/:id', userController.getNumbers)
userRouter.get('/get-numbers-month/:id', userController.getNumbersMonth)

//tables
userRouter.get('/get-income/:id',userController.getIncome)
userRouter.get('/get-expense/:id',userController.getExpense)
userRouter.get('/get-saving/:id',userController.getSaving)


module.exports = userRouter