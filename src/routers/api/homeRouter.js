const Router = require("express");
const HomeController = require("../../controllers/api/home/homeController");

const homeRouter = Router.Router();

homeRouter.get("", HomeController.showAllHouse);
homeRouter.get("/top", HomeController.showTop5House);
homeRouter.get("/find", HomeController.filterHome);
homeRouter.post("", HomeController.addHome);
homeRouter.get("/:id", HomeController.showDetail);
homeRouter.put("/:id", HomeController.updateHome);
homeRouter.put("/:id", HomeController.updateStatus);
homeRouter.delete("/:id", HomeController.deleteHome);

module.exports = homeRouter;
    