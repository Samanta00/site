const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('note', noteSchema)
