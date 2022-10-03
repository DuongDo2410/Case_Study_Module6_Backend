const Router = require("express");
const DayController = require("../../controllers/api/home/dayController");

const dayRouter = Router.Router();

dayRouter.post("/booking/:id", DayController.booking);

module.exports = dayRouter;
