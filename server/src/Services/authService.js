const appDataSource = require("../config/db");
const hashing = require("../Utilities/passwords");

const login = async (email, password) => {
  try {
    const user = await appDataSource.getRepository("User").findOneBy({
      email: email,
    });
    if (!user) throw new Error("User doesn't exist!");
    const verified = await hashing.verifyPassword(password, user.password);
    if (verified) return user;
    throw new Error("Incorrect password!");
  } catch (error) {
    throw new Error(error.message);
  }
};

const signup = async (username, email, password, googleAuth) => {
  try {
    const user = await appDataSource.getRepository("User").findOneBy({
      email: email,
    });
    if (user && googleAuth) return await login(email,password)
    else if (user) throw new Error("User already exists!");
    const hashedPassword = await hashing.hashPassword(password);

    const userObj = {
      name: username,
      email: email,
      password: hashedPassword,
      role: "user",
    };
    const newUser = appDataSource.getRepository("User");
    await newUser.save(userObj);
    const retUser= await appDataSource.getRepository("User").findOneBy({
      email: email,
    });
    return retUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { login, signup };
