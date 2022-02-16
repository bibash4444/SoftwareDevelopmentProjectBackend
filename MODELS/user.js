const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
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
        required: true
    },
    password: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        default: null
    },
    usertype: {
        type: String,
        default: 'normal'
    }
})

const user = mongoose.model('user', userSchema)
module.exports = user