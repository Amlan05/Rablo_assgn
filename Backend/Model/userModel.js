
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    Name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
})

exports.userModel = mongoose.model('User', userSchema)
//users