const Day = require("../../../models/day");
const moment = require("moment");
const Home = require("../../../models/home");

const DayController = {
  booking: async (req, res) => {
    try {
      // let idHome = req.params.id;
      let arrDay = [];
      let data = req.body;
      let amountAdd = 0;
      let endDay = new Date(data.endDay);
      let startDay = new Date(data.startDay);
      let endDayFormat = moment(endDay);
      let startDayFormat = moment(startDay);
      let mountDay = endDayFormat.diff(startDayFormat, "days");
      let home = await Home.findById(idHome);

      let day1 = {
        day: moment(startDayFormat),
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
      res.status(200).send("successfully");
    } catch (err) {
      console.log(err);
    }
  },

  checkDay: async (data) => {
    try {
      let days = [];
      let amountAdd = -1;
      let endDayFormat = moment(new Date(data.endDay));
      let startDayFormat = moment(new Date(data.startDay));
      let mountDay = endDayFormat.diff(startDayFormat, "days");

      for (let i = mountDay; i > 0; i--) {
        amountAdd++;
        let day = {
          day: new Date(moment(startDayFormat).add(amountAdd, "days")),
        };
        let checkDay = await Day.findOne(day);
        if (checkDay) {
          days.push(checkDay)
        }
      }
      return days;
    } catch (err) {
      console.log(err);
    }
  },

  check: async (data, homes) => {
    try {
      let homeCheck = [];
      let amountAdd = -1;
      let startDayFormat = moment(new Date(data.startDay));
      let endDayFormat = moment(new Date(data.endDay));
      let mountDay = endDayFormat.diff(startDayFormat, "days");

      for (let a = 0; a < homes.length; a++) {
        let oke = true;
        for (let i = mountDay; i >= 0; i--) {
          amountAdd++;
          let day = {
            day: new Date(moment(startDayFormat).add(amountAdd, "days")).toLocaleDateString,
          };
          let days = await Day.find({
            idHome: homes[a]._id
          });
          if (days) {
            for (let j = 0; j < days.length; j++) {
              console.log('day', day.day);
            console.log('days', days[j].day.toLocaleTimeString);
              if (days[j].day.toLocaleDateString === day.day) {
                oke = false
                break;
              }
            };
          }
        };
        if (oke === true) {
          homeCheck.push(homes[a])
        }
      };
      console.log(homeCheck.length);
      return homeCheck;
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = DayController;
