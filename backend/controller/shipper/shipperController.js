const Shipper = require('../../model/Shipper');

// Hàm tạo mới shipper
const createShipper = async (req, res) => {
    try {
        const { name, phone, email, province, district } = req.body;

        // Kiểm tra đầu vào
        if (!name || !phone || !email || !province || !district) {
            return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin ❎' });
        }

        // Kiểm tra xem email đã được sử dụng hay chưa
        const emailExists = await Shipper.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ message: 'Email đã được sử dụng ❎' });
        }

        // Kiểm tra xem số điện thoại đã được sử dụng hay chưa
        const phoneExists = await Shipper.findOne({ phone });
        if (phoneExists) {
            return res.status(400).json({ message: 'Số điện thoại đã được sử dụng ❎' });
        }

        const newShipper = new Shipper({ name, phone, email, province, district });
        await newShipper.save();

        res.status(201).json({ message: 'Tạo shipper thành công ✅', newShipper });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server ❗', error });
    }
};

// Hàm lấy danh sách shipper
const getAllShippers = async (req, res) => {
    try {
        const shippers = await Shipper.find();
        res.status(200).json({ message: 'Lấy danh sách shipper thành công ✅', shippers });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server ❗', error });
    }
};

// Hàm lấy thông tin shipper theo ID
const getShipperById = async (req, res) => {
    try {
        const { id } = req.params;

        const shipper = await Shipper.findById(id);
        if (!shipper) {
            return res.status(404).json({ message: 'Không tìm thấy shipper ❎' });
        }

        res.status(200).json({ message: 'Lấy thông tin shipper thành công ✅', shipper });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server ❗', error });
    }
};

// Hàm cập nhật thông tin shipper
const updateShipper = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, phone, avatar, email, region, status } = req.body;

        // Kiểm tra đầu vào
        if (!name || !phone || !email || !region) {
            return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin ❎' });
        }

        // Kiểm tra xem email đã được sử dụng bởi shipper khác hay chưa
        const emailExists = await Shipper.findOne({ email, _id: { $ne: id } });
        if (emailExists) {
            return res.status(400).json({ message: 'Email đã được sử dụng bởi shipper khác ❎' });
        }

        // Kiểm tra xem số điện thoại đã được sử dụng bởi shipper khác hay chưa
        const phoneExists = await Shipper.findOne({ phone, _id: { $ne: id } });
        if (phoneExists) {
            return res.status(400).json({ message: 'Số điện thoại đã được sử dụng bởi shipper khác ❎' });
        }

        const updatedShipper = await Shipper.findByIdAndUpdate(
            id,
            { name, phone, avatar, email, region, status },
            { new: true }
        );

        if (!updatedShipper) {
            return res.status(404).json({ message: 'Không tìm thấy shipper ❎' });
        }

        res.status(200).json({ message: 'Cập nhật shipper thành công ✅', updatedShipper });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server ❗', error });
    }
};

// Hàm xóa shipper
const deleteShipper = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedShipper = await Shipper.findByIdAndDelete(id);
        if (!deletedShipper) {
            return res.status(404).json({ message: 'Không tìm thấy shipper ❎' });
        }

        res.status(200).json({ message: 'Xóa shipper thành công ✅' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server ❗', error });
    }
};

// Xuất các hàm CRUD
module.exports = {
    createShipper,
    getAllShippers,
    getShipperById,
    updateShipper,
    deleteShipper
};
