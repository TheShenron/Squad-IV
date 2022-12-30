const mongoose = require('mongoose')

mongoose.set('strictQuery', true)
const connect = mongoose.connect(process.env.MONGO_URI)

module.exports = { connect }