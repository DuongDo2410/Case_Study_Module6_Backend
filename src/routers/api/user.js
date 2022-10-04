const { Router } = require("express");
const express = require("express");
const userController = require("../../controllers/userController");
const { auth } = require("../../middlewares/auth");
// const router = express.Router();
const authRouter = Router();
authRouter.post("/register", userController.register);

authRouter.post("/login", userController.login);

authRouter.get("/profile", auth, userController.getUserProfile);

authRouter.put("/updateProfile/:id", userController.updateUserProfile);
authRouter.post("/changePassword", auth, userController.changePassword);

module.exports = authRouter;
