const Router = require("express");
const BookingController = require("../../../controllers/api/home/booking");
const { auth } = require("../../../middlewares/auth");

const bookingRouter = Router.Router();
bookingRouter.use(auth);
bookingRouter.get("/history-renter", BookingController.historyBookingRenter);
bookingRouter.get("/booking-pending", BookingController.bookingPending);
bookingRouter.post("", BookingController.booking);
bookingRouter.post("/cancel/:id", BookingController.cancelBooking);
bookingRouter.post("/accept/:id", BookingController.acceptBooking);

module.exports = bookingRouter;
