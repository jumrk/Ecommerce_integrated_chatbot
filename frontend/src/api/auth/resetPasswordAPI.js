import api from '../axiosConfig';

export const checkPasswordAPI = async (data) => {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    try {
        await delay(2000);
        const response = await api.post('/auth/check-password', data);
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
        return {
            success: false,
            message: 'Đã xảy ra lỗi khi kiểm tra mật khẩu ❌',
        };
    }
}

export const newPasswordAPI = async (data) => {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    try {
        await delay(2000);
        const response = await api.post('/auth/reset-password', data);
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
        return {
            succses: false,
            message: 'Đã xảy ra lỗi khi lưu mật khẩu mới'
        }
    }
}