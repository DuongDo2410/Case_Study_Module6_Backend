const Day = require("../../../models/day");
const moment = require("moment");

const DayController = {
  createDay: async (req, res) => {
    try {
      let data = req.body;
      let amountAdd = 0;
      let endDay = new Date(data.endDay);
      let startDay = new Date(data.startDay);
      let endDayFormat = moment(endDay);
      let startDayFormat = moment(startDay);
      let mountDay = endDayFormat.diff(startDayFormat, "days");
      console.log("mountDAY" + mountDay);
      for (let i = mountDay; i > 0; i--) {
        amountAdd++;
        let day = {
          day: moment(startDayFormat).add(amountAdd, "days"),
          idUser: data.idUser,
        };
        await Day.create(day);
      }
      res.status(200).send("successfully");
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = DayController;
