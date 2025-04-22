import api from "../axiosConfig";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getAllReview = async () => {
    try {
        await delay(2000)
        const response = await api.get(`/reviews`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const postProductReview = async (review, idProduct) => {
    try {
        await delay(2000)
        const response = await api.post(`/reviews/products/${idProduct}`, review);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const getProductReviews = async (idProduct) => {
    try {
        const response = await api.get(`/reviews/products/${idProduct}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}