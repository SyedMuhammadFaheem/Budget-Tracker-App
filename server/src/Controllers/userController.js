const userService = require("../Services/userService");

const getPassword = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    const result = await userService.getPassword(id);
    console.log("res", result);
    if (!result) throw new Error("User not found!");
    res.status(200).json({ password: result.password });
  } catch (error) {
    res.send({ error: error.message });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userService.getUserDetails(id);
    console.log("res", result);
    if (!result) throw new Error("User not found!");
    res.status(200).json({ user: result });
  } catch (error) {
    res.send({ error: error.message });
  }
};

const updateUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role, balance } = req.body;
    const result = await userService.updateUserDetails(
      id,
      name,
      email,
      password,
      role,
      balance
    );
    console.log("res", result);
    if (!result) throw new Error("User not updated!");
    res.status(201).json({ user: result });
  } catch (error) {
    res.send({ error: error.message });
  }
};

const getNumbers = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userService.getNumbers(id);
    console.log("res", result);
    if (!result) throw new Error("Error fetching numbers for user!");
    res.status(200).json({ numbers: result });
  } catch (error) {
    res.send({ error: error.message });
  }
};

const getIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userService.getIncome(id);
    console.log("res", result);
    if (!result) throw new Error("Error fetching incomes!");
    res.status(200).json({ income: result });
  } catch (error) {
    res.send({ error: error.message });
  }
};

const getExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userService.getExpense(id);
    console.log("res", result);
    if (!result) throw new Error("Error fetching expenses!");
    res.status(200).json({ expense: result });
  } catch (error) {
    res.send({ error: error.message });
  }
};

const getSaving = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userService.getSaving(id);
    console.log("res", result);
    if (!result) throw new Error("Error fetching savings!");
    res.status(200).json({ saving: result });
  } catch (error) {
    res.send({ error: error.message });
  }
};

const getNumbersMonth = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userService.getNumbersMonth(id);
    console.log("res", result);
    if (!result) throw new Error("Error fetching numbers for this month for user!");
    res.status(200).json({ numbers: result });
  } catch (error) {
    res.send({ error: error.message });
  }
};

module.exports = {
  getPassword,
  getUserDetails,
  updateUserDetails,
  getNumbers,
  getIncome,
  getExpense,
  getSaving,
  getNumbersMonth
};
