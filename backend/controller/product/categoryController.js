const Category = require('../../model/Category');

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find()
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({ message: "Đã xảy ra lỗi ❎" })
    }
};

const createCategory = async (req, res) => {
    try {
        const { name, image, description } = req.body;
        const category = new Category({ name, image, description });
        const createCategory = await category.save();
        if (!createCategory) {
            return res.status(400).json({ success: false, message: "Tạo danh mục thất bại❌" })
        }
        res.status(201).json({ success: true, message: "Tạo danh mục thành công✅" })
    } catch (error) {
        res.status(400).json({ success: false, message: "Đã xảy ra lỗi ❎" })
    }
};

const updateCategory = async (req, res) => {
    const id = req.params.id;
    const { name, image, description, status } = req.body;
    try {
        const category = await Category.findByIdAndUpdate(id, { name, image, description, status }, { new: true });
        if (!category) {
            return res.status(404).json({ success: false, message: "Danh mục không tồn tại❗" })
        }
        res.status(200).json({ success: true, message: "Cập nhật danh mục thành công✅" })
    } catch (error) {
        res.status(500).json({ success: false, message: "Đã xảy ra lỗi ❎" })
    }
};

const deleteCategory = async (req, res) => {
    const id = req.params.id;
    try {
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ success: false, message: "Danh mục không tồn tại❗" })
        }
        res.status(200).json({ success: true, message: "Xóa danh mục thành công✅" })
    } catch (error) {
        res.status(500).json({ success: false, message: "Đã xảy ra lỗi ❎" })
    }
};

module.exports = { getCategories, createCategory, updateCategory, deleteCategory };