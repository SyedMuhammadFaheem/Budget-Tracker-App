const User = require("../models/User");
const appDataSource = require("../config/db");
const hashing = require("../Utilities/passwords");

const login = async (email, password) => {
  try {
    console.log('hello')
    const user = await appDataSource.getRepository(User).findOneBy({
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

const signup = async (username, email, password, googleAuth) => {
  try {
    const user = await appDataSource.getRepository(User).findOneBy({
      email: email,
    });
    console.log('here',user)
    if (user && googleAuth) return await login(email,password)
    else if (user) return new Error("User already exists!");
    console.log('here 2',user)
    const hashedPassword = await hashing.hashPassword(password);
    console.log('here 3',user)

    const userObj = {
      name: username,
      email: email,
      password: hashedPassword,
      role: "user",
    };
    const newUser = appDataSource.getRepository(User);
    await newUser.save(userObj);
    console.log('here 4',user)
    const retUser= await appDataSource.getRepository(User).findOneBy({
      email: email,
    });
    console.log('result',retUser)
    return retUser;
  } catch (error) {
    return error;
  }
};

module.exports = { login, signup };
