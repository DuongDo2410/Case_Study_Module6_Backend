const express = require("express");
const authRouter = require("./api/auth");
const userRouter = require("./api/user");
const homeRouter = require("./api/homeRouter");
const dayRouter = require("./api/day");
const bookingRouter = require("./api/booking");
const router = express.Router();

router.use("/auth", authRouter); 
router.use("/user", userRouter);
router.use("/homes", homeRouter);
// router.use("/day", dayRouter);
router.use("/booking", bookingRouter);
// routes.use('/city', cityRouter)
// routes.use('/district', districtRouter)
module.exports = router;
