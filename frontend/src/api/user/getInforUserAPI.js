import api from '../axiosConfig';

export const getInforUser = async () => {
    try {
        const response = await api.post('/users/get-infor-user');
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);

        if (error.response) {
            console.error('Lỗi từ server:', error.response.data);
            return { success: false, message: error.response.data.message || 'Có lỗi xảy ra' };
        } else if (error.request) {
            console.error('Không nhận được phản hồi từ server:', error.request);
            return { success: false, message: 'Không thể kết nối đến server' };
        } else {
            console.error('Lỗi khi thiết lập request:', error.message);
            return { success: false, message: 'Có lỗi xảy ra khi gửi request' };
        }
    }
};
