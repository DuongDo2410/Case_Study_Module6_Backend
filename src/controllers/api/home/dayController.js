const Day = require("../../../models/day");
const moment = require("moment");
const Home = require("../../../models/home");

const DayController = {
  booking: async (req, res) => {
    try {
      let idHome = req.params.id
      let data = req.body;
      let amountAdd = 0;
      let endDay = new Date(data.endDay);
      let startDay = new Date(data.startDay);
      let endDayFormat = moment(endDay);
      let startDayFormat = moment(startDay);
      let mountDay = endDayFormat.diff(startDayFormat, "days");
      let home = await Home.findById(idHome); 

      let day1 = {
        day: moment(startDayFormat)
      };
      let checkDay = await Day.findOne(day1);
      if (!checkDay) {
        let createDay = await Day.create(day1);
        await home.updateOne({ $push: { idDay: createDay } })
      } else {
        await home.updateOne({ $push: { idDay: checkDay } })
      }

      
      for (let i = mountDay; i > 0; i--) {
        amountAdd++;
        let days = {
          day: moment(startDayFormat).add(amountAdd, "days"),
        };
        let checkDay = await Day.findOne(days);
        if (!checkDay) {
          let createDay = await Day.create(days);
          await home.updateOne({$push: {idDay: createDay}})
        }else {
          await home.updateOne({$push: {idDay: checkDay}})
        }
      }
      res.status(200).send("successfully");
    } catch (err) {
      console.log(err);
    }
  },

  checkDay: async (data) => {
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
        days.push(checkDay)
      }

      for (let i = mountDay; i > 0; i--) {
        amountAdd++;
        let day = {
          day: moment(startDayFormat).add(amountAdd, "days"),
        };
        let checkDay = await Day.findOne(day)
        if (checkDay) {
          days.push(checkDay);
        }
      }
      return days
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = DayController;
