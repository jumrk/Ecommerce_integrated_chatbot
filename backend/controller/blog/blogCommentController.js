const BlogComment = require('../../model/BlogComment');

const createComment = async (req, res) => {
    try {
        const { blogId, content } = req.body;
        const userId = req.user.userId;
        const newComment = new BlogComment({
            userId,
            blogId,
            content
        });
        const savedComment = await newComment.save();
        if (!savedComment) {
            return res.status(400).json({ success: false, message: "Bình luận không thành công ❗" });
        }
        res.status(201).json({ success: true, message: "Đã bình luận ✅", savedComment });
    } catch (error) {
        res.status(500).json({ error });
    }
};

// tât cả các comment của một bài viết
const getCommentsByBlog = async (req, res) => {
    try {
        const { blogId } = req.params.id;

        const comments = await BlogComment.find({ blogId }).populate('userId', 'name');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error });
    }
};

// cập nhật comment
const updateComment = async (req, res) => {
    try {
        const { commentId } = req.params.id;
        const { content } = req.body;

        const updatedComment = await BlogComment.findByIdAndUpdate(
            commentId,
            { content },
            { new: true }
        );

        if (!updatedComment) {
            return res.status(404).json({ success: false, message: 'Không thể sửa bình luật ❎' });
        }

        res.status(200).json({ success: true, message: 'Bình luận đã được sửa ✅', updatedComment });
    } catch (error) {
        res.status(500).json({ error });
    }
};

// Delete a comment
const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params.id;

        const deletedComment = await BlogComment.findByIdAndDelete(commentId);

        if (!deletedComment) {
            return res.status(404).json({ success: false, message: 'Không thể xóa bình luật này ❎' });
        }

        res.status(200).json({ success: true, message: 'Bình luận đã được xóa ✅', deletedComment });
    } catch (error) {
        res.status(500).json({ error });
    }
};

module.exports = {
    createComment,
    getCommentsByBlog,
    updateComment,
    deleteComment
};