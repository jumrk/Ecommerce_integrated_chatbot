import api from '../axiosConfig';
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getShippingConfig = async () => {
    try {
        await delay(2000)
        const response = await api.get('/shipping-config');
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy cấu hình vận chuyển');
        throw error;
    }
};

export const updateShippingConfig = async (configData) => {
    try {
        await delay(2000)

        const response = await api.put('/shipping-config', configData);
        console.log('Cập nhật cấu hình thành công');
        return response.data;
    } catch (error) {
        console.error('Lỗi khi cập nhật cấu hình');
        throw error;
    }
};