import api from '../axiosConfig';

// Hàm delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const createCategoryProduct = async (data) => {
    try {
        await delay(2000);
        const response = await api.post('/categories/create-category', data);
        return response.data;
    } catch (error) {
        console.error("Lỗi", error);
        throw error; // Ném lỗi để xử lý ở frontend
    }
};

export const getCategories = async () => {
    try {
        await delay(2000);
        const response = await api.get('/categories');
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy danh mục:', error);
        throw error;
    }
};

export const deleteCategory = async (id) => {
    try {
        const response = await api.delete(`/categories/delete-category/${id}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi xóa danh mục', error);
        throw error;
    }
};

export const updateCategory = async (id, data) => {
    try {
        const response = await api.put(`/categories/update-category/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi cập nhật danh mục:', error);
        throw error;
    }
};