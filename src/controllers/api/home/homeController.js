const Home = require("../../../models/home");
const ImageController = require("./imageController");
const DayController = require("./dayController");
const Day = require("../../../models/day");

const HomeController = {
  addHome: async (req, res) => {
    try {
      const data = req.body;
      console.log("11111", data);
      let idImage = await ImageController.addImage(data);
      data.idImage = idImage;
      let home = await Home.create(data);
      console.log(home);
      res.status(200).json({ home });
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  },
  getAll: async (req, res) => {
    try {
      let homes = await Home.find({}).populate("idImage");
      res.status(200).json(homes);
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  },
  deleteHome: async (req, res) => {
    try {
      let idHome = req.params.id;
      let checkHome = await Home.findById(idHome);
      if (!checkHome) {
        res.status(404).send({ errorMessage: "Home not found!!" });
      } else {
        await Home.deleteOne({
          _id: idHome,
        });
        res.status(200).send({
          message: "Home deleted successfully!!",
        });
      }
    } catch (err) {
      res.status(500).send({
        error: err.message,
      });
    }
  },

  showDetail: async (req, res) => {
    try {
      let idHome = req.params.id;
      let checkHome = await Home.findById(idHome).populate("idImage", "link");
      if (!checkHome) {
        res.status(404).send({ errorMessage: "Home not found!!" });
      } else {
        res.status(200).send({ checkHome });
      }
    } catch (err) {
      res.status(500).send({
        error: err.message,
      });
    }
  },

  updateHome: async (req, res) => {
    try {
      let idHome = req.params.id;
      let data = req.body;
      let checkHome = await Home.findById(idHome);
      if (!checkHome) {
        res.status(404).send({ errorMessage: "Home not found!!" });
      } else {
        await Home.updateMany(
          {
            _id: idHome,
          },
          {
            $set: data,
          }
        );
        let HomeUpdate = await Home.findById(idHome);
        res.status(200).send(HomeUpdate);
      }
    } catch (err) {
      res.status(500).send({
        error: err.message,
      });
    }
  },

  fiterHome: async (req, res) => {
    try {
      let data = req.body;
      console.log(address);
      let Homes = await Home.find({
        address: { $regex: data?.address },
        amountBedroom: data?.amountBedroom,
        amountBathroom: data?.amountBathroom,
        price: { $gt: data?.min, $lt: data?.max },
      });
      res.status(200).send(Homes);
    } catch (err) {
      res.status(500).send({
        error: err.message,
      });
    }
  },
  showAllHouse: async (req, res) => {
    try {
      let homes = await Home.find().populate("idImage", "link");
      res.status(200).json(homes);
    } catch (err) {
      res.status(500).send({
        error: err.message,
      });
    }
  },
  
  showTop5House: async (req, res) => {
    try {
      let top5 = await Home.find().populate('idImage', 'link').sort({view: -1}).limit(5);
      res.status(200).json(top5);
    } catch (err) {
      res.status(500).send({
        error: err.message,
      });
    }
  },

  UpdateStatus: async (req, res) => {
    try {
      console.log(123);
      let idHome = req.params.id;
      let data = req.body;
      let days = await DayController.checkDay(data);
      console.log(days);
      days.forEach(async (day) => {
        await Home.updateOne({ _id: idHome }, { $pull: { idDay: day._id } });
      });
      let newHome = await Home.findById(idHome);
      res.status(200).json(newHome);
    } catch (err) {
      res.status(500).send({
        error: err.message,
      });
    }
  },
};
module.exports = HomeController;
