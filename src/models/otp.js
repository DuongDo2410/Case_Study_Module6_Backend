const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    email: String,
    otp: String,
    time: {
        type: Date,
        default: Date.now,
        index: {expires: 2000}
    }
});

module.exports = mongoose.model("otp", otpSchema);
