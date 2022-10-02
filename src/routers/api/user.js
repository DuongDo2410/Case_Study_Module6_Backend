const { Router } = require("express");
const express = require("express");
const userController = require("../../controllers/api/userController");
// const router = express.Router();
const authRouter = Router();
authRouter.post("/register", userController.register);

authRouter.post("/login", userController.login);

authRouter.get("/profile/:id", userController.getUserProfile);

authRouter.put("/updateProfile", userController.updateUserProfile);

authRouter.post("/otp", userController.sendOTP);

authRouter.post("/forgetPass", userController.checkOTP);

authRouter.post("/changePassword", userController.changePassword);



module.exports = authRouter;
