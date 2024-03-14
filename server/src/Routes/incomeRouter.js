const express = require("express");
const incomeRouter = express.Router();
const incomeController = require("../Controllers/incomeController");


incomeRouter.get('/get-income/:id',incomeController.getIncome)
incomeRouter.post('/create-income/:id',incomeController.createIncome)
incomeRouter.put('/update-income/:id',incomeController.updateIncome)
incomeRouter.delete('/delete-income/:id', incomeController.deleteIncome)



module.exports= incomeRouter