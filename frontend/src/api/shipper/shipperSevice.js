import api from '../axiosConfig';
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Thêm shipper
export const createShipper = async (shipperData) => {
    await delay(2000)
    const response = await api.post('/shippers/create-shipper', shipperData);
    return response.data;
};

// Lấy danh sách shipper
export const getAllShippers = async () => {
    await delay(2000)
    const response = await api.get('/shippers');
    return response.data;
};

// Cập nhật shipper
export const updateShipper = async (id, shipperData) => {
    await delay(2000)
    const response = await api.put(`/shippers/update-shipper/${id}`, shipperData);
    return response.data;
};

// Xóa shipper
export const deleteShipper = async (id) => {
    await delay(2000)
    const response = await api.delete(`/shippers/delete-shipper/${id}`);
    return response.data;
};