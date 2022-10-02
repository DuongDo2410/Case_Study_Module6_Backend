const Router = require("express");
const CityController = require("../../controllers/api/home/cityController");

const cityRouter = Router.Router();

cityRouter.post("", CityController.addCity);

module.exports = cityRouter;
