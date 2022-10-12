const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const ratingSchema = new mongoose.Schema({
    idUser: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    idHome: {
        type: Schema.Types.ObjectId,
        ref: 'Home'
    },
    rating:{
        type: Number,
        default: 0,
    }
});

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;
