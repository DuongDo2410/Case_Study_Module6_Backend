const mongoose = require('mongoose');
const {Schema} = require("mongoose");


const daySchema = new mongoose.Schema({
    day: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "Đã cho thuê"
    },
    idHome: {
        type: Schema.Types.ObjectId,
        ref: 'Home'
    },
});

const Day = mongoose.model('Day', daySchema);

module.exports = Day;