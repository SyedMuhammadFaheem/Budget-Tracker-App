const express = require("express");
const savingRouter = express.Router();
const savingController = require("../Controllers/savingController");


savingRouter.post('/create-saving',savingController.createSaving)
savingRouter.put('/update-saving/:id',savingController.updateSaving)
savingRouter.delete('/delete-saving/:id', savingController.deleteSaving)



module.exports= savingRouter