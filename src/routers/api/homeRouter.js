const Router = require("express");
const HomeController = require("../../controllers/api/home/homeController");

const homeRouter = Router.Router();

homeRouter.post("", HomeController.addHome);
homeRouter.put("/:id", HomeController.updateHome);
homeRouter.delete("/:id", HomeController.deleteHome);
homeRouter.get("", HomeController.getAll);
homeRouter.get("/:id", HomeController.showDetail);
homeRouter.get("/find/home", HomeController.fiterHome);

module.exports = homeRouter;
