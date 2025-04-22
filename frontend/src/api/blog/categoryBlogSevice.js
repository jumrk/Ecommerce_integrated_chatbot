import api from '../axiosConfig';


const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


export const getCategories = async () => {
    try {
        await delay(2000);
        const response = await api.get('/blog/category/get-list');
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error.response?.data || { message: "An error occurred while fetching categories. Please try again." };
    }
};

export const addCategory = async (data) => {
    try {
        await delay(2000);
        const response = await api.post('/blog/category/add-category', data);
        return response.data
    } catch (error) {
        console.error("Error adding category:", error);
        throw error.response?.data || { message: "An error occurred while adding the category. Please try again." };
    }
};


export const updateCategory = async (id, data) => {
    try {
        await delay(2000);
        const response = await api.put(`/blog/category/update-category/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating category:", error);
        throw error.response?.data || { message: "An error occurred while updating the category. Please try again." };
    }
};


export const deleteCategory = async (id) => {
    try {
        await delay(2000);
        const response = await api.delete(`/blog/category/delete-category/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting category:", error);
        throw error.response?.data || { message: "An error occurred while deleting the category. Please try again." };
    }
};
