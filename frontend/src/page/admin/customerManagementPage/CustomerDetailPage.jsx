import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiMail, FiPhone, FiMapPin, FiShoppingBag, FiMessageSquare, FiLock } from 'react-icons/fi';
import Loading from '../../../component/loading/loading';
import { getUserById, lockUser, unlockUser } from '../../../api/user/userManagerAPI';
import Notification from '../../../component/notification/Notification';
import { getAddressParamsAPI } from '../../../api/address/addressAPI';
import ConfirmDialog from '../../../component/common/ConfirmDialog';
import { getOrdersByUserId } from '../../../api/order/orderService';
import { Helmet } from 'react-helmet';

const CustomerDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [customer, setCustomer] = useState(null);
    const [notification, setNotification] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchCustomerDetails();
    }, [id]);

    const fetchCustomerDetails = async () => {
        try {
            setLoading(true);
            const [addressData, userData, ordersData] = await Promise.all([
                getAddressParamsAPI(id),
                getUserById(id),
                getOrdersByUserId(id)
            ]);

            const address = addressData.data;
            const defaultAddr = Array.isArray(address)
                ? address.find(addr => addr.isDefault === true)
                : null;

            setCustomer({
                id: userData._id,
                name: userData.fullName,
                email: userData.email,
                phone: userData.phone || '',
                images: userData.avatar,
                address: defaultAddr ? `${defaultAddr.address}, ${defaultAddr.ward}, ${defaultAddr.district}, ${defaultAddr.province}` : '',
                joinDate: userData.createdAt,
                totalOrders: ordersData.length || 0,
                totalSpent: ordersData.reduce((total, order) => total + order.total, 0),
                status: userData.isActive ? 'active' : 'inactive',
                recentMessages: [] // Hoặc userData.messages || []
            });

            // Format orders data
            const formattedOrders = ordersData.map(order => ({
                id: order._id,
                date: order.createdAt,
                total: order.total,
                status: order.status,
                paymentStatus: order.paymentStatus,
                items: order.items
            }));

            setOrders(formattedOrders);

        } catch (error) {
            setNotification({
                type: 'error',
                message: error.message || 'Không thể tải thông tin khách hàng'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleLockAccount = () => {
        setIsConfirmOpen(true);
    };

    const handleConfirm = async () => {
        try {
            setLoading(true);
            if (customer.status === 'active') {
                await lockUser(id);
            } else {
                await unlockUser(id);
            }
            await fetchCustomerDetails();
            setNotification({
                type: 'success',
                message: `${customer.status === 'active' ? 'Khóa' : 'Mở khóa'} tài khoản thành công`
            });
        } catch (error) {
            setNotification({
                type: 'error',
                message: error.message || 'Thao tác thất bại'
            });
        } finally {
            setLoading(false);
            setIsConfirmOpen(false);
        }
    };

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

    if (loading) return <Loading />;
    if (!customer) return <div>Không tìm thấy thông tin khách hàng</div>;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <Helmet>
                <title>Thông tin khách hàng</title>
            </Helmet>
            <ConfirmDialog
                isOpen={isConfirmOpen}
                title={customer?.status === 'active' ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
                message={
                    customer?.status === 'active'
                        ? 'Bạn có chắc chắn muốn khóa tài khoản này không?'
                        : 'Bạn có chắc chắn muốn mở khóa tài khoản này không?'
                }
                onConfirm={handleConfirm}
                onClose={() => setIsConfirmOpen(false)}
            />
            {notification && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                    onClose={() => setNotification(null)}
                />
            )}
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
                                        <img className='rounded-full w-full h-full' src={`http://localhost:5000${customer.images}`} alt="" />
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
                                        <FiMapPin className="w-5 h-5 text-gray-400 mr-2 mt-1 flex-shrink-0" />
                                        <span className="flex-1 break-words">{customer.address}</span>
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
                                    {orders.slice(0, 5).map((order) => (
                                        <div
                                            key={order.id}
                                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                                            onClick={() => navigate(`/admin/orders/order-detail/${order.id}`)}
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
                                                    : order.status === 'cancelled'
                                                        ? 'bg-red-100 text-red-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {order.status === 'completed'
                                                        ? 'Hoàn thành'
                                                        : order.status === 'cancelled'
                                                            ? 'Đã hủy'
                                                            : 'Đang xử lý'}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {orders.length > 5 && (
                                    <div className="mt-4 text-center">
                                        <button
                                            onClick={() => navigate(`/admin/orders?customer=${customer.id}`)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            Xem tất cả đơn hàng
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Recent Messages - Có thể xóa phần này nếu không cần */}
                        {customer.recentMessages && customer.recentMessages.length > 0 && (
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
                                                <div className={`flex-1 p-4 rounded-lg ${message.type === 'received' ? 'bg-gray-100' : 'bg-blue-100'
                                                    }`}>
                                                    <div className="text-sm">{message.content}</div>
                                                    <div className="text-xs text-gray-500 mt-1">
                                                        {formatDate(message.date)}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerDetailPage;