import api from "../axiosConfig";

export const getAddressesAPI = async () => {
    try {
        const response = await api.get("/address");
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy địa chỉ người dùng:", error);
        throw error.response?.data || { message: "Có lỗi xảy ra, vui lòng thử lại." };
    }
};

// API: Thêm địa chỉ mới
export const createAddressAPI = async (addressData) => {
    try {
        const response = await api.post("/address", addressData);
        return response.data; // Trả về dữ liệu từ server
    } catch (error) {
        console.error("Lỗi khi thêm địa chỉ:", error);
        throw error.response?.data || { message: "Có lỗi xảy ra, vui lòng thử lại." };
    }
};

// API: Cập nhật địa chỉ
export const updateAddressAPI = async (id, addressData) => {
    try {
        const response = await api.put(`/address/${id}`, addressData);
        return response.data; // Trả về dữ liệu từ server
    } catch (error) {
        console.error("Lỗi khi cập nhật địa chỉ:", error);
        throw error.response?.data || { message: "Có lỗi xảy ra, vui lòng thử lại." };
    }
};

// API: Xóa địa chỉ
export const deleteAddressAPI = async (id) => {
    try {
        const response = await api.delete(`/address/${id}`);
        return response.data; // Trả về dữ liệu từ server
    } catch (error) {
        console.error("Lỗi khi xóa địa chỉ:", error);
        throw error.response?.data || { message: "Có lỗi xảy ra, vui lòng thử lại." };
    }
};