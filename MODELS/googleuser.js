const mongoose = require('mongoose')

const googleuserSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    phonenumber: {
        type: String,
        default: null,
    },
    googleId: {
        type: String,
        required: true
    },

    imageUrl: {
        type: String,
        required: true
    }
})

const googleuser = mongoose.model('googleuser', googleuserSchema)
module.exports = googleuser