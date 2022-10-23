const Router = require("express");
const BookingController = require("../../../controllers/api/home/booking");
const { auth } = require("../../../middlewares/auth");

const bookingRouter = Router.Router();
bookingRouter.use(auth);
bookingRouter.get("", BookingController.getBooking);
bookingRouter.get("/historyRenter", BookingController.historyBookingRenter);
bookingRouter.get("/booking-pending", BookingController.bookingPending);
bookingRouter.get(
  "/booking-pending-renter",
  BookingController.getbookingPendingRenter
);
bookingRouter.get(
  "/booking-accept-renter",
  BookingController.getbookingAcceptRenter
);
bookingRouter.get("/booking-accept", BookingController.bookingAcceptOwner);
bookingRouter.get("/booking-success", BookingController.getBookingSuccessOwner);
bookingRouter.get("/booking-by-home/:id", BookingController.getBookingByIdHome);
bookingRouter.post("", BookingController.booking);
bookingRouter.post("/cancel/:id", BookingController.cancelBooking);
bookingRouter.post("/accept/:id", BookingController.acceptBooking);
bookingRouter.post("/success/:id", BookingController.bookingSuccess);

module.exports = bookingRouter;
