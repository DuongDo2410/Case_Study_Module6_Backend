const Router = require("express");
const HomeController = require("../../controllers/api/home/homeController");
const { auth } = require("../../middlewares/auth");

const homeRouter = Router.Router();

homeRouter.get("", HomeController.showAllHouse);
homeRouter.get("/top", HomeController.showTop5House);
homeRouter.post("",auth, HomeController.addHome);
homeRouter.post("/find", HomeController.filterHome);
homeRouter.post("/rating/:id", HomeController.ratingHome);
homeRouter.get("/:id", HomeController.showDetail);
homeRouter.put("/:id", HomeController.updateHome);
homeRouter.put("/:id", HomeController.updateStatus);
homeRouter.delete("/:id", HomeController.deleteHome);
homeRouter.post("/comments/:id", HomeController.updateComment)

module.exports = homeRouter;
    