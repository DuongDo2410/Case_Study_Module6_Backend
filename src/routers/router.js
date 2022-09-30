const express = require("express");
const userRouter = require("./api/user");

const router = express.Router();
router.use("/auth",userRouter)
module.exports = router;