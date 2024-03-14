const express = require("express");
const expenseRouter = express.Router();
const expenseController = require("../Controllers/expenseController");

expenseRouter.post("/create-expense", expenseController.createExpense);
expenseRouter.put("/update-expense/:id", expenseController.updateExpense);
expenseRouter.delete("/delete-expense/:id", expenseController.deleteExpense);

module.exports = expenseRouter;
