const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    addressId: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            size: { type: String, required: true },
            color: { type: String, required: true }
        }
    ],
    shippingMethodId: { type: mongoose.Schema.Types.ObjectId, ref: 'shippingMethod', required: true },
    shippingFee: { type: Number, required: true },
    paymentMethodId: { type: mongoose.Schema.Types.ObjectId, ref: 'paymentMethod', required: true },
    paymentStatus: { type: String, required: true },
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    status: { type: String, enum: ['ordered', 'confirmed', 'delivering', 'completed', 'cancelled'], required: true },
    canCancel: { type: Boolean, default: true },
    canRate: { type: Boolean, default: false },
    trackingNumber: { type: String, required: true },
    estimatedDelivery: { type: Date, required: true },
    shipper: { type: mongoose.Schema.Types.ObjectId, ref: 'shipper', required: true },
    timeline: [
        {
            status: { type: String, required: true },
            time: { type: Date, required: true },
            text: { type: String, required: true }
        }
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
