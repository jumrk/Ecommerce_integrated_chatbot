const Order = require('../../model/Order');
const Cart = require('../../model/Cart');
const Product = require('../../model/Product');
const Voucher = require('../../model/Voucher');
const crypto = require('crypto');
const { createPayment } = require('./vnpayController');

const generateOrderCode = () => {
    return 'ORD-' + crypto.randomBytes(4).toString('hex').toUpperCase() + '-' + Date.now();
};
const getAllOrder = async (req, res) => {
    try {
        const order = await Order.find()
            .sort({ createdAt: -1 })
            .populate('userId')
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json(error)
    }
}
const getOrderByIdForUser = async (req, res) => {
    const userId = req.user.userId;
    try {
        const order = await Order.find({ userId })
            .sort({ createdAt: -1 })
            .populate('shipper', 'name phone email')
            .populate('addressId')
            .populate('userId')
            .populate('items.productId', 'name images price');
        return res.status(200).json(order)
    } catch (error) {
        return res.status(500).json(error)
    }
}
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('userId')
            .populate('addressId')
            .populate('items.productId')
            .populate('shipper');
        if (!order) {
            return res.status(404).json({ success: false, message: "Đơn hàng không tồn tại ❗" });
        }
        return res.status(200).json(order)

    } catch (error) {
        return res.status(500).json(error)
    }
}
const getOrdersByUserId = async (req, res) => {
    try {
        const userId = req.params.id;
        const orders = await Order.find({ userId })
            .sort({ createdAt: -1 })
            .populate('items.productId', 'name images price');

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Lỗi khi lấy danh sách đơn hàng ❌",
            error: error.message
        });
    }
};

const addOrder = async (req, res) => {
    const userId = req.user.userId;
    const { addressId, shippingMethod, discount, idVoucher, finalTotal, note, paymentMethod, shippingFee, shipper } = req.body;

    try {
        const cartForUser = await Cart.findOne({ userId });
        if (idVoucher) {
            const voucher = await Voucher.findByIdAndUpdate(idVoucher, { $inc: { usageCount: 1 } }, { new: true });
            if (!voucher) {
                return res.status(404).json({ success: false, message: "Voucher không tồn tại❗" });
            }
        }
        if (!cartForUser || cartForUser.items.length === 0) {
            return res.status(404).json({ success: false, message: "Vui lòng thêm sản phẩm vào giỏ hàng ❗" });
        }

        // Check stock availability for each item in the order
        for (const item of cartForUser.items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({ success: false, message: "Sản phẩm không tồn tại ❗" });
            }

            const stockKey = `${item.size}-${item.color}`;
            const availableStock = product.stock.get(stockKey)
            if (availableStock < 0 || availableStock == null) {
                return res.json({ success: false, message: "size và màu không tồn tại ❗", stockKey })
            }
            if (item.quantity > availableStock) {
                return res.json({ success: false, message: `Số lượng sản phẩm ${product.name} không đủ ❗` });
            }
        }

        // Create the order
        const orderCode = generateOrderCode();
        const newOrder = new Order({
            userId,
            addressId,
            items: cartForUser.items,
            shippingMethod,
            shippingFee,
            orderCode,
            note,
            paymentMethod,
            paymentStatus: 'Chưa thanh toán',
            subtotal: cartForUser.totalPrice,
            total: finalTotal,
            status: 'ordered',
            canCancel: true,
            canRate: false,
            shipper,
            discount: discount,
            timeline: [{
                status: 'ordered',
                time: new Date(),
                text: 'Đơn hàng đã được đặt'
            }]
        });

        const savedOrder = await newOrder.save();
        await Cart.deleteOne({ userId });

        // Update stock and sold quantity for each product
        for (const item of cartForUser.items) {
            const product = await Product.findById(item.productId);
            const stockKey = `${item.size}-${item.color}`;
            const currentStock = product.stock.get(stockKey) || 0;

            // Update stock
            product.stock.set(stockKey, currentStock - item.quantity);

            // Update total sold quantity
            product.sold = (product.sold || 0) + item.quantity;
            await product.save();
        }

        if (paymentMethod === 'vnpay') {
            req.body.amount = finalTotal;
            req.body.orderId = savedOrder.orderCode;
            return createPayment(req, res);
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

const cancelOrder = async (req, res) => {
    const userId = req.user.userId;
    const orderId = req.params.id;

    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: "Đơn hàng không tồn tại ❗" });
        }
        if (order.userId.toString() !== userId || order.status !== 'ordered' || order.canCancel === false) {
            return res.status(403).json({ success: false, message: "Bạn không có quyền xóa đơn hàng này hoặc đơn hàng không thể hủy ❗" });
        }

        // Update stock for each product
        for (const item of order.items) {
            const product = await Product.findById(item.productId);
            if (product) {
                const stockKey = `${item.size}-${item.color}`;
                const currentStock = product.stock.get(stockKey);
                product.stock.set(stockKey, currentStock + item.quantity);
                await product.save();
            }
        }

        // Update order status and isActive
        order.isActive = false;
        order.status = "cancelled";
        order.canCancel = false;

        order.timeline.push({
            status: 'cancelled',
            time: new Date(),
            text: 'Đơn hàng đã bị hủy'
        });

        await order.save();

        res.status(200).json({ success: true, message: "Đơn hàng đã được hủy thành công ✅" });
    } catch (error) {
        console.error('Lỗi khi cập nhật đơn hàng:', error);
        res.status(500).json({ success: false, message: 'Lỗi máy chủ ❌', error: error.message });
    }
};

const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { status, note } = req.body;

    try {
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ success: false, message: "Đơn hàng không tồn tại ❗" });
        }

        // Check if the order is active
        if (!order.isActive) {
            return res.status(403).json({ success: false, message: "Đơn hàng không thể cập nhật vì đã bị hủy hoặc đã giao ❗" });
        }

        if (status) {
            order.status = status;

            // Define messages for each status
            let statusMessage = '';
            switch (status) {
                case 'confirmed':
                    statusMessage = 'Đơn hàng đã được xác nhận';
                    break;
                case 'delivering':
                    statusMessage = 'Đơn hàng đang được giao';
                    break;
                case 'completed':
                    statusMessage = 'Đơn hàng giao thành công';
                    order.isActive = false;
                    break;
                case 'cancelled':
                    statusMessage = 'Đơn hàng đã bị hủy';
                    order.isActive = false;
                    break;
                default:
                    statusMessage = `Trạng thái đã được cập nhật thành ${status}`;
            }

            // Set canCancel to false if status is not 'ordered'
            if (status !== 'ordered') {
                order.canCancel = false;
            }

            // Add a timeline entry for the status update
            order.timeline.push({
                status: order.status,
                time: new Date(),
                text: statusMessage
            });
        }

        // Update note if provided
        if (note) {
            order.note = note;
            order.timeline.push({
                status: 'note updated',
                time: new Date(),
                text: `Ghi chú đã được cập nhật: ${note}`
            });
        }

        await order.save();
        res.status(200).json({ success: true, message: "Cập nhật đơn hàng thành công ✅", order });
    } catch (error) {
        console.error('Lỗi khi cập nhật đơn hàng:', error);
        res.status(500).json({ success: false, message: 'Lỗi máy chủ ❌', error: error.message });
    }
};

module.exports = {
    cancelOrder,
    getAllOrder,
    addOrder,
    getOrderById,
    getOrdersByUserId,
    getOrderByIdForUser,
    updateOrder
};

