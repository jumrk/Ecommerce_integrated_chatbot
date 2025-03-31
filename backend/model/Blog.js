const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    images: [{ type: String }],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'BlogCategory', required: true },
    author: { type: String, required: true },
    status: {
        type: String,
        enum: ['Chờ duyệt', 'Đã duyệt', 'Đã từ chối'],
        default: 'Chờ duyệt'
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', BlogSchema);
