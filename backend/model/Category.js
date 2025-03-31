const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, require: true },
    image: { type: String, require: true },
    description: { type: String, require: true },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('categories', categorySchema);