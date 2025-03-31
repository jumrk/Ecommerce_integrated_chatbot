const mongoose = require('mongoose');

const shipperSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    avatar: { type: String },
    email: { type: String, required: true },
    region: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
});

module.exports = mongoose.model("shipper", shipperSchema);