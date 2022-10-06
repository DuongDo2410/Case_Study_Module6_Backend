const Router = require("express");
const notificationController = require("../../controllers/api/home/Notification");

const notificationRouter = Router.Router();

notificationRouter.get("", notificationController.getAll);


module.exports = notificationRouter;
    