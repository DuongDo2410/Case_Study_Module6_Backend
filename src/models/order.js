const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const orderSchema = new mongoose.Schema({
    idHost: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    idRenter: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    idHome: {
        type: Schema.Types.ObjectId,
        ref: 'Home'
    },
    startDay: Date,
    endDay: Date,
})

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;