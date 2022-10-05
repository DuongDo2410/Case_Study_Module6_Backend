const Router = require("express");
const BookingController = require("../../../controllers/api/home/booking");
const { auth } = require("../../../middlewares/auth");

const bookingRouter = Router.Router();
bookingRouter.use(auth);
bookingRouter.post("", BookingController.booking);

module.exports = bookingRouter;
