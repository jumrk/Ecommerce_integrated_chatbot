const mongoose = require('mongoose');
const Cart = require('../../model/Cart');
const Product = require('../../model/Product');

const addToCart = async (req, res) => {
    const { productId, quantity, size, color } = req.body;
    const userId = req.user.userId;
    const blockSizeColor = `${size}-${color}`;

    // Kiểm tra dữ liệu đầu vào
    if (!productId || !quantity || quantity <= 0 || !size || !color) {
        return res.status(400).json({ success: false, message: 'Dữ liệu đầu vào không hợp lệ ❌' });
    }

    try {
        const objectProductId = new mongoose.Types.ObjectId(productId);
        const product = await Product.findById(objectProductId);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Sản phẩm không tồn tại ❌' });
        }

        // Kiểm tra stock
        const stock = product.stock;
        if (!stock || !(stock instanceof Map)) {
            return res.status(500).json({ success: false, message: 'Lỗi dữ liệu sản phẩm ❌' });
        }

        let isValid = false;
        for (const [key, value] of stock) {
            if (blockSizeColor === key) {
                isValid = true;
                if (value < quantity) {
                    return res.status(400).json({ success: false, message: 'Sản phẩm không còn hàng ❌' });
                }
                break;
            }
        }

        if (!isValid) {
            return res.status(400).json({ success: false, message: 'Sản phẩm không tồn tại size và màu ❌' });
        }

        // Tìm hoặc tạo giỏ hàng
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [], totalPrice: 0 });
        }

        // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng chưa
        const itemIndex = cart.items.findIndex(item =>
            item.productId.equals(objectProductId) && item.size === size && item.color === color
        );

        if (itemIndex !== -1) {
            // Nếu sản phẩm đã tồn tại, cập nhật số lượng
            cart.items[itemIndex].quantity += quantity;
        } else {
            // Nếu sản phẩm chưa tồn tại, thêm mới
            cart.items.push({
                productId: objectProductId,
                quantity,
                size,
                color,
                price: product.price
            });
        }

        let totalPrice = 0;
        for (const item of cart.items) {
            const productInDb = await Product.findById(item.productId);
            if (productInDb) {
                totalPrice += productInDb.price * item.quantity;
                item.price = productInDb.price;
            }
        }
        cart.totalPrice = totalPrice;

        // Lưu giỏ hàng
        await cart.save();

        res.status(200).json({ success: true, message: 'Đã thêm sản phẩm vào giỏ hàng ✅', cart });
    } catch (error) {
        console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
        res.status(500).json({ success: false, message: 'Lỗi máy chủ ❌', error: error.message });
    }
};

const getCart = async (req, res) => {
    const userId = req.user.userId;
    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        res.status(200).json({ success: true, cart });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi máy chủ ❌', error: error.message });
    }
}

const updateCart = async (req, res) => {
    const id = req.params.id;
    const quantity = req.body.quantity;
    const userId = req.user.userId;
    try {
        const cart = await Cart.findOne({ userId });
        const cartItem = cart.items.find(item => item._id.equals(id));
        if (!cartItem) {
            return res.status(404).json({ success: false, message: 'Sản phẩm không tồn tại ❌' });
        }
        cartItem.quantity = quantity;
        await cart.save();
        res.status(200).json({ success: true, message: 'Đã cập nhật giỏ hàng ✅', cart });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi máy chủ ❌', error: error.message });
    }
}

const deleteCart = async (req, res) => {
    const id = req.params.id;
    const userId = req.user.userId;
    try {
        const cart = await Cart.findOne({ userId });
        const cartItem = cart.items.find(item => item._id.equals(id));
        if (!cartItem) {
            return res.status(404).json({ success: false, message: 'Sản phẩm không tồn tại ❌' });
        }
        cart.items = cart.items.filter(item => !item._id.equals(id));
        await cart.save();
        res.status(200).json({ success: true, message: 'Đã xóa sản phẩm khỏi giỏ hàng ✅', cart });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi máy chủ ❌', error: error.message });
    }
}


module.exports = { addToCart, getCart, updateCart, deleteCart };
