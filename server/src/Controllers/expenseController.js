const expenseService = require("../Services/expenseService");

const createExpense = async (req, res) => {
  try {
    const { name, amount, type, expenseDate } = req.body;
    const result = await expenseService.createExpense(
      name,
      amount,
      type,
      expenseDate
    );
    console.log("res", result);
    if (!result) throw new Error("Error creating expenses!");
    res.status(201).json({ expense: result });
  } catch (error) {
    res.status(501).json({ error: error });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, amount, type, expenseDate } = req.body;
    const result = await expenseService.updateExpense(
      id,
      name,
      amount,
      type,
      expenseDate
    );
    console.log("res", result);
    if (!result) throw new Error("Error updating expenses!");
    res.status(201).json({ updatedExpense: result });
  } catch (error) {
    res.status(501).json({ error: error });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await expenseService.deleteExpense(id);
    console.log("res", result);
    if (!result) throw new Error("Error deleting expenses!");
    res.status(204).json({ deletedExpense: result });
  } catch (error) {
    res.status(501).json({ error: error });
  }
};

module.exports = { createExpense, updateExpense, deleteExpense };
