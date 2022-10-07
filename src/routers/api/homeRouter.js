const Router = require("express");
const HomeController = require("../../controllers/api/home/homeController");

const homeRouter = Router.Router();

homeRouter.get("", HomeController.showAllHouse);
homeRouter.get("/top", HomeController.showTop5House);
homeRouter.post("", HomeController.addHome);
homeRouter.post("/find", HomeController.filterHome);
homeRouter.get("/:id", HomeController.showDetail);
homeRouter.put("/:id", HomeController.updateHome);
homeRouter.put("/:id", HomeController.updateStatus);
homeRouter.delete("/:id", HomeController.deleteHome);

module.exports = homeRouter;
    