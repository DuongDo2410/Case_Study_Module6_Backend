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
        // required: true,
    },
    phoneNumber: {
        type: String,
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
    },
    idGoogle:String,

    role:{
        type: String,
        // required: true
        default: "user"
    }

})
module.exports = mongoose.model('user', userSchema)