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

        // Tìm số lượng sản phẩm trong kho
        let stockQuantity = 0;
        for (const [key, value] of stock) {
            if (blockSizeColor === key) {
                stockQuantity = value;
                break;
            }
        }

        if (stockQuantity === 0) {
            return res.status(400).json({ success: false, message: 'Sản phẩm không tồn tại size và màu ❌' });
        }

        // Tìm giỏ hàng hiện tại
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [], totalPrice: 0 });
        }

        // Tìm sản phẩm trong giỏ hàng
        const itemIndex = cart.items.findIndex(item =>
            item.productId.equals(objectProductId) && item.size === size && item.color === color
        );

        // Tính tổng số lượng sẽ có trong giỏ hàng
        let totalQuantity = quantity;
        if (itemIndex !== -1) {
            totalQuantity += cart.items[itemIndex].quantity;
        }

        // Kiểm tra xem tổng số lượng có vượt quá số lượng trong kho không
        if (totalQuantity > stockQuantity) {
            return res.json({
                success: false,
                message: `Số lượng sản phẩm vượt quá số lượng trong kho. Số lượng còn lại: ${stockQuantity} ❌`
            });
        }

        if (itemIndex !== -1) {
            // Nếu sản phẩm đã tồn tại, cập nhật số lượng
            cart.items[itemIndex].quantity = totalQuantity;
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

        // Tính toán tổng giá trị giỏ hàng
        await cart.calculateTotalPrice();

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
            return res.json({ success: false, message: 'Sản phẩm không tồn tại trong giỏ hàng ❌' });
        }

        // Kiểm tra kho sản phẩm theo size và màu
        const product = await Product.findById(cartItem.productId);
        if (!product) {
            return res.json({ success: false, message: 'Sản phẩm không tồn tại ❌' });
        }

        const stock = product.stock;
        const blockSizeColor = `${cartItem.size}-${cartItem.color}`; // Sự kết hợp của size và màu

        // Kiểm tra kho
        if (!stock || !(stock instanceof Map)) {
            return res.json({ success: false, message: 'Lỗi dữ liệu sản phẩm ❌' });
        }

        let isValid = false;
        for (const [key, value] of stock) {
            if (blockSizeColor === key) {
                isValid = true;
                if (value < quantity) {
                    return res.json({ success: false, message: 'Sản phẩm không còn đủ hàng ❌' });
                }
                break;
            }
        }

        if (!isValid) {
            return res.json({ success: false, message: 'Không tìm thấy sản phẩm với size và màu đã chọn ❌' });
        }

        cartItem.quantity = quantity;

        await cart.calculateTotalPrice();

        await cart.save();

        res.status(200).json({ success: true, message: 'Giỏ hàng đã được cập nhật ✅', cart });
    } catch (error) {
        console.error('Lỗi khi cập nhật giỏ hàng:', error);
        res.status(500).json({ success: false, message: 'Lỗi máy chủ ❌', error: error.message });
    }
};


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
