import api from '../axiosConfig';
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getListVoucher = async () => {
    try {
        const response = await api.get('/vouchers/');
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching vouchers:", error);
        throw error;
    }
}
export const addVoucher = async (data) => {
    try {
        await delay(2000)

        const response = await api.post('/vouchers/create-voucher', data)
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        } else {
            console.error("Unexpected error:", error.message);
            return { success: false, message: "Lỗi kết nối tới server." };
        }
    }
}
export const updateVoucher = async (data) => {
    try {
        await delay(2000)

        const response = await api.put(`/vouchers/update-voucher`, data)
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        } else {
            console.error("Unexpected error:", error.message);
            return { success: false, message: "Lỗi kết nối tới server." };
        }
    }
}
export const deleteVoucher = async (id) => {
    try {
        await delay(2000)
        const response = await api.delete(`/vouchers/delete-voucher/${id}`)
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        } else {
            console.error("Unexpected error:", error.message);
            return { success: false, message: "Lỗi kết nối tới server." };
        }
    }
}