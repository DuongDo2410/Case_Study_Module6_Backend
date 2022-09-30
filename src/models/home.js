const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const homeSchema = new mongoose.Schema({
    name: String,
    typeRoom: String,
    address: String,
    amountBedroom: Number,
    amountBathroom: Number,
    description: String,
    price: Number,
    idImage: [{
        type: Schema.Types.ObjectId,
        ref: 'Image'
    }],
    idCategory: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
})

const Home = mongoose.model('Home', homeSchema);

module.exports = Home;