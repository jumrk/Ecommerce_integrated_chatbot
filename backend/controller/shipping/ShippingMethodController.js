const ShippingConfig = require('../../model/ShippingMethod');

exports.getShippingConfig = async (req, res) => {
    try {
        const config = await ShippingConfig.findOne();
        if (!config) {
            return res.status(404).json({ message: 'Không tìm thấy cấu hình' });
        }
        res.json(config);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

exports.createShippingConfig = async (req, res) => {
    try {
        const existingConfig = await ShippingConfig.findOne();
        if (existingConfig) {
            return res.status(400).json({ message: 'Cấu hình đã tồn tại' });
        }
        const config = new ShippingConfig(req.body);
        await config.save();
        res.status(201).json(config);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tạo cấu hình', error: error.message });
    }
};

exports.updateShippingConfig = async (req, res) => {
    try {
        const config = await ShippingConfig.findOneAndUpdate(
            {},
            req.body,
            { new: true, upsert: true }
        );
        res.json(config);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi cập nhật cấu hình', error: error.message });
    }
};

exports.deleteShippingConfig = async (req, res) => {
    try {
        await ShippingConfig.deleteOne({});
        res.json({ message: 'Xóa cấu hình thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa cấu hình', error: error.message });
    }
};