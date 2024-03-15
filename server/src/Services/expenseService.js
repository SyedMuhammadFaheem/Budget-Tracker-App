const appDataSource = require("../config/db");
const moment = require('moment')

const createExpense = async (id, name, amount, type, expenseDate) => {
    try {
       const spentById=Number(id)
    const expense = appDataSource.getRepository("Expense");
    const expenseObj = {
      name: name,
      amount: amount,
      type: type,
      expenseDate: expenseDate,
        spentBy: { id: spentById },
    };
    await expense.save(expenseObj);
    const createdExpense = await expense
      .createQueryBuilder("expense")
      .orderBy("expense.id", "DESC")
      .getOne();
    return createdExpense;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateExpense = async (id, name, amount, type, expenseDate) => {
  try {
    id = Number(id);
    const expense = await appDataSource
      .getRepository("Expense")
      .findOneBy({ id: id });
    if (!expense) throw new Error("Expense doesn't exist!");
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
    throw new Error(error.message);
  }
};

const deleteExpense = async (id) => {
  try {
    id = Number(id);
    const expense = await appDataSource
      .getRepository("Expense")
      .findOneBy({ id: id });
    if (!expense) throw new Error("Expense doesn't exist!");
    const returnExpense = expense;
    await appDataSource.getRepository("Expense").remove(expense);
    return returnExpense;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getExpense = async (id) => {
  try {
    id = Number(id);
    const expense = await appDataSource
      .getRepository("Expense")
      .findOneBy({ id: id });
      if (!expense) throw new Error("Expense doesn't exist!");
    return expense;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { createExpense, updateExpense, deleteExpense, getExpense };
