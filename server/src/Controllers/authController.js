const authService = require("../Services/authService");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    if (!result) throw new Error("Error in registering with Google Account");

    res
      .status(201)
      .send({ user: result, message: "User signed in successfully!" });
  } catch (error) {
    res.send({ error: error.message });
  }
};
const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const result = await authService.signup(username, email, password);
    if (!result) throw new Error("Error in registering with Google Account");
    res
      .status(201)
      .send({ user: result, message: "User signed up successfully!" });
  } catch (error) {
    res.send({ error: error.message });
  }
};

const google = async (req, res) => {
  try {
    const { username, email, password, googleAuth } = req.body;
    console.log(username, email, password, googleAuth);
    const result = await authService.signup(
      username,
      email,
      password,
      googleAuth
    );
    if (!result) throw new Error("Error in registering with Google Account");

    res
      .status(201)
      .send({ user: result, message: "User signed up successfully!" });
  } catch (error) {
    res.send({ error: error.message });
  }
};

module.exports = { login, signup, google };
