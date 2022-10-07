const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const notificationSchema = new mongoose.Schema({
    idSender: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    idReceiver: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "unRead"
    }
})

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;