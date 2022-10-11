const express = require("express");
const userRouter = require("./api/user");
const homeRouter = require("./api/homeRouter");
const dayRouter = require("./api/day");
const bookingRouter = require("./api/booking");
const rating = require("./api/rating");
const router = express.Router();

router.use("/auth", userRouter);
router.use("/homes", homeRouter);
// router.use("/day", dayRouter);
router.use("/booking", bookingRouter);
router.use("/rating", rating);
// routes.use('/city', cityRouter)
// routes.use('/district', districtRouter)
module.exports = router;
