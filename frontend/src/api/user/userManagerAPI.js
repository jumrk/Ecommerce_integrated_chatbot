import api from '../axiosConfig';
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getAllUsers = async () => {
    try {
        await delay(2000)
        const response = await api.get('/users');
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const deleteUserById = async (id) => {
    try {
        await delay(2000)

        const response = await api.delete(`/users/delete-user/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const updateUserStatus = async (id, isActive) => {
    try {
        await delay(2000)

        const response = await api[isActive ? 'put' : 'put'](
            `/users/${isActive ? 'opening' : 'locks'}/${id}`
        );
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getUserById = async (id) => {
    try {
        await delay(2000)

        const response = await api.get(`/users/get-user-by-id/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const updateUserById = async (id, userData) => {
    try {
        await delay(2000)

        const response = await api.put(`/users/update/${id}`, userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const lockUser = async (id) => {
    try {
        await delay(2000)
        const response = await api.put(`/users/account-locks/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const unlockUser = async (id) => {
    try {
        await delay(2000)

        const response = await api.put(`/users/opening-account/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const updateUserRole = async (userId, role) => {
    try {
        await delay(2000)
        const response = await api.put(`/users/update-user-Role/${userId}`, { role });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Có lỗi xảy ra khi cập nhật vai trò" };
    }
};