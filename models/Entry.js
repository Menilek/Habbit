const mongoose = require('mongoose');

const EntrySchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    }
});

module.exports = Entry = mongoose.model('entry', EntrySchema);