const Home = require("../../../models/home");
const ImageController = require("./imageController");
const DayController = require("./dayController");
const Day = require("../../../models/day");

const HomeController = {
  addHome: async (req, res) => {
    try {
      const data = req.body;
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
            // let page = req.params.page
            // console.log(page);
            let fullHomes = await Home.find({}).populate("idImage");
            // const totalPage = Math.round(fullHomes.length/9);
            // let homes = await Home.find({}).populate("idImage").limit(9).skip(page*9);
            res.status(200).json({
                success: true,
                homes: fullHomes
            });
        } catch (err) {
            res.status(500).json({
                error: err.message,
            });
        }
    },
  deleteHome: async (req, res) => {
    try {
      let idHome = req.params.id;
      let checkHome = await Home.findById(idHome).populate("idImage");
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

    updateComment: async (req, res) => {
        try {
            let id = req.params.id;
            // console.log(req.body.comment)
            const home = await Home.findById(id).populate("idImage");
            home.comment.unshift(req.body.comment)
            await home.save();
            res.status(200).json(home);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    showDetail: async (req, res) => {
        try {
            let idHome = req.params.id;
            let checkHome = await Home.findById(idHome).populate("idImage", "link");
            if (!checkHome) {
                res.status(404).send({errorMessage: "Home not found!!"});
            } else {
                res.status(200).send({checkHome});
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
                res.status(404).send({errorMessage: "Home not found!!"});
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

  filterHome: async (req, res) => {
    try {
      let data = req.body;
      let homes = await Home.find({
        address: { $regex: data?.address || "" },
        amountBedroom: data?.amountBedroom || { $gt: (data.amountBedroom = 0) },
        amountBathroom: data?.amountBathroom || {
          $gt: (data.amountBathroom = 0),
        },
        price: { $gt: data?.min || 0, $lt: data?.max || 1000000000 },
      }).populate("idImage");

      if (data.startDay && data.endDay) {
        let homes1 = await DayController.check(data, homes);
        console.log(homes1);
      }
      res.status(200).send(homes);
    } catch (err) {
      res.status(500).send({
        error: err.message,
      });
    }
  },

    showTop5House: async (req, res) => {
        try {
            let top5 = await Home.find()
                .populate("idImage", "link")
                .sort({view: -1})
                .limit(5);
            res.status(200).json(top5);
        } catch (err) {
            res.status(500).send({
                error: err.message,
            });
        }
    },

    updateStatus: async (req, res) => {
        try {
            console.log(123);
            let idHome = req.params.id;
            let data = req.body;
            let days = await DayController.checkDay(data);
            console.log(days);
            days.forEach(async (day) => {
                await Home.updateOne({_id: idHome}, {$pull: {idDay: day._id}});
            });
            let newHome = await Home.findById(idHome);
            res.status(200).json(newHome);
        } catch (err) {
            res.status(500).send({
                error: err.message,
            });
        }
    },

    calculatePage: async (data) => {
      let fullHome = await Home.find({
        address: { $regex: data?.address || "" },
        amountBedroom: data?.amountBedroom || { $gt: (data.amountBedroom = 0) },
        amountBathroom: data?.amountBathroom || {
          $gt: (data.amountBathroom = 0),
        },
        price: { $gt: data?.min || 0, $lt: data?.max || 10000000000 },
      }).populate("idImage");
      const totalPage = Math.round(fullHome.length+1/9);
      return totalPage
    }
};
module.exports = HomeController;
