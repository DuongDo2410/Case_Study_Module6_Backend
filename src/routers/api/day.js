const Router = require("express")
const DayController = require("../../controllers/api/dayController")



const dayRouter = Router.Router();

dayRouter.post('', DayController.createDay);


module.exports = dayRouter;