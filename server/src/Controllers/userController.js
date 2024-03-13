const userService = require("../Services/userService");

const getPassword = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id)
    const result = await userService.getPassword(id);
    console.log("res", result);
    if (!result) throw new Error("User not found!");
    res.status(200).json({ password: result.password });
  } catch (error) {
    res.status(501).json({ error: error });
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
    res.status(501).json({ error: error });
  }
};

const updateUserDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const {name, email, password, role, balance} = req.body
      const result = await userService.updateUserDetails(id,name, email, password, role, balance);
      console.log("res", result);
      if (!result) throw new Error("User not updated!");
      res.status(200).json({ user: result });
    } catch (error) {
      res.status(501).json({ error: error });
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
    res.status(501).json({ error: error });
  }
};

module.exports = { getPassword, getUserDetails, updateUserDetails, getNumbers };
