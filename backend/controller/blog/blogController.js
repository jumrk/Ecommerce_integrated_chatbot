const Blog = require('../../model/Blog');

const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('category');
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getBlogById = async (req, res) => {
    const id = req.params.id;
    try {
        if (!id) {
            res.status(404).json({ success: false, message: "Id không tồn tại❗" })
        }
        const blog = await Blog.findById(id).populate('category');
        if (!blog) {
            res.status(404).json({ success: false, message: "Bài viết không tồn tại❗" })
        }
        res.json(blog)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const addBlog = async (req, res) => {
    const { title, content, images, category, author } = req.body;
    try {
        if (!title || !content || !images || !category || !author) {
            res.status(404).json({ success: false, message: "Vui lòng nhập dữ liệu❗" })
        }
        const isTitle = Blog.findOne({ title });
        if (!isTitle) {
            res.status(404).json({ success: false, message: "Tiêu đề của bài viết đã tồn tại❗" });
        }

        //  Xử lý ảnh
        const imagePaths = req.files ? req.files.map(file => `/images/blog/${file.filename}`) : [];
        const newBlog = new Blog({
            title,
            content,
            images: imagePaths,
            category,
            author,
        });
        await newBlog.save();
        res.status(201).json({ success: true, message: "Thêm bài viết thành công ✅", data: newBlog });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, content, category, author } = req.body;
    try {
        // Kiểm tra xem blog có tồn tại không
        const existingBlog = await Blog.findById(id);
        if (!existingBlog) {
            return res.status(404).json({ success: false, message: "Bài viết không tồn tại❗" });
        }

        // Kiểm tra dữ liệu đầu vào
        if (!title || !content || !category || !author) {
            return res.status(400).json({ success: false, message: "Vui lòng nhập đầy đủ thông tin❗" });
        }

        // Nếu có file ảnh mới được tải lên
        let imagePaths = existingBlog.images; // Giữ ảnh cũ nếu không có ảnh mới
        if (req.files && req.files.length > 0) {
            // Xóa ảnh cũ nếu có
            imagePaths.forEach((image) => {
                const oldImagePath = path.join(__dirname, "../public/images/blog", image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath); // Xóa file ảnh cũ
                }
            });

            // Lưu danh sách ảnh mới
            imagePaths = req.files.map((file) => file.filename);
        }

        // Cập nhật thông tin blog
        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            { title, content, category, author, images: imagePaths, updatedAt: Date.now() },
            { new: true }
        );

        res.status(200).json({ success: true, message: "Cập nhật bài viết thành công✅", data: updatedBlog });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi server❗", error: error.message });
    }
};

const browse_Article = async (req, res) => {
    const id = req.params.id;
    try {
        const blogUpdate = await Blog.findByIdAndUpdate(id, { status: "Đã duyệt" }, { new: true });
        if (!blogUpdate) {
            return res.status(404).json({ success: false, message: "Bài viết không tồn tại❗" });
        }
        res.json({ success: true, message: "Duyệt bài viết thành công✅", blogUpdate });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const rejectArticle = async (req, res) => {
    const id = req.params.id;
    try {
        const blogUpdate = await Blog.findByIdAndUpdate(id, { status: "Đã từ chối" }, { new: true });
        if (!blogUpdate) {
            return res.status(404).json({ success: false, message: "Bài viết không tồn tại❗" });
        }
        res.json({ success: true, message: "Từ chối bài viết thành công✅", blogUpdate });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteBlog = async (req, res) => {
    const id = req.params.id;
    try {
        if (!id) {
            res.status(404).json({ success: false, message: "Id không tồn tại❗" })
        }

        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) {
            res.status(404).json({ success: false, message: "Bài viết không tồn tại❗" })
        }
        res.json({ success: true, message: "Xóa bài viết thành công✅" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addBlog, getBlogById, deleteBlog, updateBlog, getBlogs, browse_Article, rejectArticle };
