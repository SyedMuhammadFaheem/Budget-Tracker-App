const savingService = require("../Services/savingService");

const createSaving = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, targetAmount, deadline } = req.body;
    const result = await savingService.createSaving(id, name, targetAmount, deadline);
    console.log("res", result);
    if (!result) throw new Error("Error creating savings!");
    res.status(201).json({ saving: result });
  } catch (error) {
    res.status(501).json({ error: error });
  }
};

const updateSaving = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, targetAmount, deadline } = req.body;
    const result = await savingService.updateSaving(id, name, targetAmount, deadline);
    console.log("res", result);
    if (!result) throw new Error("Error updating savings!");
    res.status(201).json({ updatedSaving: result });
  } catch (error) {
    res.status(501).json({ error: error });
  }
};

const deleteSaving = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await savingService.deleteSaving(id);
    console.log("res", result);
    if (!result) throw new Error("Error deleting savings!");
    res.status(204).json({ deletedSaving: result });
  } catch (error) {
    res.status(501).json({ error: error });
  }
};

const getSaving = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await savingService.getSaving(id);
    console.log("res", result);
    if (!result) throw new Error("Error fetching savings!");
    res.status(200).json({ saving: result });
  } catch (error) {
    res.status(501).json({ error: error });
  }
};

module.exports = { createSaving, updateSaving, deleteSaving, getSaving };
