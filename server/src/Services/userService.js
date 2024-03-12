const User = require("../models/User");
const appDataSource = require("../config/db");
const getPassword = async (id) => {
  try {
    id= Number(id)
    console.log(id);
    console.log(typeof id);
    const user = await appDataSource.getRepository('User').findOneBy({id:id})
    console.log('pass',user)
    if (!user) return new Error("User doesn't exist!");
    return user;
  } catch (error) {
    return error;
  }
};

module.exports = { getPassword };
