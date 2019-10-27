const mongoose = require('mongoose');

const constSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    number: {
        type: String,
        required: true
    }
});

const Contact = mongoose.model('Contact', constSchema);

module.exports = Contact;
