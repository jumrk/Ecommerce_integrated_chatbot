const BlogCategory = require('../../model/BlogCategory');

// Get all categories
const getCategories = async (req, res) => {
    try {
        const categories = await BlogCategory.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add category
const addCategory = async (req, res) => {
    const { name, description } = req.body;
    try {
        if (name === '' && description === '') {
            res.status(404).json({ success: false, message: "Vui lòng nhập thông tin ❗" });
        }
        const isName = BlogCategory.findOne({ name })
        if (!isName) {
            res.status(404).json({ success: false, message: "Danh mục đã tồn tại ❗" });
        }
        const newCategory = new BlogCategory({ name, description });

        await newCategory.save();
        res.status(201).json({ success: true, message: "Thêm mới danh mục thành công ✅", newCategory });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update category
const updateCategory = async (req, res) => {
    const id = req.params.id;
    const { name, description } = req.body;
    try {
        if (name === '' || description === '') {
            res.status(404).json({ success: false, message: "Vui lòng nhập thông tin ❗" });
        }
        const updatedCategory = await BlogCategory.findByIdAndUpdate(id, { name, description, updatedAt: Date.now() }, { new: true });
        res.json({ success: true, message: "Cập nhật danh mục thành công ✅", updatedCategory });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete category
const deleteCategory = async (req, res) => {
    const id = req.params.id;
    try {
        await BlogCategory.findByIdAndDelete(id);
        res.json({ success: true, message: 'Xóa danh mục thành công ✅' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getCategories, addCategory, updateCategory, deleteCategory }