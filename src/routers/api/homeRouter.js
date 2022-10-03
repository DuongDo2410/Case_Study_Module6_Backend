const Router = require("express");
const HomeController = require("../../controllers/api/home/homeController");

const homeRouter = Router.Router();

homeRouter.post("", HomeController.addHome);
homeRouter.put("/:id", HomeController.updateHome);
homeRouter.put("/updateStatus/:id", HomeController.UpdateStatus);
homeRouter.delete("/:id", HomeController.deleteHome);
homeRouter.get("/:id", HomeController.showDetail);
homeRouter.get("/find/home", HomeController.fiterHome);
homeRouter.get("", HomeController.showAllHouse);

module.exports = homeRouter;
