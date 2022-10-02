const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,

    },
    email:{
        type: String,
        // required: true,
    },

    password: {
        type: String,
        required: true,
    },
    resetLink: {
        data: String,
        default:''
    },
    phoneNumber: {
        type: Number,
        // required: true

    },
    address:{
        type: String,
        // required: true,
    },
    avatar:{
        type: String,

    },
    fullName:{
        type: String,
        // required: true
    }

})
module.exports = mongoose.model('user', userSchema)