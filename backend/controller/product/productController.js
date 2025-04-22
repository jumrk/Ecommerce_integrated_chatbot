const Product = require('../../model/Product');

const getProducts = async (req, res) => {
    try {
        // Sử dụng populate để lấy thông tin danh mục
        const products = await Product.find().populate('category');

        const productsWithStatus = products.map(product => {
            const stockObject = Object.fromEntries(product.stock);
            const totalStock = Object.values(stockObject).reduce((total, current) => total + current, 0);
            let status;
            if (totalStock === 0) {
                status = "Hết hàng";
            } else if (totalStock <= 10) {
                status = "Sắp hết";
            } else {
                status = "Còn hàng";
            }

            return { ...product.toObject(), stock: stockObject, status };
        });

        res.json(productsWithStatus);
    } catch (error) {
        res.status(500).json({ message: "Đã xảy ra lỗi ❎" });
    }
};

const getProductBesselling = async (req, res) => {
    try {
        const products = await Product.find({ sold: { $gt: 0 } })
            .sort({ sold: -1 })
            .limit(10)
            .populate('category');

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Đã xảy ra lỗi ❎" });
    }
};


const getProductSale = async (req, res) => {
    try {
        const products = await Product.find({ discount: { $gt: 0 } }).populate('category');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Đã xảy ra lỗi ❎" });
    }
}


const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id).populate('category', 'name');

        if (!product) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }

        res.json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Đã xảy ra lỗi ❎" });
    }
};


const createProduct = async (req, res) => {
    try {
        let { name, price, specifications, description, category, stock, colors, sizes, discount, sold } = req.body;

        // Kiểm tra các trường bắt buộc
        if (!name || !price || !category) {
            return res.status(400).json({ success: false, message: "Tên, giá và danh mục là bắt buộc!" });
        }

        // Kiểm tra giá trị của price
        if (isNaN(price) || price <= 0) {
            return res.status(400).json({ success: false, message: "Giá sản phẩm phải là số dương!" });
        }

        // Kiểm tra discount (nếu có)
        if (discount && (isNaN(discount) || discount < 0 || discount > 100)) {
            return res.status(400).json({
                success: false, message: "Giảm giá phải nằm trong khoảng 0-100%!"
            })
        }

        // Parse các trường JSON nếu cần
        if (typeof specifications === 'string') {
            specifications = JSON.parse(specifications);
        }
        if (typeof colors === 'string') {
            colors = JSON.parse(colors);
        }
        if (typeof sizes === 'string') {
            sizes = JSON.parse(sizes);
        }
        if (typeof stock === 'string') {
            stock = JSON.parse(stock);
        }

        // Kiểm tra danh sách colors (nếu có)
        if (colors && !Array.isArray(colors)) {
            return res.status(400).json({ success: false, message: "Colors phải là một mảng!" });
        }

        // Kiểm tra danh sách sizes (nếu có)
        if (sizes && !Array.isArray(sizes)) {
            return res.status(400).json({ success: false, message: "Sizes phải là một mảng!" });
        }

        const images = req.files ? req.files.map(file => `/images/products/${file.filename}`) : [];

        const product = new Product({
            name,
            price,
            specifications,
            description,
            images,
            category,
            stock,
            colors,
            sizes,
            discount,
            sold
        });

        const createdProduct = await product.save();
        if (!createdProduct) {
            return res.status(400).json({ success: false, message: "Tạo sản phẩm thất bại❌" });
        }
        res.status(201).json({ success: true, message: "Tạo sản phẩm thành công ✅" });
    } catch (error) {
        console.error('Lỗi khi tạo sản phẩm:', error);
        res.status(400).json({ success: false, message: "Đã xảy ra lỗi ❎" });
    }
}
const deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Sản phẩm không tồn tại❗" })
        }
        res.status(200).json({ success: true, message: "Xóa sản phẩm thành công ✅" })
    } catch (error) {
        res.status(500).json({ success: false, message: "Đã xảy ra lỗi ❎" })
    }
}

const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const productData = JSON.parse(req.body.productData);
        const deletedImages = JSON.parse(req.body.deletedImages || '[]');

        // Xử lý ảnh mới
        const newImages = req.files ? req.files.map(file => `images/products/${file.filename}`) : [];
        const remainingImages = (await Product.findById(id)).images
            .filter(img => !deletedImages.includes(img));
        const updatedImages = [...remainingImages, ...newImages];

        // Cập nhật sản phẩm với đầy đủ thông tin
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {
                ...productData,
                images: updatedImages,
                stock: productData.stock || {},
                colors: productData.colors || [],
                sizes: productData.sizes || []
            },
            { new: true }
        ).populate('category', 'name');

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy sản phẩm để cập nhật❗"
            });
        }

        // Xóa ảnh cũ
        deletedImages.forEach(imagePath => {
            const fullPath = path.join(__dirname, '../../public', imagePath);
            if (fs.existsSync(fullPath)) {
                fs.unlinkSync(fullPath);
            }
        });

        res.status(200).json({
            success: true,
            message: "Cập nhật sản phẩm thành công ✅",
            product: updatedProduct
        });
    } catch (error) {
        console.error('Lỗi khi cập nhật sản phẩm:', error);
        res.status(500).json({
            success: false,
            message: "Đã xảy ra lỗi khi cập nhật sản phẩm ❎"
        });
    }
};
module.exports = { getProducts, getProductBesselling, getProductSale, getProductById, createProduct, deleteProduct, updateProduct };
