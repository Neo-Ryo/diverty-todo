const mongoose = require('mongoose')

const TagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        default: false,
    },
})

module.exports = mongoose.model('Tag', TagSchema)
