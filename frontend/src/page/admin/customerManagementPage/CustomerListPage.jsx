import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiFilter, FiMail, FiPhone, FiUser, FiShoppingBag } from 'react-icons/fi';
import LoadingSpinner from '../../../component/common/LoadingSpinner';

const CustomerListPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [customers, setCustomers] = useState([]);
    const [filterOpen, setFilterOpen] = useState(false);

    useEffect(() => {
        // Giả lập API call
        setTimeout(() => {
            setCustomers([
                {
                    id: 1,
                    name: "Nguyễn Văn A",
                    email: "nguyenvana@example.com",
                    phone: "0123456789",
                    totalOrders: 5,
                    totalSpent: 15000000,
                    lastOrder: "2024-03-15T08:00:00Z",
                    status: "active",
                    joinDate: "2024-01-01T00:00:00Z"
                },
                // Thêm dữ liệu mẫu khác...
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    const formatDate = (dateString) => {
        return new Intl.DateTimeFormat('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).format(new Date(dateString));
    };

    const handleDeleteAccount = (e, customerId) => {
        e.stopPropagation();
        // Giả lập API call
        const confirmed = window.confirm('Bạn có chắc chắn muốn xóa tài khoản này? Hành động này không thể hoàn tác.');
        if (confirmed) {
            setCustomers(customers.filter(customer => customer.id !== customerId));
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
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
                                {customers.map((customer) => (
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
                                                {customer.totalOrders} đơn
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Gần nhất: {formatDate(customer.lastOrder)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {formatPrice(customer.totalSpent)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${customer.status === 'active'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                                }`}>
                                                {customer.status === 'active' ? 'Đang hoạt động' : 'Không hoạt động'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`/admin/customer/detail-customer/${customer.id}`);
                                                }}
                                                className="text-blue-600 hover:text-blue-900 mr-4"
                                            >
                                                Chi tiết
                                            </button>
                                            <button
                                                onClick={(e) => handleDeleteAccount(e, customer.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                        Hiển thị 1-10 trên tổng số {customers.length} khách hàng
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">
                            Trước
                        </button>
                        <button className="px-3 py-1 bg-blue-600 text-white rounded-lg">
                            1
                        </button>
                        <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">
                            2
                        </button>
                        <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">
                            3
                        </button>
                        <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">
                            Sau
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerListPage;