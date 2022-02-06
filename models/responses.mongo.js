const mongoose = require('mongoose');

const responsesSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    response: {
        type: String,
        required: true,
    }
});

// Connects responsesSchema with the "launches" collection
module.exports = mongoose.model('Response', responsesSchema);