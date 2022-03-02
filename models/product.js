const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    createDate:{
        type: Date,
        required: true,
        default: Date.now
    }
})
module.exports = mongoose.model('product', productSchema)