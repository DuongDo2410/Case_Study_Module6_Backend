const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  link: String,
});

module.exports = mongoose.model("Image", imageSchema);
