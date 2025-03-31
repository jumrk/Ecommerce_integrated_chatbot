const Order = require('../../model/Order');
const Cart = require('../../model/Cart');
const { createPayment } = require('./vnpayController');
const getListOrder = async (req, res) => {

    try {
        const order = await Order.find();
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json(error)
    }
}
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, message: "Đơn hàng không tồn tại ❗" });
        }
        return res.status(200).json(order)
    } catch (error) {
        return res.status(500).json(error)
    }
}


const addOrder = async (req, res) => {
    const userId = req.user.userId;
    const { addressId, shippingMethodId, paymentMethodId, shippingFee, trackingNumber, estimatedDelivery, shipper } = req.body;

    try {
        const cartForUser = await Cart.findOne({ userId });
        if (!cartForUser || cartForUser.items.length === 0) {
            return res.status(404).json({ success: false, message: "Vui lòng thêm sản phẩm vào giỏ hàng ❗" });
        }

        // Tính toán subtotal và total
        const subtotal = cartForUser.items.reduce((total, item) => total + item.price * item.quantity, 0);
        const total = subtotal + shippingFee;

        // Tạo đơn hàng mới với trạng thái ban đầu
        const newOrder = new Order({
            userId,
            addressId,
            items: cartForUser.items,
            shippingMethodId,
            shippingFee,
            paymentMethodId,
            paymentStatus: paymentMethodId === 'vnpay' ? 'pending' : 'cod', // 'pending' nếu VNPAY, 'cod' nếu thanh toán khi nhận hàng
            subtotal,
            total,
            status: 'ordered',
            canCancel: true,
            canRate: false,
            trackingNumber,
            estimatedDelivery,
            shipper,
            timeline: [{
                status: 'ordered',
                time: new Date(),
                text: 'Đơn hàng đã được đặt'
            }]
        });

        const savedOrder = await newOrder.save();
        await Cart.deleteOne({ userId }); // Xóa giỏ hàng sau khi đặt hàng thành công

        if (paymentMethodId === 'vnpay') {
            req.body.amount = total; // Gửi số tiền thanh toán đến VNPAY
            req.body.orderId = savedOrder._id; // Gửi mã đơn hàng để đối chiếu
            return createPayment(req, res); // Chuyển hướng đến trang thanh toán VNPAY
        }

        res.status(201).json({
            success: true,
            message: "Đơn hàng đã được tạo thành công ✅",
            order: savedOrder
        });
    } catch (error) {
        console.error('Lỗi khi tạo đơn hàng:', error);
        res.status(500).json({ success: false, message: 'Lỗi máy chủ ❌', error: error.message });
    }
};



module.exports = { getListOrder, addOrder, getOrderById };

