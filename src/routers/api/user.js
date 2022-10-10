const { Router } = require("express");
const express = require("express");
const userController = require("../../controllers/api/userController");
const passport = require("passport") ;
const { auth } = require("../../middlewares/auth");
// const router = express.Router();
const userRouter = Router();

userRouter.use(auth);
userRouter.get("/profile", userController.getUserProfile);
userRouter.put("/updateProfile", userController.updateUserProfile);
userRouter.post("/changePassword", userController.changePassword);
userRouter.post("/otp", userController.sendOTP);
userRouter.post("/forgetPass", userController.checkOTP);
userRouter.post("/changePassword", userController.changePassword);
userRouter.post("/getStatistics", userController.getStatistics);

module.exports = userRouter;
