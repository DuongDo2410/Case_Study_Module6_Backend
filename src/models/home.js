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
    idImage: [{
        type: Schema.Types.ObjectId,
        ref: 'Image'
    }],
    idDay: [{
        type: Schema.Types.ObjectId,
        ref: 'Day'
    }],
    idCategory: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    idUser: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
})

const Home = mongoose.model('Home', homeSchema);

module.exports = Home;