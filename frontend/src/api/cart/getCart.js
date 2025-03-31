import api from '../axiosConfig';

export const getCart = async () => {
    try {
        const response = await api.get('/cart/get-cart');
        return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
        console.error('Error fetching cart:', error);
        return [];
    }
};
