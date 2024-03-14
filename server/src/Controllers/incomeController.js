const incomeService = require("../Services/incomeService");

const createIncome = async (req, res) => {
  try {
    const { name, amount, type, receivedDate } = req.body;
    const result = await incomeService.createIncome(
      name,
      amount,
      type,
      receivedDate
    );
    console.log("res", result);
    if (!result) throw new Error("Error creating incomes!");
    res.status(201).json({ income: result });
  } catch (error) {
    res.status(501).json({ error: error });
  }
};

const updateIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, amount, type, receivedDate } = req.body;
    const result = await incomeService.updateIncome(
      id,
      name,
      amount,
      type,
      receivedDate
    );
    console.log("res", result);
    if (!result) throw new Error("Error updating incomes!");
    res.status(201).json({ updatedIncome: result });
  } catch (error) {
    res.status(501).json({ error: error });
  }
};

const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await incomeService.deleteIncome(id);
    console.log("res", result);
    if (!result) throw new Error("Error deleting incomes!");
    res.status(204).json({ deletedIncome: result });
  } catch (error) {
    res.status(501).json({ error: error });
  }
};

module.exports = { createIncome, updateIncome, deleteIncome };
