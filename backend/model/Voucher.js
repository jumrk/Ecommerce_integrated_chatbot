const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['percentage', 'fixed'],
        required: true
    },
    value: {
        type: Number,
        required: true,
        min: 0
    },
    minSpend: {
        type: Number,
        required: true,
        min: 0
    },
    maxDiscount: {
        type: Number,
        validate: {
            validator: function (value) {
                // Nếu là "percentage" mà không có maxDiscount -> Báo lỗi
                if (this.type === 'percentage' && (value === undefined || value <= 0)) {
                    return false;
                }
                // Nếu là "fixed", maxDiscount có thể null hoặc 0
                if (this.type === 'fixed' && value !== undefined) {
                    return false;
                }
                return true;
            },
            message: props =>
                props.instance.type === 'percentage'
                    ? "Voucher dạng phần trăm phải có maxDiscount lớn hơn 0❗"
                    : "Voucher dạng fixed không cần maxDiscount❗"
        }
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    usageLimit: {
        type: Number,
        required: true,
        min: 1
    },
    usageCount: {
        type: Number,
        default: 0,
        min: 0
    },
    status: {
        type: String,
        enum: ['Chưa bắt đầu', 'Đang diễn ra', 'Đã kết thúc', 'Đã hủy'],
        default: 'Chưa bắt đầu'
    },
    description: {
        type: String,
        trim: true
    }
}, { timestamps: true });

const Discount = mongoose.model('Discount', discountSchema);
module.exports = Discount;
