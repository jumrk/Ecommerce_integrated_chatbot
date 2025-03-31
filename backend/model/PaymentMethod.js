const mongoose = require('mongoose');

const PaymentMethodSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        fee: {
            type: Number,
            default: 0
        },
        isActive: {
            type: Boolean,
            default: true
        },
        gateway: {
            type: String,
            required: true,
            enum: ['COD', 'VNPAY', 'PAYPAL', 'MOMO']
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('PaymentMethod', PaymentMethodSchema);