import api from '../axiosConfig';

const forgotPasswordAPI = async (data) => {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    try {
        await delay(2000);
        const response = await api.post('/auth/forgot-password', data);
        return response.data;
    } catch (error) {
        console.error('Error sending forgot password request:', error);
        throw error.response ? error.response.data : error;
    }
};

export default forgotPasswordAPI;