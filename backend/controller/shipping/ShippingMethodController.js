const Shipping = require("../../model/ShippingMethod");

// 🆕 Tạo phương thức giao hàng
const createShipping = async (req, res) => {
    try {
        let { name, description, type, shippingFees, codFee, status } = req.body;

        if (!name || !type) {
            return res.status(400).json({ success: false, message: "Vui lòng cung cấp đầy đủ thông tin ❗" });
        }

        // Nếu là "Nhận tại cửa hàng", đặt phí vận chuyển = 0, phí COD = 0
        if (type === "store_pickup") {
            shippingFees = [];  // Gán lại giá trị hợp lệ
            codFee = 0;
        }

        // Nếu là "Giao hàng COD" và chưa có phí COD, đặt mặc định là 0
        if (type === "cod" && codFee === undefined) {
            codFee = 0;
        }

        const newShipping = new Shipping({ name, description, type, shippingFees, codFee, status });
        await newShipping.save();

        res.status(201).json({ success: true, message: "Tạo phương thức giao hàng thành công ✅", data: newShipping });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi khi tạo phương thức giao hàng ❗", error: error.message });
    }
};
// 📥 Lấy danh sách phương thức giao hàng
const getAllShippings = async (req, res) => {
    try {
        const shippings = await Shipping.find();
        res.status(200).json({ success: true, data: shippings });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi khi lấy danh sách ❗", error: error.message });
    }
};

// 📌 Lấy thông tin chi tiết phương thức giao hàng
const getShippingById = async (req, res) => {
    try {
        const shipping = await Shipping.findById(req.params.id);
        if (!shipping) {
            return res.status(404).json({ success: false, message: "Không tìm thấy phương thức giao hàng ❌" });
        }
        res.status(200).json({ success: true, data: shipping });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi khi lấy thông tin ❗", error: error.message });
    }
};

// 🔄 Cập nhật phương thức giao hàng
const updateShipping = async (req, res) => {
    try {
        const { name, description, type, shippingFees, codFee, status } = req.body;

        if (!name || !type) {
            return res.status(400).json({ success: false, message: "Vui lòng cung cấp đầy đủ thông tin ❗" });
        }

        const updatedShipping = await Shipping.findByIdAndUpdate(
            req.params.id,
            { name, description, type, shippingFees, codFee, status },
            { new: true }
        );

        if (!updatedShipping) {
            return res.status(404).json({ success: false, message: "Không tìm thấy phương thức giao hàng ❌" });
        }

        res.status(200).json({ success: true, message: "Cập nhật thành công ✅", data: updatedShipping });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi khi cập nhật ❗", error: error.message });
    }
};

// ❌ Xóa phương thức giao hàng
const deleteShipping = async (req, res) => {
    try {
        const shipping = await Shipping.findByIdAndDelete(req.params.id);
        if (!shipping) {
            return res.status(404).json({ success: false, message: "Không tìm thấy phương thức giao hàng ❌" });
        }
        res.status(200).json({ success: true, message: "Xóa thành công ✅" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi khi xóa ❗", error: error.message });
    }
};

module.exports = { createShipping, getAllShippings, getShippingById, updateShipping, deleteShipping };
