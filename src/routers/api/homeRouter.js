const Router = require("express")
const HomeController = require("../../controllers/api/homeController")



const homeRouter = Router.Router();

homeRouter.post('', HomeController.addHome);

module.exports = homeRouter;