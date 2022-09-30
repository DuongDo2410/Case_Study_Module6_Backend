const {Router}= require ('express');
const express = require("express");
const userController = require("../../controllers/api/userController");
// const router = express.Router();
const  authRouter = Router()
authRouter.post("/register", userController.register);

authRouter.post("/login", userController.login);

authRouter.get("/profile", userController.getUserProfile);

authRouter.put("/updateProfile",userController.updateUserProfile);

module.exports = authRouter;
