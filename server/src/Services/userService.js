const appDataSource = require("../config/db");
const getPassword = async (id) => {
  try {
    id = Number(id);
    const user = await appDataSource
      .getRepository("User")
      .findOneBy({ id: id });
    console.log("pass", user);
    if (!user) throw new Error("User doesn't exist!");
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserDetails = async (id) => {
  try {
    id = Number(id);
    const user = await appDataSource
      .getRepository("User")
      .findOneBy({ id: id });
    if (!user) throw new Error("User doesn't exist!");
    return user;
  } catch (error) {
    throw new Error(error.message);
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
    if (!user) throw new Error("User doesn't exist!");
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
    throw new Error(error.message);
  }
};

const getNumbers = async (id) => {
  try {
    id = Number(id);
    const user = appDataSource.getRepository("User");
    const incomeNumbers = await user
      .createQueryBuilder("user")
      .innerJoin("user.incomes", "income", "income.earned = user.id")
      .select([
        "SUM(income.amount) AS income_amount"
      ])
      .where("user.id = :id", { id: id }).getRawOne()
      const expenseNumbers = await user
      .createQueryBuilder("user")
      .innerJoin("user.expenses", "expense", "expense.spentBy = user.id")
      .select([
        "SUM(expense.amount) AS expense_amount"
      ])
      .where("user.id = :id", { id: id }).getRawOne()
    const userDetails = await user
      .createQueryBuilder("user")
      .select(["user.name AS name"])
      .where("user.id = :id", { id: id })
      .getRawOne();
    const res = {
      ...userDetails,
      ...incomeNumbers,
      ...expenseNumbers,
    };
    return res;
  } catch (error) {
    return error;
  }
};


const getNumbersMonth = async (id) => {
  try {
    id = Number(id);
    const user = appDataSource.getRepository("User");
    const incomeNumbers = await user
      .createQueryBuilder("user")
      .innerJoin("user.incomes", "income", "income.earned = user.id")
      .select([
        "SUM(income.amount) AS income_amount"
      ])
      .where("user.id = :id", { id: id }).andWhere("DATE_TRUNC('month', income.receivedDate) = DATE_TRUNC('month', CURRENT_DATE)")
      .getRawOne();
      const expenseNumbers = await user
      .createQueryBuilder("user")
      .innerJoin("user.expenses", "expense", "expense.spentBy = user.id")
      .select([
        "SUM(expense.amount) AS expense_amount"
      ])
      .where("user.id = :id", { id: id }).andWhere("DATE_TRUNC('month', expense.expenseDate) = DATE_TRUNC('month', CURRENT_DATE)")
      .getRawOne();
    const userDetails = await user
      .createQueryBuilder("user")
      .select([ "user.name AS name"])
      .where("user.id = :id", { id: id })
      .getRawOne();
    const res = {
      ...userDetails,
      ...incomeNumbers,
      ...expenseNumbers,
    };
    return res;
  } catch (error) {
    return error;
  }
};

const getIncome = async (id) => {
  try {
    id = Number(id);
    const user = appDataSource.getRepository("User");
    const income = await user
      .createQueryBuilder("user")
      .innerJoin("user.incomes", "income", "income.earned = user.id")
      .select([
        "income.id, income.name, income.amount, income.type, income.receivedDate ",
      ])
      .where("user.id = :id", { id: id })
      .getRawMany();

    return income;
  } catch (error) {
    throw new Error(error.message);
  }
};




const getExpense = async (id) => {
  try {
    id = Number(id);
    const user = appDataSource.getRepository("User");
    const income = await user
      .createQueryBuilder("user")
      .innerJoin("user.expenses", "expense", "expense.spentBy = user.id")
      .select([
        "expense.id, expense.name, expense.amount, expense.type, expense.expenseDate ",
      ])
      .where("user.id = :id", { id: id })
      .getRawMany();

    return income;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getSaving = async (id) => {
  try {
    id = Number(id);
    console.log('hello')
    const user = appDataSource.getRepository("User");
    const income = await user
      .createQueryBuilder("user")
      .innerJoin("user.savings", "saving", "saving.savedBy = user.id")
      .select(["saving.id, saving.name, saving.targetAmount, saving.deadline "])
      .where("user.id = :id", { id: id })
      .getRawMany();

    return income;
  } catch (error) {
    throw new Error(error.message);
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
