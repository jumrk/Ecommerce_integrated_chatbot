const mongoose = require("mongoose");

const ShippingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    type: {
        type: String,
        enum: ["internal", "store_pickup", "cod"], 
        required: true
    },
    shippingFees: [
        {
            region: { type: String },
            fee: { type: Number, min: 0 }
        }
    ],
    codFee: {
        type: Number,
        min: 0,
        default: 0 
    },
    status: {
        type: String,
        enum: ["Hoạt động", "Tạm ngừng", "Ngừng hoạt động"],
        default: "Hoạt động"
    }
});

module.exports = mongoose.model("Shipping", ShippingSchema);
