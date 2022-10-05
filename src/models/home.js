const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const homeSchema = new mongoose.Schema({
    name: String,
    typeRoom: String,
    address: String,
    area: Number,
    amountBedroom: Number,
    amountBathroom: Number,
    description: String,
    price: Number,
    view: {
        type: Number,
        required: true,
        default: 0
    },
    idImage: [{
        type: Schema.Types.ObjectId,
        ref: 'Image'
    }],
    idUser: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
})

const Home = mongoose.model("Home", homeSchema);

module.exports = Home;