const express = require("express");
const savingRouter = express.Router();
const savingController = require("../Controllers/savingController");


savingRouter.get('/get-saving/:id',savingController.getSaving)
savingRouter.post('/create-saving/:id',savingController.createSaving)
savingRouter.put('/update-saving/:id',savingController.updateSaving)
savingRouter.delete('/delete-saving/:id', savingController.deleteSaving)



module.exports= savingRouter