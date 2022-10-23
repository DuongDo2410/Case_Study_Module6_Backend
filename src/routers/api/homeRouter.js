const Router = require("express");
const HomeController = require("../../controllers/api/home/homeController");
const { auth } = require("../../middlewares/auth");

const homeRouter = Router.Router();
homeRouter.get("", HomeController.getAll);
homeRouter.get("/get-house-by-user", auth, HomeController.getHouseByUser);
homeRouter.get("/top", HomeController.showTop5House);
homeRouter.post("/comments/:id", HomeController.updateComment);
homeRouter.post("", auth, HomeController.addHome);
homeRouter.post("/find", HomeController.filterHome);
homeRouter.get("/detail/:id", auth, HomeController.getHouseById);
homeRouter.get("/:id", HomeController.showDetail);
homeRouter.put("/:id", HomeController.updateHome);
homeRouter.put("/:id", auth, HomeController.updateStatus);
homeRouter.delete("/:id", auth, HomeController.deleteHome);

module.exports = homeRouter;
