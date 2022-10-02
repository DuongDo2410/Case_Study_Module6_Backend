const Router = require("express");
const DayController = require("../../controllers/api/home/dayController");

const dayRouter = Router.Router();

dayRouter.post("", DayController.createDay);

module.exports = dayRouter;
