import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiUser, FiMail, FiPhone, FiMapPin, FiShoppingBag, FiDollarSign, FiMessageSquare, FiEdit2, FiLock } from 'react-icons/fi';
import LoadingSpinner from '../../../component/common/LoadingSpinner';

const CustomerDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [customer, setCustomer] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        // Giả lập API call
        setTimeout(() => {
            setCustomer({
                id: 1,
                name: "Nguyễn Văn A",
                email: "nguyenvana@example.com",
                phone: "0123456789",
                address: "123 Đường ABC, Phường XYZ, Quận 1, TP.HCM",
                joinDate: "2024-01-01T00:00:00Z",
                totalOrders: 5,
                totalSpent: 15000000,
                status: "active",
                recentOrders: [
                    {
                        id: "DH001",
                        date: "2024-03-15T08:00:00Z",
                        total: 3000000,
                        status: "completed"
                    },
                    // Thêm đơn hàng khác...
                ],
                recentMessages: [
                    {
                        id: 1,
                        content: "Xin chào, tôi cần hỗ trợ về đơn hàng",
                        date: "2024-03-14T10:00:00Z",
                        type: "received"
                    },
                    // Thêm tin nhắn khác...
                ]
            });
            setLoading(false);
        }, 1000);
    }, [id]);

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
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(dateString));
    };

    const handleLockAccount = () => {
        const confirmed = window.confirm(
            customer.status === 'active'
                ? 'Bạn có chắc chắn muốn khóa tài khoản này không?'
                : 'Bạn có chắc chắn muốn mở khóa tài khoản này không?'
        );
        if (confirmed) {
            setCustomer(prev => ({
                ...prev,
                status: prev.status === 'active' ? 'inactive' : 'active'
            }));
        }
    };

    if (loading) return <LoadingSpinner />;
    if (!customer) return <div>Không tìm thấy thông tin khách hàng</div>;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header with Back Button */}
                <div className="flex items-center mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <FiArrowLeft className="w-6 h-6" />
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Thông tin khách hàng
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Customer Info Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow">
                            <div className="p-6">
                                <div className="flex items-center justify-center mb-4">
                                    <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                                        <FiUser className="h-12 w-12 text-gray-500" />
                                    </div>
                                </div>
                                <div className="text-center mb-4">
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        {customer.name}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        Khách hàng từ {formatDate(customer.joinDate)}
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <FiMail className="w-5 h-5 text-gray-400 mr-2" />
                                        <span>{customer.email}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FiPhone className="w-5 h-5 text-gray-400 mr-2" />
                                        <span>{customer.phone}</span>
                                    </div>
                                    <div className="flex items-start">
                                        <FiMapPin className="w-5 h-5 text-gray-400 mr-2 mt-1" />
                                        <span>{customer.address}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="border-t px-6 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-sm text-gray-500">Tổng đơn hàng</div>
                                        <div className="font-semibold">{customer.totalOrders}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500">Tổng chi tiêu</div>
                                        <div className="font-semibold">{formatPrice(customer.totalSpent)}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="border-t px-6 py-4 space-y-3">
                                <button
                                    onClick={() => setShowEditModal(true)}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    <FiEdit2 />
                                    Chỉnh sửa thông tin
                                </button>
                                <button
                                    onClick={handleLockAccount}
                                    className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg border ${customer.status === 'active'
                                        ? 'border-red-500 text-red-500 hover:bg-red-50'
                                        : 'border-green-500 text-green-500 hover:bg-green-50'
                                        }`}
                                >
                                    <FiLock />
                                    {customer.status === 'active' ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Recent Orders and Messages */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Recent Orders */}
                        <div className="bg-white rounded-lg shadow">
                            <div className="p-4 border-b">
                                <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                                    <FiShoppingBag />
                                    Đơn hàng gần đây
                                </h2>
                            </div>
                            <div className="p-4">
                                <div className="space-y-4">
                                    {customer.recentOrders.map((order) => (
                                        <div
                                            key={order.id}
                                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                                            onClick={() => navigate(`/admin/orders/${order.id}`)}
                                        >
                                            <div>
                                                <div className="font-medium">Đơn hàng #{order.id}</div>
                                                <div className="text-sm text-gray-500">
                                                    {formatDate(order.date)}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-medium">
                                                    {formatPrice(order.total)}
                                                </div>
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === 'completed'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {order.status === 'completed' ? 'Hoàn thành' : 'Đang xử lý'}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 text-center">
                                    <button
                                        onClick={() => navigate(`/admin/orders?customer=${customer.id}`)}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        Xem tất cả đơn hàng
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Recent Messages */}
                        <div className="bg-white rounded-lg shadow">
                            <div className="p-4 border-b">
                                <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                                    <FiMessageSquare />
                                    Tin nhắn gần đây
                                </h2>
                            </div>
                            <div className="p-4">
                                <div className="space-y-4">
                                    {customer.recentMessages.map((message) => (
                                        <div key={message.id} className="flex gap-4">
                                            <div className={`flex-1 p-4 rounded-lg ${message.type === 'received'
                                                ? 'bg-gray-100'
                                                : 'bg-blue-100'
                                                }`}>
                                                <div className="text-sm">
                                                    {message.content}
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">
                                                    {formatDate(message.date)}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 text-center">
                                    <button
                                        onClick={() => navigate(`/admin/customers/chat/${customer.id}`)}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        Xem tất cả tin nhắn
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Thêm Modal chỉnh sửa thông tin */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold mb-4">Chỉnh sửa thông tin khách hàng</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Họ tên
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={customer.name}
                                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        defaultValue={customer.email}
                                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Số điện thoại
                                    </label>
                                    <input
                                        type="tel"
                                        defaultValue={customer.phone}
                                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Địa chỉ
                                    </label>
                                    <textarea
                                        defaultValue={customer.address}
                                        rows="3"
                                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    onClick={() => setShowEditModal(false)}
                                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={() => {
                                        // Xử lý lưu thông tin
                                        setShowEditModal(false);
                                    }}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Lưu thay đổi
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomerDetailPage;