const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const bookingSchema = new mongoose.Schema({
  idOwner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  idRenter: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  idHome: {
    type: Schema.Types.ObjectId,
    ref: "Home",
  },
  startDay: Date,
  endDay: Date,
  status: String,
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;