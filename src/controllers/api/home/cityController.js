const Image = require("../../../models/image");
const City = require("../../../models/city");

const CityController = {
  addCity: async (req, res) => {
    let data = req.body;
    let a = await City.create(data);
    res.status(200).send(a);
  },

  getCity: async (req, res) => {
    try {
      let citys = await City.find();
      res.status(200).send(citys);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
};
module.exports = CityController;
