const express = require("express");
const userRouter = require("./api/user");
const homeRouter = require("./api/homeRouter");
const router = express.Router();

router.use("/auth", userRouter);
router.use("/homes", homeRouter);
// routes.use('/city', cityRouter)
// routes.use('/district', districtRouter)
module.exports = router;
