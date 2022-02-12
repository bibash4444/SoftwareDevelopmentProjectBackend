require('dotenv').config()
const dbURL = process.env.MONGODBURL
const mongoose = require('mongoose')


connection().catch(err => { console.log(err) })

async function connection() {
    mongoose.connect(dbURL)
}