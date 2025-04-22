const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
        required: true
    },
    images: { type: [String], required: true },
    colors: [
        {
            name: { type: String, required: true },
            value: { type: String, required: true }
        }
    ],
    sizes: { type: [String], required: true },
    description: { type: String, required: true },
    specifications: {
        material: { type: String, required: true },
        style: { type: String, required: true },
        origin: { type: String, required: true },
        washCare: { type: String, required: true }
    },
    stock: { type: Map, of: Number, required: true },
    sold: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    discount: { type: Number, default: 0 }
});

module.exports = mongoose.model('Product', productSchema);