const mongoose = require('mongoose');
const messageContentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        enum: ['customer', 'support'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isRead: {
        type: Boolean,
        default: false
    }
});

// Schema cho hộp thư
const mailboxSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    messages: [messageContentSchema],
    lastUpdated: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['active', 'archived'],
        default: 'active'
    }
}, {
    timestamps: true
});

// Cập nhật lastUpdated khi có tin nhắn mới
mailboxSchema.pre('save', function (next) {
    this.lastUpdated = new Date();
    next();
});

// Tạo index để tối ưu truy vấn
mailboxSchema.index({ userId: 1 });
mailboxSchema.index({ lastUpdated: -1 });

const Mailbox = mongoose.model('Mailbox', mailboxSchema);
module.exports = Mailbox;