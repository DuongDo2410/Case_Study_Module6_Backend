const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const bookingSchema = new mongoose.Schema({
  idOwner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  idRenter: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  idHome: {
    type: Schema.Types.ObjectId,
    ref: "Home",
  },
  startDay: Date,
  endDay: Date,
  status: String,
  totalMoney: String,
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
