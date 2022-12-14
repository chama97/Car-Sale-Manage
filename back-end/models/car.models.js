const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
   
    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    },
})

module.exports = mongoose.model('car', carSchema) 