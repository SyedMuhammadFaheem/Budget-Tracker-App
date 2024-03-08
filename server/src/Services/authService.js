const User = require("../models/User");
const appDataSource = require("../config/db");
const hashing = require("../Utilities/passwords");

const login = async (email, password) => {
  try {
    const user = await appDataSource.getRepository("User").findOneBy({
      email: email,
    });
    if (!user) return new Error("User doesn't exist!");
    const verified = hashing.verifyPassword(password, user.password);
    if (verified) return user;
    return new Error("Incorrect password!");
  } catch (error) {
    return error;
  }
};

const signup = async (username, email, password) => {
  try {
    const user = await appDataSource.getRepository(User).findOneBy({
      email: email,
    });
    if (user) return new Error("User already exists!");
    const hashedPassword = await hashing.hashPassword(password);

    const userObj = {
      name: username,
      email: email,
      password: hashedPassword,
      role: "user",
    };
    const newUser = appDataSource.getRepository(User);
    await newUser.save(userObj);
    return userObj;
  } catch (error) {
    return error;
  }
};

module.exports = { login, signup };
