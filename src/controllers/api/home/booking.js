const moment = require("moment");
const Booking = require("../../../models/booking");
const Day = require("../../../models/day");

const BookingController = {
  booking: async (req, res) => {
    let data = req.body;
    data.startDay = new Date(data.startDay);
    data.endDay = new Date(data.endDay);
    let startDayFormat = moment(data.startDay);
    let endDayFormat = moment(data.endDay);
    let mountDay = endDayFormat.diff(startDayFormat, "days");
    let amountAdd = -1;
    let days = [];
    for (let i = mountDay + 1; i > 0; i--) {
      amountAdd++;
      let day = moment(startDayFormat).add(amountAdd, "days");
      days.push(day);
      let checkDay = await Day.findOne({ day: day });
      if (checkDay) {
        data.check = false;
        return res.status(404).json({
          message: "Date already exists",
        });
      } else {
        data.check = true;
      }
    }
    if (data.check) {
      console.log(days);
      console.log(data);
      days.forEach(async (item) => {
        let houseDay = {
          day: item,
          status: "lease",
          idHome: data.idHome,
        };
        await Day.create(houseDay);
      });
      let booking = await Booking.create(data);
      res.status(200).json({
        message: "Create success",
        booking: booking,
      });
    }
  },
};
module.exports = BookingController;
