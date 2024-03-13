const User = require("../models/User");
const appDataSource = require("../config/db");
const getPassword = async (id) => {
  try {
    id = Number(id);
    const user = await appDataSource
      .getRepository("User")
      .findOneBy({ id: id });
    console.log("pass", user);
    if (!user) return new Error("User doesn't exist!");
    return user;
  } catch (error) {
    return error;
  }
};

const getUserDetails = async (id) => {
  try {
    id = Number(id);
    const user = await appDataSource
      .getRepository("User")
      .findOneBy({ id: id });
    if (!user) return new Error("User doesn't exist!");
    return user;
  } catch (error) {
    return error;
  }
};

const updateUserDetails = async (id, name, email, password, role, balance) => {
  try {
    balance = parseFloat(balance);
    id = Number(id);
    console.log(id, balance);
    const user = await appDataSource
      .getRepository("User")
      .findOneBy({ id: id });
    if (!user) return new Error("User doesn't exist!");
    await appDataSource.getRepository("User").update(
      { id: id },
      {
        name: name,
        email: email,
        password: password,
        role: role,
        balance: balance,
      }
    );
    const updatedUser = await appDataSource
      .getRepository("User")
      .findOneBy({ id: id });
    return updatedUser;
  } catch (error) {
    return error;
  }
};


const getNumbers = async (id) => {
  try {
    id = Number(id);
    const user = await appDataSource
      .getRepository("User")
      const numbers = await user
      .createQueryBuilder("user")
      .innerJoin("user.incomes", "income", "income.earned = user.id")
      .innerJoin("user.expenses", "expense", "expense.spentBy = user.id")
      .innerJoin("user.savings", "saving", "saving.savedBy = user.id")
      .select([
        "SUM(income.amount) AS income_amount",
        "SUM(expense.amount) AS expense_amount",
        "SUM(saving.targetAmount) AS saving_amount"
      ])
      .where("user.id = :id", { id: id })
      .getRawOne();
    const userDetails = await user.createQueryBuilder("user").select(["user.balance AS balance", "user.name AS name"])
    .where("user.id = :id", { id: id })
      .getRawOne()
    const res = {
      ...userDetails,
      ...numbers
    }
    return res;
  } catch (error) {
    return error;
  }
};

module.exports = { getPassword, getUserDetails, updateUserDetails, getNumbers };