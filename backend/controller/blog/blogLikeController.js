const BlogLike = require('../../model/BlogLike');
const Blog = require('../../model/Blog')
// Kiểm tra xem một người dùng đã thích một blog chưa
const checkBlogLike = async (req, res, next) => {
    const blogId = req.params.id;
    const userId = req.user.userId;
    try {
        const isLike = await BlogLike.findOne({ userId, blogId });
        if (!isLike) {
            return res.json({ success: false });
        }
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi khi kiểm tra lượt thích của blog ❗', error: error.message });
    }
};

// Tạo một lượt thích mới cho blog
const createBlogLike = async (req, res) => {
    const blogId = req.params.id;
    const userId = req.user.userId;

    try {
        // Kiểm tra dữ liệu đầu vào
        if (!blogId || !userId) {
            return res.status(400).json({
                success: false,
                message: 'Thiếu blogId hoặc userId ❗'
            });
        }

        // Kiểm tra xem blog có tồn tại không
        const blogExists = await Blog.findById(blogId);
        if (!blogExists) {
            return res.status(404).json({
                success: false,
                message: 'Bài blog không tồn tại ❗'
            });
        }

        // Kiểm tra nếu lượt thích đã tồn tại
        const existingLike = await BlogLike.findOne({ userId, blogId });
        if (existingLike) {
            // Xóa lượt thích nếu đã tồn tại
            await BlogLike.deleteOne({ _id: existingLike._id });
            return res.status(200).json({
                success: true,
                message: 'Đã bỏ thích blog thành công ✅'
            });
        }

        // Tạo lượt thích mới nếu chưa tồn tại
        const newBlogLike = new BlogLike({ userId, blogId });
        await newBlogLike.save();

        res.status(201).json({
            success: true,
            message: 'Thích blog thành công ✅',
            data: newBlogLike
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi khi xử lý lượt thích blog ❗',
            error: error.message
        });
    }
};

// Lấy tổng số lượt thích của một blog cụ thể
const getBlogLikesCount = async (req, res) => {
    try {
        const blogId = req.params.id;
        const likeCount = await BlogLike.countDocuments({ blogId });
        res.status(200).json({ data: likeCount });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    checkBlogLike,
    createBlogLike,
    getBlogLikesCount,
};