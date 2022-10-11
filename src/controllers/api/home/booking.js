const moment = require("moment");
const Booking = require("../../../models/booking");
const Day = require("../../../models/day");
const Notification = require("../../../models/notification");
const notificationController = require("./Notification");

const BookingController = {
  booking: async (req, res) => {
    try {
      let data = req.body;
      data.idRenter = req.decoded.id;
      data.status = "PENDING";
      data.startDay = new Date(data.startDay);
      data.endDay = new Date(data.endDay);
      let startDayFormat = moment(data.startDay);
      let endDayFormat = moment(data.endDay);
      let mountDay = endDayFormat.diff(startDayFormat, "days");
      let amountAdd = -1;
      for (let i = mountDay + 1; i > 0; i--) {
        amountAdd++;
        let day = moment(startDayFormat).add(amountAdd, "days");
        let checkDay = await Day.findOne({ day: day, idHome: data.idHome });
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
        let booking = await Booking.create(data);
        await notificationController.add(); 
        res.status(200).json({
          message: "Create success",
          booking: booking,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  historyBookingRenter: async (req, res) => {
    try {
      let idRenter = req.decoded.id;
      let bookings = await Booking.find({
        idRenter: idRenter,
        status: "ACCEPTED",
      })
        .populate("idOwner")
        .populate("idRenter")
        .populate("idHome");
      res.status(200).json({
        message: "success",
        bookings: bookings,
      });
    } catch (error) {
      console.log(error);
    }
  },
  bookingPending: async (req, res) => {
    try {
      let idOwner = req.decoded.id;
      let bookings = await Booking.find({
        idOwner: idOwner,
        status: "PENDING",
      }).populate("idHome");
      res.status(200).json({
        message: "success",
        bookings: bookings,
      });
    } catch (error) {
      console.log(error);
    }
  },
  bookingAcceptOwner: async (req, res) => {
    try {
      let idOwner = req.decoded.id;
      let bookings = await Booking.find({
        idOwner: idOwner,
        status: "ACCEPTED",
      }).populate("idHome");
      res.status(200).json({
        message: "success",
        bookings: bookings,
      });
    } catch (error) {
      console.log(error);
    }
  },
  acceptBooking: async (req, res) => {
    try {
      let idBooking = req.params.id;
      let idHome = req.body.idHome;
      let booking = await Booking.findOne({
        _id: idBooking,
      });
      let startDayFormat = moment(booking.startDay);
      let endDayFormat = moment(booking.endDay);
      let mountDay = endDayFormat.diff(startDayFormat, "days");
      let amountAdd = -1;
      let check = {};
      let days = [];
      for (let i = mountDay + 1; i > 0; i--) {
        amountAdd++;
        let day = moment(startDayFormat).add(amountAdd, "days");
        days.push(day);
        let checkDay = await Day.findOne({ day: day, idHome: idHome });
        if (checkDay) {
          check.flag = false;
          return res.status(404).json({
            message: "Accept false.Date already exists!",
          });
        } else {
          check.flag = true;
        }
      }
      if (check.flag) {
        days.forEach(async (day) => {
          let houseDay = {
            day: day,
            status: "LEASE",
            idHome: booking.idHome,
          };
          await Day.create(houseDay);
        });
        booking = await Booking.findByIdAndUpdate(
          { _id: booking._id },
          { status: "ACCEPTED" },
          {
            new: true,
          }
        );
        res.status(200).json({
          message: "Accept success!",
          booking: booking,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  cancelBooking: async (req, res) => {
    try {
      let idRenter = req.decoded.id;
      let idHome = req.params.id;
      let booking = await Booking.findOne({
        idRenter: idRenter,
        idHome: idHome,
      });
      let today = moment(new Date());
      let startDay = moment.utc(booking.startDay);
      let mountDay = startDay.diff(today, "days");
      if (mountDay > 1) {
        booking = await Booking.findByIdAndUpdate(
          { _id: booking._id },
          { status: "CANCELED" },
          {
            new: true,
          }
        );
        res.status(200).json({
          message: "Update success!",
          booking: booking,
        });
      } else {
        res.status(401).json({
          message: "Update false!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  getBookingByWeek: async (id) => {
    try {
      let day = moment().startOf('week').format("YYYY-MM-DD 23:59:59");
      const firstDayWeek = new Date(day);
      const toDay = new Date();
      let bookings = await Booking.find({
        idOwner: id,
        createdAt: { $gt: firstDayWeek, $lte: toDay },
        status: "SUCCESS"
      });
      let totalMoney = bookings.reduce((total, booking) => {
        return total += Math.round(booking.totalMoney);
      }, 0);
      return totalMoney
    } catch (error) {
      console.log(error);
    }
  },
  getBookingByMonth: async (id) => { 
    try {
      let day = moment().startOf('month').format("YYYY-MM-DD 23:59:59");
      const firstDayMonth = new Date(day);
      const toDay = new Date();
      let bookings = await Booking.find({
        idOwner: id,
        createdAt: { $gt: firstDayMonth, $lte: toDay },
        status: "SUCCESS"
      });
      let totalMoney = bookings.reduce((total, booking) => {
        return total += Math.round(booking.totalMoney);
      }, 0);
      console.log(totalMoney);
      return totalMoney
    } catch (error) {
      console.log(error);
    }
  },
  getAll: async (id) => { 
    try {
      let bookings = await Booking.find({
        idOwner: id,
        status: "ACCEPTED"
      });
      return bookings
    } catch (error) {
      console.log(error);
    }
  },
};
module.exports = BookingController;
