const incomeService = require("../Services/incomeService");

const createIncome = async (req, res) => {
  try {
      const { id } = req.params;
      console.log('control',id)
    const { name, amount, type, receivedDate } = req.body;
    const result = await incomeService.createIncome(
      id,
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

const getIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await incomeService.getIncome(id);
    console.log("res", result);
    if (!result) throw new Error("Error fetching incomes!");
    res.status(200).json({ income: result });
  } catch (error) {
    res.status(501).json({ error: error });
  }
};

module.exports = { createIncome, updateIncome, deleteIncome, getIncome };
