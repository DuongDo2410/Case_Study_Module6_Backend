const { Router } = require("express");
const express = require("express");
const userController = require("../../controllers/api/userController");
const passport = require("passport") ;
const { auth } = require("../../middlewares/auth");
// const router = express.Router();
const authRouter = Router();

authRouter.post("/register", userController.register);
authRouter.post("/login", userController.login);
authRouter.post("/loginGoogle",userController.loginWithGoogle);






module.exports = authRouter;
