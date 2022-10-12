const Router = require("express");
const ratingController = require("../../controllers/api/home/ratingController");
const { auth } = require("../../middlewares/auth");

const rating = Router.Router();


rating.post("", auth, ratingController.ratingHome);

module.exports = rating;
