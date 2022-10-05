const Day = require("../../../models/day");
const moment = require("moment");
const Home = require("../../../models/home");
const { check } = require("express-validator");

const DayController = {
  createDay: async (data) => {
    try {
      let arrDay = [];
      let data = req.body;
      let amountAdd = 0;
      let endDay = new Date(data.endDay);
      let startDay = new Date(data.startDay);
      let endDayFormat = moment(endDay);
      let startDayFormat = moment(startDay);
      let mountDay = endDayFormat.diff(startDayFormat, "days");

      let day1 = {
        day: moment(startDayFormat)
      };
      let createDay = await Day.create(day1);
      arrDay.push(createDay);
      
      for (let i = mountDay; i > 0; i--) {
        amountAdd++;
        let days = {
          day: moment(startDayFormat).add(amountAdd, "days"),
        };
        let createDay1 = await Day.create(days);
        arrDay.push(createDay1);

      }
      return arrDay;
    } catch (err) {
      console.log(err);
    }
  },

  updateStatus: async (data) => {
    try {
      let days = [];
      let amountAdd = 0;
      let endDay = new Date(data.endDay);
      let startDay = new Date(data.startDay);
      let endDayFormat = moment(endDay);
      let startDayFormat = moment(startDay);
      let mountDay = endDayFormat.diff(startDayFormat, "days");

      let day1 = {
        day: moment(startDayFormat)
      };
      let checkDay = await Day.findOne(day1);
      if (checkDay) {
        checkDay.updateOne({status: data.status})
      }

      for (let i = mountDay; i > 0; i--) {
        amountAdd++;
        let day = {
          day: moment(startDayFormat).add(amountAdd, "days"),
        };
        let checkDay = await Day.findOne(day)
        if (checkDay) {
          checkDay.updateOne({status: data.status})
        }
      }
      return days
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = DayController;
