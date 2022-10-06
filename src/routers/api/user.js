const { Router } = require("express");
const express = require("express");
const userController = require("../../controllers/api/userController");
const passport = require("passport") ;
const { auth } = require("../../middlewares/auth");
// const router = express.Router();
const authRouter = Router();
authRouter.post("/register", userController.register);

authRouter.post("/login", userController.login);

authRouter.get("/profile", auth, userController.getUserProfile);

authRouter.put("/updateProfile/:id", userController.updateUserProfile);
authRouter.post("/changePassword", auth, userController.changePassword);

authRouter.post("/otp", userController.sendOTP);

authRouter.post("/forgetPass", userController.checkOTP);

authRouter.post("/changePassword", userController.changePassword);

authRouter.post("/loginGoogle",userController.loginWithGoogle);






module.exports = authRouter;
