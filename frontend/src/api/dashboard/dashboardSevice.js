import api from '../axiosConfig';

export const getAdminStats = async () => {
    const res = await api.get('/dashboard/getAdminStats');
    return res.data;
};
export const getRecentOrders = async () => {
    const res = await api.get('/dashboard/getRecentOrders');
    return res.data;
}