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
    idCategory: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    idUser: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    idCity: {
        type: Schema.Types.ObjectId,
        ref: 'City'
    },
    idDistrict: {
        type: Schema.Types.ObjectId,
        ref: 'District'
    },
})

const Home = mongoose.model('Home', homeSchema);

module.exports = Home;