import api from '../axiosConfig';
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// user
export const getUserMessages = async () => {
    try {
        await delay(2000)
        const response = await api.get('/messages/user/messages');
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Không thể tải tin nhắn" };
    }
};

export const sendMessage = async (content) => {
    try {
        await delay(2000)
        const response = await api.post('/messages/user/send', { content });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Không thể gửi tin nhắn" };
    }
};

// admin
export const getAllMailboxes = async () => {
    try {
        await delay(2000)
        const response = await api.get('/messages/admin/mailboxes');
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Không thể tải danh sách tin nhắn" };
    }
};

export const getMessagesByUserId = async (userId) => {
    try {
        await delay(2000)
        const response = await api.get(`/messages/admin/mailbox/${userId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Không thể tải tin nhắn" };
    }
};

export const replyToUser = async (userId, content) => {
    try {
        await delay(2000)
        const response = await api.post(`/messages/admin/reply/${userId}`, { content });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Không thể gửi tin nhắn" };
    }
};