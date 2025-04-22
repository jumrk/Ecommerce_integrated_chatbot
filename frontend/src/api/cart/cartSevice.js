import api from '../axiosConfig';
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getCart = async () => {
    try {
        await delay(2000);
        const response = await api.get('/cart/get-cart');
        return response.data;
    } catch (error) {
        console.error('Error fetching cart:', error);
        return [];
    }
};
export const getCountCart = async () => {
    try {
        const response = await api.get('/cart/get-cart');
        return response.data.cart.items.length;
    } catch (error) {
        console.error('Error fetching cart:', error);
        return [];
    }
};
export const createCart = async (data) => {
    await delay(2000);
    try {
        const response = await api.post('/cart/add-to-cart', data);
        return response.data;
    } catch (error) {
        console.error('Error creating cart:', error);
        return null;
    }
}

export const deleteCart = async (cartId) => {
    try {
        const response = await api.delete(`/cart/delete-cart/${cartId}`);
        return response.data;
    } catch (error) {
        console.error('Error updating cart:', error);
        return null;
    }
}

export const updateCart = async (cartId, quantity) => {
    try {
        const response = await api.put(`/cart/update-cart/${cartId}`, { quantity: quantity });
        return response.data;
    } catch (error) {
        console.error('Error updating cart:', error);
        return null;
    }
}