const appDataSource = require("../config/db");

const createSaving = async (id, name, targetAmount, deadline) => {
    try {
        const savedById=Number(id)
    const saving = appDataSource.getRepository("Saving");
        const savingObj = {
        name:name,
      targetAmount: targetAmount,
      deadline: deadline,
        savedBy: { id: savedById },
    };
    await saving.save(savingObj);
    const createdSaving = await saving
      .createQueryBuilder("saving")
      .orderBy("saving.id", "DESC")
      .getOne();
    return createdSaving;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateSaving = async (id,name, targetAmount, deadline) => {
  try {
    id = Number(id);
    const saving = await appDataSource
      .getRepository("Saving")
      .findOneBy({ id: id });
    if (!saving) throw new Error("Saving doesn't exist!");
    await appDataSource.getRepository("Saving").update(
      { id: id },
        {
          name: name,
        targetAmount: targetAmount,
        deadline: deadline,
      }
    );
    const updatedSaving = await appDataSource
      .getRepository("Saving")
      .findOneBy({ id: id });
    return updatedSaving;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteSaving = async (id) => {
  try {
    id = Number(id);
    const saving = await appDataSource
      .getRepository("Saving")
      .findOneBy({ id: id });
    if (!saving) throw new Error("Saving doesn't exist!");
    const returnSaving = saving;
    await appDataSource.getRepository("Saving").remove(saving);
    return returnSaving;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getSaving = async (id) => {
  try {
    id = Number(id);
    const saving = await appDataSource
      .getRepository("Saving")
      .findOneBy({ id: id });
    if (!saving) throw new Error("Saving doesn't exist!");
    return saving;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { createSaving, updateSaving, deleteSaving, getSaving };
