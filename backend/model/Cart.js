const mongoose = require('mongoose');
const Product = require('./Product');

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        size: { type: String, required: true },
        color: { type: String, required: true },
        price: { type: Number, required: true },
    }],
    totalPrice: { type: Number, required: true, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Phương thức tính toán tổng giá trị giỏ hàng
cartSchema.methods.calculateTotalPrice = async function () {
    let total = 0;
    for (const item of this.items) {
        const productInDb = await Product.findById(item.productId);
        if (productInDb) {
            const discountedPrice = productInDb.discount
                ? productInDb.price * (1 - productInDb.discount / 100)
                : productInDb.price;
            total += discountedPrice * item.quantity; 
            item.price = discountedPrice; 
        }
    }
    this.totalPrice = total; 
    return total; 
};

module.exports = mongoose.model('Cart', cartSchema);