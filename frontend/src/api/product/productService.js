import api from "../axiosConfig";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
export const getProducts = async () => {
    try {
        await delay(2000);
        const response = await api.get('/products');
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};
export const getProductBesselling = async () => {
    try {
        await delay(2000);
        const response = await api.get('/products/best-selling');
        return response.data;
    } catch (error) {
        console.error('Error fetching best-selling products:', error);
        throw error;
    }
};
export const getProductSale = async () => {
    try {
        await delay(2000);
        const response = await api.get('/products/sale');
        return response.data;
    } catch (error) {
        console.error('Error fetching sale products:', error);
        throw error;
    }
};
export const getProductById = async (id) => {
    try {
        await delay(2000);
        const response = await api.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
};

export const addProduct = async (productData) => {
    try {
        await delay(2000)
        // Gửi FormData trực tiếp
        const response = await api.post('/products/create-product', productData);
        return response.data;
    } catch (error) {
        console.error('Error adding product:', error);
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'Có lỗi xảy ra khi thêm sản phẩm');
        }
        throw new Error('Không thể kết nối đến server');
    }
};

export const deleteProduct = async (id) => {
    try {
        await delay(2000);
        const response = await api.delete(`/products/delete-product/${id}`)
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export const updateProduct = async (id, productData) => {
    try {
        await delay(2000)
        const formData = new FormData();

        // Thêm các trường thông tin cơ bản
        const productInfo = {
            _id: id,
            name: productData.name,
            price: productData.price,
            category: productData.category,
            discount: productData.discount || 0,
            description: productData.description,
            specifications: productData.specifications,
            stock: productData.stock || {},
            colors: productData.colors || [],
            sizes: productData.sizes || []
        };

        formData.append('productData', JSON.stringify(productInfo));

        // Xử lý ảnh mới
        if (Array.isArray(productData.images)) {
            productData.images.forEach(image => {
                if (image instanceof File) {
                    formData.append('images', image);
                }
            });
        }

        // Thêm danh sách ảnh đã xóa
        if (productData.deletedImages?.length > 0) {
            formData.append('deletedImages', JSON.stringify(productData.deletedImages));
        }

        const response = await api.put(`/products/update-product/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        // Tính toán lại trạng thái dựa trên stock
        const updatedProduct = response.data.product;
        const totalStock = Object.values(updatedProduct.stock).reduce((total, current) => total + current, 0);

        let status;
        if (totalStock === 0) {
            status = "Hết hàng";
        } else if (totalStock <= 10) {
            status = "Sắp hết";
        } else {
            status = "Còn hàng";
        }

        return {
            ...response.data,
            product: {
                ...updatedProduct,
                status
            }
        };
    } catch (error) {
        throw error.response?.data || error;
    }
};
