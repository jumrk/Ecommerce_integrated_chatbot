const PaymentMethod = require('../../model/PaymentMethod');

// get payment method
const getListPaymentMethod = async (req, res) => {
    try {
        const listPaymentMethod = await PaymentMethod.find();
        if (!listPaymentMethod) {
            res.status(404).json({ success: false, message: "Không có phương thức thanh toán ❗" })
        }
        res.json(listPaymentMethod);
    } catch (error) {
        res.status(500).json(error)
    }
}
const getPaymentMethodById = async (req, res) => {
    const id = req.params.id;
    try {
        const paymentMethod = await PaymentMethod.findById(id);
        if (!paymentMethod) {
            res.status(404).json({ success: false, message: "Phương thức không tồn tại ❗" });
        }
        res.json(paymentMethod)
    } catch (error) {
        res.status(500).json(error)
    }
}

// add payment method
const addPaymentMethod = async (req, res) => {
    try {
        const { name, description, fee, gateway } = req.body;

        // Kiểm tra đầu vào hợp lệ
        if (!name || !gateway) {
            return res.status(400).json({ success: false, message: 'Thiếu thông tin bắt buộc ❗' });
        }

        // Kiểm tra nếu phương thức thanh toán đã tồn tại
        const existingPayment = await PaymentMethod.findOne({ gateway });
        if (existingPayment) {
            return res.status(400).json({ success: false, message: 'Phương thức thanh toán đã tồn tại❗' });
        }

        // Tạo phương thức thanh toán mới
        const newPaymentMethod = new PaymentMethod({
            name,
            description,
            gateway,
        });

        await newPaymentMethod.save();

        res.status(201).json({ success: true, message: 'Thêm phương thức thanh toán thành công ✅', data: newPaymentMethod });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi máy chủ ❌', error: error.message });
    }
};

// Update payment method
const updatePaymentMethod = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, fee, gateway, isActive } = req.body;

        // Kiểm tra nếu id không tồn tại
        if (!id) {
            return res.status(400).json({ success: false, message: 'Thiếu ID phương thức thanh toán ❗' });
        }

        // Tìm phương thức thanh toán theo ID
        const paymentMethod = await PaymentMethod.findById(id);
        if (!paymentMethod) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy phương thức thanh toán ❌' });
        }

        // Cập nhật thông tin
        if (name) paymentMethod.name = name;
        if (description) paymentMethod.description = description;
        if (typeof fee !== 'undefined') paymentMethod.fee = fee;
        if (gateway) paymentMethod.gateway = gateway;
        if (typeof isActive !== 'undefined') paymentMethod.isActive = isActive;

        // Lưu thay đổi vào database
        await paymentMethod.save();

        res.status(200).json({ success: true, message: 'Cập nhật phương thức thanh toán thành công ✅', data: paymentMethod });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi máy chủ ❌', error: error.message });
    }
};

// Delete payment method
const deletePaymentMethod = async (req, res) => {
    try {
        const { id } = req.params; // Lấy ID từ URL

        // Kiểm tra nếu không có ID
        if (!id) {
            return res.status(400).json({ success: false, message: 'Thiếu ID phương thức thanh toán ❗' });
        }

        // Tìm phương thức thanh toán
        const paymentMethod = await PaymentMethod.findById(id);
        if (!paymentMethod) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy phương thức thanh toán ❌' });
        }

        // Xóa phương thức thanh toán
        await PaymentMethod.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: 'Xóa phương thức thanh toán thành công ✅' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi máy chủ ❌', error: error.message });
    }
};

module.exports = { addPaymentMethod, deletePaymentMethod, getListPaymentMethod, getPaymentMethodById, updatePaymentMethod }
