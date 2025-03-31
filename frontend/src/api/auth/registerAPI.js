import api from '../axiosConfig';

export const register = async (userData) => {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    try {
        await delay(2000);
        const response = await api.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
        return {
            success: false,
            message: 'Đã xảy ra lỗi khi đăng ký tài khoản ❌',
        };
    }
};
