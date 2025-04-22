// src/api/favoriteService.js
import api from '../axiosConfig';
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const addToFavorites = async (productId) => {
    try {
        const response = await api.post('/favorites', { productId });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getFavoritesByIdUser = async () => {
    try {
        await delay(2000)
        const response = await api.get('/favorites/get-for-user');
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message
    }
}

export const removeFromFavorites = async (productId) => {
    try {
        // Gửi productId trong body cho DELETE request
        const response = await api.delete('/favorites', { data: { productId } });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const checkFavorite = async (productId) => {
    try {
        // Gửi productId qua query params cho GET request
        const response = await api.get(`/favorites/check/${productId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};