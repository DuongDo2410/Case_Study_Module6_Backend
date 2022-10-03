const Home = require("../../../models/home");
const ImageController = require("./imageController");
const DayController = require("./dayController");

const HomeController = {
  addHome: async (req, res) => {
    try {
      const data = req.body;
      console.log("data", data);
      await ImageController.addImage(data);
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
      let homes = await Home.find({});
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
      let checkHome = await Home.findById(idHome);
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
};
module.exports = HomeController;
