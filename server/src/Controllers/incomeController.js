const incomeService = require("../Services/incomeService");

const createIncome = async (req, res) => {
  try {
      const { id } = req.params;
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
    res.send({ error: error.message });
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
    res.send({ error: error.message });
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
    res.send({ error: error.message });
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
    res.send({ error: error.message });
  }
};

module.exports = { createIncome, updateIncome, deleteIncome, getIncome };
