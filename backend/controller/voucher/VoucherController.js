const Voucher = require('../../model/Voucher');

// Tạo mới một voucher
const createVoucher = async (req, res) => {
    try {
        const { code, type, value, minSpend, maxDiscount, startDate, endDate, usageLimit, description } = req.body;

        // Kiểm tra các trường bắt buộc
        if (!code || !type || !value || !startDate || !endDate) {
            return res.status(400).json({ success: false, message: "Vui lòng cung cấp đầy đủ thông tin bắt buộc ❗" });
        }

        // Kiểm tra loại voucher
        if (type !== 'percentage' && type !== 'fixed') {
            return res.status(400).json({ success: false, message: "Loại voucher không hợp lệ ❗" });
        }

        // Kiểm tra giá trị voucher
        if (type === 'percentage') {
            if (value <= 0 || value > 100) {
                return res.status(400).json({ success: false, message: "Giá trị voucher dạng phần trăm phải nằm trong khoảng từ 1 đến 100 ❗" });
            }
        } else if (value <= 0) {
            return res.status(400).json({ success: false, message: "Giá trị voucher phải lớn hơn 0 ❗" });
        }

        // Kiểm tra ngày bắt đầu và ngày kết thúc
        if (new Date(startDate) >= new Date(endDate)) {
            return res.status(400).json({ success: false, message: "Ngày bắt đầu phải trước ngày kết thúc ❗" });
        }

        // Kiểm tra usageLimit nếu có
        if (usageLimit && usageLimit <= 0) {
            return res.status(400).json({ success: false, message: "Giới hạn sử dụng phải lớn hơn 0 ❗" });
        }

        // Tạo voucher với dữ liệu hợp lệ
        const newVoucher = new Voucher({
            code,
            type,
            value,
            minSpend,
            maxDiscount: type === 'percentage' ? maxDiscount : undefined,
            startDate,
            endDate,
            usageLimit,
            description
        });

        await newVoucher.save();
        res.status(201).json({ success: true, message: "Tạo voucher thành công ✅", data: newVoucher });
    } catch (error) {
        res.status(400).json({ success: false, message: "Lỗi khi tạo voucher ❗", error: error.message });
    }
};


// Lấy tất cả các voucher
const getAllVouchers = async (req, res) => {
    try {
        console.log("🔄 Starting getAllVouchers...");

        // Lấy danh sách voucher
        const vouchers = await Voucher.find();
        console.log("📦 Found vouchers:", vouchers.length);

        // Cập nhật trạng thái cho từng voucher
        for (const voucher of vouchers) {
            console.log(`\n🔄 Processing voucher: ${voucher.code}`);
            const currentDate = new Date();
            const startDate = new Date(voucher.startDate);
            const endDate = new Date(voucher.endDate);

            console.log("📅 Current date:", currentDate);
            console.log("📅 Start date:", startDate);
            console.log("📅 End date:", endDate);
            console.log("📊 Usage count:", voucher.usageCount, "/", voucher.usageLimit);

            let newStatus = 'Đang diễn ra';
            if (voucher.usageCount >= voucher.usageLimit) {
                newStatus = 'Đã hủy';
            } else if (currentDate < startDate) {
                newStatus = 'Chưa bắt đầu';
            } else if (currentDate > endDate) {
                newStatus = 'Đã kết thúc';
            }

            console.log("🔄 New status:", newStatus);

            if (voucher.status !== newStatus) {
                console.log("📝 Status changed, updating...");
                await Voucher.findByIdAndUpdate(
                    voucher._id,
                    { status: newStatus },
                    { new: true }
                );
                console.log("✅ Updated voucher status");
            }
        }

        // Lấy lại danh sách voucher đã được cập nhật
        const updatedVouchers = await Voucher.find();
        console.log("✅ Final vouchers count:", updatedVouchers.length);

        res.status(200).json(updatedVouchers);
    } catch (error) {
        console.error("❌ Error in getAllVouchers:", error);
        res.status(500).json({ message: error.message });
    }
};


// Lấy một voucher theo ID
const getVoucherById = async (req, res) => {
    try {
        const voucher = await Voucher.findById(req.params.id);
        if (!voucher) {
            return res.status(404).json({ message: 'Không tìm thấy voucher' });
        }
        res.status(200).json(voucher);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cập nhật một voucher theo ID
const updateVoucher = async (req, res) => {
    try {
        const { _id, code, type, value, startDate, endDate, usageLimit } = req.body;

        // Kiểm tra các trường bắt buộc
        if (code === '' || type === '' || value === '' || startDate === '' || endDate === '') {
            return res.status(400).json({ success: false, message: "Vui lòng cung cấp đầy đủ thông tin bắt buộc ❗" });
        }

        // Kiểm tra loại voucher
        if (type && type !== 'percentage' && type !== 'fixed') {
            return res.status(400).json({ success: false, message: "Loại voucher không hợp lệ ❗" });
        }

        // Kiểm tra giá trị voucher
        if (type === 'percentage') {
            if (value <= 0 || value > 100) {
                return res.status(400).json({ success: false, message: "Giá trị voucher dạng phần trăm phải nằm trong khoảng từ 1 đến 100 ❗" });
            }
        } else if (type === 'fixed' && value <= 0) {
            return res.status(400).json({ success: false, message: "Giá trị voucher phải lớn hơn 0 ❗" });
        }

        // Kiểm tra ngày bắt đầu và ngày kết thúc
        if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
            return res.status(400).json({ success: false, message: "Ngày bắt đầu phải trước ngày kết thúc ❗" });
        }

        // Kiểm tra usageLimit nếu có
        if (usageLimit && usageLimit <= 0) {
            return res.status(400).json({ success: false, message: "Giới hạn sử dụng phải lớn hơn 0 ❗" });
        }

        // Cập nhật voucher với dữ liệu hợp lệ
        const voucher = await Voucher.findByIdAndUpdate(_id, req.body, {
            new: true,
            runValidators: true
        });

        if (!voucher) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy voucher' });
        }

        res.status(200).json({ success: true, message: "Cập nhật voucher thành công ✅", data: voucher });
    } catch (error) {
        res.status(400).json({ success: false, message: "Lỗi khi cập nhật voucher ❗", error: error.message });
    }
};

// Xóa một voucher theo ID
const deleteVoucher = async (req, res) => {
    try {
        const voucher = await Voucher.findByIdAndDelete(req.params.id);
        if (!voucher) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy voucher ❗' });
        }
        res.status(200).json({ success: true, message: 'Xóa voucher thành công ✅' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createVoucher,
    getAllVouchers,
    getVoucherById,
    updateVoucher,
    deleteVoucher
};