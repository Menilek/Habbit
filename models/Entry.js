const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EntrySchema = new Schema({
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