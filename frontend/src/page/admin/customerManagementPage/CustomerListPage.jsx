import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiFilter, FiMail, FiPhone, FiUser, FiShoppingBag } from 'react-icons/fi';
import Loading from '../../../component/loading/loading';
import Pagination from '../../../component/pagination/Pagination';
import ButtonDelete from '../../../component/button/ButtonDelete';
import ConditionCustom from '../../../component/condition/ConditionCustom';
import { getAllUsers, deleteUserById, updateUserStatus } from '../../../api/user/userManagerAPI';
import { getOrdersByUserId } from '../../../api/order/orderService';
import ConfirmDialog from '../../../component/common/ConfirmDialog';
import Notification from '../../../component/notification/Notification'
import { Helmet } from 'react-helmet';
const CustomerListPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [customers, setCustomers] = useState([]);
    const [filterOpen, setFilterOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [notification, setNotification] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCustomers = customers.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await getAllUsers();

            // Fetch orders for each user
            const usersWithOrders = await Promise.all(
                data.map(async (user) => {
                    try {
                        const orders = await getOrdersByUserId(user._id);
                        const totalSpent = orders.reduce((sum, order) => {
                            return sum + (order.status !== 'cancelled' ? order.total : 0);
                        }, 0);

                        return {
                            id: user._id,
                            name: user.fullName || 'Chưa có tên',
                            email: user.email || 'Chưa có email',
                            phone: user.phone || 'Chưa có SĐT',
                            totalOrders: orders.length,
                            totalSpent: totalSpent,
                            lastOrder: orders.length > 0 ? orders[0].createdAt : null,
                            status: user.isActive ? 'active' : 'inactive',
                            joinDate: user.createdAt || null
                        };
                    } catch (error) {
                        console.error(`Error fetching orders for user ${user._id}:`, error);
                        return {
                            id: user._id,
                            name: user.fullName || 'Chưa có tên',
                            email: user.email || 'Chưa có email',
                            phone: user.phone || 'Chưa có SĐT',
                            totalOrders: 0,
                            totalSpent: 0,
                            lastOrder: null,
                            status: user.isActive ? 'active' : 'inactive',
                            joinDate: user.createdAt || null
                        };
                    }
                })
            );

            setCustomers(usersWithOrders);
        } catch (error) {
            setNotification({
                type: 'error',
                message: error.message || 'Không thể tải danh sách khách hàng'
            });
        } finally {
            setLoading(false);
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Chưa có';

        try {
            return new Intl.DateTimeFormat('vi-VN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }).format(new Date(dateString));
        } catch (error) {
            return 'Ngày không hợp lệ';
        }
    };

    const handleDeleteAccount = async (e, customerId) => {
        e.stopPropagation(); // Ngăn chặn việc navigate khi click nút xóa
        setSelectedCustomerId(customerId);
        setIsConfirmOpen(true);
    };

    const handleConfirmDelete = async () => {
        setLoading(true)
        try {
            await deleteUserById(selectedCustomerId);
            setCustomers(prevCustomers =>
                prevCustomers.filter(customer => customer.id !== selectedCustomerId)
            );
            setLoading(false)
            setNotification({
                type: 'success',
                message: 'Xóa tài khoản thành công'
            });
        } catch (error) {
            setNotification({
                type: 'error',
                message: error.message || 'Xóa tài khoản thất bại'
            });
        } finally {
            setIsConfirmOpen(false);
            setSelectedCustomerId(null);
        }
    };

    const handleUpdateStatus = async (customerId, newStatus) => {
        try {
            await updateUserStatus(customerId, newStatus === 'active');
            setCustomers(customers.map(customer =>
                customer.id === customerId
                    ? { ...customer, status: newStatus }
                    : customer
            ));
            setNotification({
                type: 'success',
                message: `${newStatus === 'active' ? 'Mở khóa' : 'Khóa'} tài khoản thành công`
            });
        } catch (error) {
            setNotification({
                type: 'error',
                message: error.message || 'Cập nhật trạng thái thất bại'
            });
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <Helmet>
                <title>Danh sách khách hàng</title>
            </Helmet>
            <ConfirmDialog
                isOpen={isConfirmOpen}
                title="Xóa tài khoản"
                message="Bạn có chắc chắn muốn xóa tài khoản này? Hành động này không thể hoàn tác."
                onConfirm={handleConfirmDelete}
                onClose={() => {
                    setIsConfirmOpen(false);
                    setSelectedCustomerId(null);
                }}
            />
            {notification && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                    onClose={() => setNotification(null)}
                />
            )}
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Danh sách khách hàng</h1>
                </div>

                {/* Search and Filter */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm khách hàng..."
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                            <button
                                onClick={() => setFilterOpen(!filterOpen)}
                                className="p-2 border rounded-lg hover:bg-gray-50"
                            >
                                <FiFilter className="text-gray-600" />
                            </button>
                        </div>
                    </div>

                    {filterOpen && (
                        <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Trạng thái
                                </label>
                                <select className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Tất cả</option>
                                    <option value="active">Đang hoạt động</option>
                                    <option value="inactive">Không hoạt động</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Sắp xếp theo
                                </label>
                                <select className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="newest">Mới nhất</option>
                                    <option value="oldest">Cũ nhất</option>
                                    <option value="orders">Số đơn hàng</option>
                                    <option value="spent">Tổng chi tiêu</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>

                {/* Customers Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Khách hàng
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Liên hệ
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Đơn hàng
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Chi tiêu
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Trạng thái
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {currentCustomers.map((customer) => (
                                    <tr
                                        key={customer.id}
                                        className="hover:bg-gray-50 cursor-pointer"
                                        onClick={() => navigate(`/admin/customer/detail-customer/${customer.id}`)}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 flex-shrink-0">
                                                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                        <FiUser className="h-5 w-5 text-gray-500" />
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {customer.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        Tham gia: {formatDate(customer.joinDate)}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 flex items-center gap-1">
                                                <FiMail className="text-gray-400" />
                                                {customer.email}
                                            </div>
                                            <div className="text-sm text-gray-900 flex items-center gap-1">
                                                <FiPhone className="text-gray-400" />
                                                {customer.phone}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 flex items-center gap-1">
                                                <FiShoppingBag className="text-gray-400" />
                                                {customer.totalOrders > 0 ? (
                                                    <span>{customer.totalOrders} đơn</span>
                                                ) : (
                                                    <span className="text-gray-500">Chưa có đơn hàng</span>
                                                )}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {customer.lastOrder ? (
                                                    <>Gần nhất: {formatDate(customer.lastOrder)}</>
                                                ) : (
                                                    'Chưa có đơn hàng'
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {customer.totalSpent > 0 ? (
                                                    formatPrice(customer.totalSpent)
                                                ) : (
                                                    <span className="text-gray-500">0 ₫</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <ConditionCustom
                                                type={customer.status === 'active' ? 'success' : 'danger'}
                                                text={customer.status === 'active' ? 'Đang hoạt động' : 'Không hoạt động'}
                                                onClick={() => handleUpdateStatus(
                                                    customer.id,
                                                    customer.status === 'active' ? 'inactive' : 'active'
                                                )}
                                            />
                                        </td>
                                        <td className=" py-4 px-9 gap-2 whitespace-nowrap text-right text-sm font-medium">
                                            <ButtonDelete
                                                onClick={(e) => handleDeleteAccount(e, customer.id)}
                                                text="Xóa"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalItems={customers.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div >
    );
};

export default CustomerListPage;