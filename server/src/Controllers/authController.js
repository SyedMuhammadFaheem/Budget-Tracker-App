const authService = require("../Services/authService");

const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  res.status(201).send({user: result, message:'User signed in successfully!'});
};
const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const result = await authService.signup(username, email, password);
  res.status(201).send({user: result, message:'User signed up successfully!'});
};

module.exports = { login, signup };