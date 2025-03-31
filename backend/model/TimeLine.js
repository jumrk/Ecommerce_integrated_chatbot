const mongoose = require('mongoose');

const timelineSchema = new mongoose.Schema({
    status: { type: String, required: true },
    time: { type: Date, required: true },
    text: { type: String, required: true }
});

module.exports = timelineSchema;