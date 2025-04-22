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
        const image = req.file && req.file.filename ? `/images/category/${req.file.filename}` : undefined;
        const data = {
            ...req.body,
            image
        };

        const category = new Category(data);
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
    try {
        console.log('File nhận được:', req.file); // Log thông tin tệp
        console.log('Body nhận được:', req.body); // Log thông tin các trường khác

        const image = req.file ? `/images/category/${req.file.filename}` : undefined;

        const updatedData = {
            ...req.body,
            ...(image && { image }), // Chỉ thêm trường image nếu có ảnh mới
        };

        const category = await Category.findByIdAndUpdate(id, updatedData, { new: true });
        if (!category) {
            return res.status(404).json({ success: false, message: 'Danh mục không tồn tại!' });
        }
        res.status(200).json(category);
    } catch (error) {
        console.error('Lỗi khi cập nhật danh mục:', error); // Log lỗi chi tiết
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi cập nhật danh mục!', error });
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