import api from '../axiosConfig'
export const sendMessage = async (message) => {
    try {
        const response = await api.post('/chatbot', message);
        return response.data;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};