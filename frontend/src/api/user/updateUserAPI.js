import api from "../axiosConfig";

export const updateUserAPI = async (userData) => {
    try {
        const response = await api.put("/users/update-user", userData);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật thông tin người dùng:", error);
        throw error.response?.data || { message: "Có lỗi xảy ra, vui lòng thử lại." };
    }
};