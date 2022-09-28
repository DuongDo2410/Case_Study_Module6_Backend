const {Router}= require ('express');
const express = require("express");
const userController = require("../../controllers/userController");
// const router = express.Router();
const  authRouter = Router()
authRouter.post("/register", userController.register);

authRouter.post("/login", userController.login);

module.exports = authRouter;
