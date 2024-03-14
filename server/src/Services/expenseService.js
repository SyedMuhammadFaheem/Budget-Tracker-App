const appDataSource = require("../config/db");

const createExpense = async (name, amount, type, expenseDate) => {
  try {
    const expense = appDataSource.getRepository("Expense");
    const expenseObj = {
      name: name,
      amount: amount,
      type: type,
      expenseDate: expenseDate,
    };
    await expense.save(expenseObj);
    const createdExpense = await expense
      .createQueryBuilder("expense")
      .orderBy("expense.id", "DESC")
      .getOne();
    return createdExpense;
  } catch (error) {
    return error;
  }
};

const updateExpense = async (id, name, amount, type, expenseDate) => {
  try {
    id = Number(id);
    const expense = await appDataSource
      .getRepository("Expense")
      .findOneBy({ id: id });
    if (!expense) return new Error("Expense doesn't exist!");
    await appDataSource.getRepository("Expense").update(
      { id: id },
      {
        name: name,
        amount: amount,
        type: type,
        expenseDate: expenseDate,
      }
    );
    const updatedExpense = await appDataSource
      .getRepository("Expense")
      .findOneBy({ id: id });
    return updatedExpense;
  } catch (error) {
    return error;
  }
};

const deleteExpense = async (id) => {
  try {
    id = Number(id);
    const expense = await appDataSource
      .getRepository("Expense")
      .findOneBy({ id: id });
    if (!expense) return new Error("Expense doesn't exist!");
    const returnExpense = expense;
    await appDataSource.getRepository("Expense").remove(expense);
    return returnExpense;
  } catch (error) {
    return error;
  }
};

module.exports = { createExpense, updateExpense, deleteExpense };