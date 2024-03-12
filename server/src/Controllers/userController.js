const userService = require("../Services/userService");

const getPassword = async (req, res) => {
  try {
    const { id } = req.body;
    const result = await userService.getPassword(id);
    console.log('res',result)
    if (!result) throw new Error("User not found!");
    res.status(200).json({ password: result.password });
  } catch (error) {
    res.status(501).json({ error: error });
  }
};

module.exports ={getPassword}
