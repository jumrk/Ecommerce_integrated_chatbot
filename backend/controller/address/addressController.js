const Address = require("../../model/addressModel");

// Lấy danh sách địa chỉ của người dùng
const getAddresses = async (req, res) => {
    try {
        const addresses = await Address.find({ userId: req.user.userId });
        res.status(200).json({ success: true, data: addresses });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi máy chủ ❌", error: error.message });
    }
};

// Lấy chi tiết một địa chỉ
const getAddressById = async (req, res) => {
    try {
        const address = await Address.findById(req.params.id);
        if (!address) {
            return res.status(404).json({ success: false, message: "Không tìm thấy địa chỉ ❌" });
        }
        res.status(200).json({ success: true, data: address });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi máy chủ ❌", error: error.message });
    }
};

// Thêm địa chỉ mới
const createAddress = async (req, res) => {
    try {
        const { name, receiver, phone, address, province, district, ward, isDefault } = req.body;

        // Nếu là địa chỉ mặc định, cập nhật các địa chỉ khác thành không mặc định
        if (isDefault) {
            await Address.updateMany({ userId: req.user.userId }, { isDefault: false });
        }

        const newAddress = new Address({
            userId: req.user.userId,
            name,
            receiver,
            phone,
            address,
            province,
            district,
            ward,
            isDefault,
        });

        await newAddress.save();
        res.status(201).json({ success: true, message: "Thêm địa chỉ thành công ✅", data: newAddress });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi máy chủ ❌", error: error.message });
    }
};

// Cập nhật địa chỉ
const updateAddress = async (req, res) => {
    try {
        const { name, receiver, phone, address, province, district, ward, isDefault } = req.body;

        // Nếu là địa chỉ mặc định, cập nhật các địa chỉ khác thành không mặc định
        if (isDefault) {
            await Address.updateMany({ userId: req.user.userId }, { isDefault: false });
        }

        const updatedAddress = await Address.findByIdAndUpdate(
            req.params.id,
            { name, receiver, phone, address, province, district, ward, isDefault },
            { new: true, runValidators: true }
        );

        if (!updatedAddress) {
            return res.status(404).json({ success: false, message: "Không tìm thấy địa chỉ để cập nhật ❌" });
        }

        res.status(200).json({ success: true, message: "Cập nhật địa chỉ thành công ✅", data: updatedAddress });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi máy chủ ❌", error: error.message });
    }
};

// Xóa địa chỉ
const deleteAddress = async (req, res) => {
    try {
        const deletedAddress = await Address.findByIdAndDelete(req.params.id);
        if (!deletedAddress) {
            return res.status(404).json({ success: false, message: "Không tìm thấy địa chỉ để xóa ❌" });
        }
        res.status(200).json({ success: true, message: "Xóa địa chỉ thành công ✅" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi máy chủ ❌", error: error.message });
    }
};

module.exports = {
    getAddresses,
    getAddressById,
    createAddress,
    updateAddress,
    deleteAddress,
};