const mongoose = require('mongoose');

const shippingMethodSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    enabled: { type: Boolean, default: true },
    description: { type: String }
});

const shippingConfigSchema = new mongoose.Schema({
    methods: [shippingMethodSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('ShippingConfig', shippingConfigSchema);