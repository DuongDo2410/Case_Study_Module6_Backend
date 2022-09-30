const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const districtSchema = new mongoose.Schema({
    name: String,
    cityId: {
        type: Schema.Types.ObjectId,
        ref: 'City',
        required: true
    }
})

const District = mongoose.model('District', districtSchema);

module.exports = District;