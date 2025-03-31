const Product = require('../../model/Product');

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

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



const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);

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
    const { name, price, specifications, description,
        images, category, stock, colors, sizes, discount, sold } = req.body;
    try {
        const product = new Product({
            name, price, specifications, description, images,
            category, stock, colors, sizes, discount, sold
        });
        const createdProduct = await product.save();
        if (!createdProduct) {
            return res.status(400).json({ success: false, message: "Tạo sản phẩm thất bại❌" })
        }
        res.status(201).json({ success: true, message: "Tạo sản phẩm thành công ✅" });
    } catch (error) {
        res.status(400).json({ success: false, message: "Đã xảy ra lỗi ❎" });
    }
};

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
    const id = req.params.id;
    const { name, price, specifications, description, images,
        category, stock, colors, sizes, discount, sold } = req.body;

    try {
        const product = await Product.findByIdAndUpdate(id, {
            name, price, specifications, description, images,
            category, stock, colors, sizes, discount, sold
        }, { new: true });
        if (!product) {
            return res.status(404).json({ success: false, message: "Sản phẩm không tồn tại❗" })
        }
        res.status(200).json({ success: true, message: "Cập nhật sản phẩm thành công ✅" })
    } catch (error) {
        res.status(500).json({ success: false, message: "Đã xảy ra lỗi ❎" })
    }
}

module.exports = { getProducts, getProductById, createProduct, deleteProduct, updateProduct };