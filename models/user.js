const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createDate:{
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('user', userSchema)