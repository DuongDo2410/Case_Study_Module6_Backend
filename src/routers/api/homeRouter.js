const Router = require("express");
const HomeController = require("../../controllers/api/home/homeController");
const { auth } = require("../../middlewares/auth");

const homeRouter = Router.Router();
homeRouter;
homeRouter.get("", HomeController.showAllHouse);
homeRouter.get("/get-house-by-user", auth, HomeController.getHouseByUser);
homeRouter.get("/detail/:id", auth, HomeController.getHouseById);
homeRouter.get("/top", HomeController.showTop5House);
homeRouter.post("", auth, HomeController.addHome);
homeRouter.post("/find", HomeController.filterHome);
homeRouter.get("/:id", HomeController.showDetail);
homeRouter.put("/:id", auth, HomeController.updateHome);
homeRouter.put("/:id", auth, HomeController.updateStatus);
homeRouter.delete("/:id", auth, HomeController.deleteHome);

module.exports = homeRouter;
