const express = require("express");
const expenseRouter = express.Router();
const expenseController = require("../Controllers/expenseController");

expenseRouter.get("/get-expense/:id", expenseController.getExpense);
expenseRouter.post("/create-expense/:id", expenseController.createExpense);
expenseRouter.put("/update-expense/:id", expenseController.updateExpense);
expenseRouter.delete("/delete-expense/:id", expenseController.deleteExpense);

module.exports = expenseRouter;
