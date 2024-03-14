const express = require("express");
const incomeRouter = express.Router();
const incomeController = require("../Controllers/incomeController");


incomeRouter.post('/create-income',incomeController.createIncome)
incomeRouter.put('/update-income/:id',incomeController.updateIncome)
incomeRouter.delete('/delete-income/:id', incomeController.deleteIncome)



module.exports= incomeRouter