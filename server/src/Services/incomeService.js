const appDataSource = require("../config/db");

const createIncome = async (id, name, amount, type, receivedDate) => {
    try {
       const earnedId = Number(id)
    const income = appDataSource.getRepository("Income");
    const incomeObj = {
      name: name,
      amount: amount,
      type: type,
        receivedDate: receivedDate,
      earned: {id: earnedId}
    };
    await income.save(incomeObj);
    const createdIncome = await income
      .createQueryBuilder("income")
      .orderBy("income.id", "DESC")
      .getOne();
    return createdIncome;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateIncome = async (id, name, amount, type, receivedDate) => {
  try {
    id = Number(id);
    const income = await appDataSource
      .getRepository("Income")
      .findOneBy({ id: id });
    if (!income) throw new Error("Income doesn't exist!");
    await appDataSource.getRepository("Income").update(
      { id: id },
      {
        name: name,
        amount: amount,
        type: type,
        receivedDate: receivedDate,
      }
    );
    const updatedIncome = await appDataSource
      .getRepository("Income")
      .findOneBy({ id: id });
    return updatedIncome;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteIncome = async (id) => {
  try {
    id = Number(id);
    const income = await appDataSource
      .getRepository("Income")
      .findOneBy({ id: id });
    if (!income) throw new Error("Income doesn't exist!");
    const returnIncome = income;
    await appDataSource.getRepository("Income").remove(income);
    return returnIncome;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getIncome = async (id) => {
  try {
    id = Number(id);
    const income = await appDataSource
      .getRepository("Income")
      .findOneBy({ id: id });
    if (!income) throw new Error("Income doesn't exist!");
    return income;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { createIncome, updateIncome, deleteIncome, getIncome };
