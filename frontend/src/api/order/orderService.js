import api from '../axiosConfig';
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getOrdersByUserId = async (userId) => {
    try {
        await delay(2000)
        const response = await api.get(`/order/user/${userId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
export const getOrderByIdForUser = async () => {
    try {
        await delay(2000)
        const response = await api.get(`/order/user`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}
export const getAllOrder = async () => {
    try {
        await delay(2000)
        const response = await api.get(`/order/getAllOrder`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}
export const getOrderById = async (id) => {
    try {
        await delay(2000)
        const response = await api.get(`/order/getOrderById/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}
export const createrOrder = async (data) => {
    try {
        await delay(2000)
        const response = await api.post(`/order/add-order`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}
export const deleteOrder = async (id) => {
    try {
        await delay(2000)
        const response = await api.delete(`/order/delete-order/${id}`)
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}
export const cancelOrder = async (id) => {
    try {
        await delay(2000)
        const response = await api.delete(`/order/delete-order/${id}`)
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}
export const updataOrder = async (data, id) => {
    try {
        await delay(2000)
        const response = await api.put(`/order/update-order/${id}`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}