import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiPackage, FiUser, FiTruck, FiDollarSign, FiEdit, FiArrowLeft } from 'react-icons/fi';
import Loading from '../../../component/loading/loading';
import UpdateOrderStatus from '../../../component/admin/orderManagement/UpdateOrderStatus';
import PrintInvoice from '../../../component/admin/orderManagement/PrintInvoice';
import { getOrderById, updataOrder } from '../../../api/order/orderService';
import Notification from '../../../component/notification/Notification';
import { Helmet } from 'react-helmet';

const OrderDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState(null);
    const [showNoteModal, setShowNoteModal] = useState(false);
    const [notification, setNotification] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await getOrderById(id);
                if (response) {
                    setOrder(response);
                } else {
                    setNotification({
                        message: response?.message || 'Không thể tải thông tin đơn hàng',
                        type: 'error'
                    });
                }
            } catch (error) {
                setNotification({
                    message: 'Có lỗi xảy ra khi tải thông tin đơn hàng',
                    type: 'error'
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'ordered':
                return 'bg-yellow-100 text-yellow-800';
            case 'confirmed':
                return 'bg-blue-100 text-blue-800';
            case 'delivering':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'ordered':
                return 'Chờ xác nhận';
            case 'confirmed':
                return 'Đã xác nhận';
            case 'delivering':
                return 'Đang giao hàng';
            case 'cancelled':
                return 'Đã hủy';
            default:
                return status;
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    const handleUpdateStatus = async (updateData) => {
        try {
            setLoading(true);
            const response = await updataOrder(updateData, order._id);
            if (response.success) {
                setOrder(prev => ({
                    ...prev,
                    status: response.order.status,
                    notes: response.order.note
                }));
                setNotification({ message: 'Cập nhật trạng thái thành công', type: 'success' });
            } else {
                setNotification({ message: response.message, type: 'error' });
            }
        } catch (error) {
            setNotification({ message: error.message || 'Có lỗi xảy ra khi cập nhật trạng thái', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

    if (!order) {
        return <div>Không tìm thấy đơn hàng</div>;
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <Helmet>
                <title>Chi tiết đơn hàng</title>
            </Helmet>
            {/* Notification */}
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}

            {/* Header with Back Button */}
            <div className="mb-6">
                <div className="flex items-center gap-4 mb-2">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        title="Quay lại"
                    >
                        <FiArrowLeft className="w-6 h-6" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Chi tiết đơn hàng #{order.orderCode}
                        </h1>
                        <p className="text-gray-600">
                            Đặt ngày {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    <span className={`ml-auto px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadgeClass(order.status)}`}>
                        {getStatusText(order.status)}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Order Items */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="p-4 border-b bg-gray-50">
                            <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                                <FiPackage /> Sản phẩm
                            </h2>
                        </div>
                        <div className="p-4">
                            <div className="divide-y">
                                {order.items.map((item) => (
                                    <div key={item._id} className="py-4 flex items-center space-x-4">
                                        <img
                                            src={import.meta.env.VITE_API_URL + item.productId.images[0]}
                                            alt={item.productId.name}
                                            className="w-16 h-16 rounded-lg object-cover"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-900">{item.productId.name}</h3>
                                            <p className="text-sm text-gray-500">{item.size} / {item.color}</p>
                                            <div className="mt-1 text-sm text-gray-500">
                                                {formatPrice(item.price)} x {item.quantity}
                                            </div>
                                        </div>
                                        <div className="font-medium text-gray-900">
                                            {formatPrice(item.price * item.quantity)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Customer Info */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-4 border-b bg-gray-50">
                            <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                                <FiUser /> Thông tin khách hàng
                            </h2>
                        </div>
                        <div className="p-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">Họ tên</p>
                                    <p className="font-medium">{order.userId.fullName}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Số điện thoại</p>
                                    <p className="font-medium">{order.userId.phone}</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="font-medium">{order.userId.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Info */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-4 border-b bg-gray-50">
                            <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                                <FiTruck /> Thông tin giao hàng
                            </h2>
                        </div>
                        <div className="p-4">
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-500">Thông tin người nhận</p>
                                    <p className="font-medium">
                                        {order.addressId.receiver} / {order.addressId.phone}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Địa chỉ giao hàng</p>
                                    <p className="font-medium">
                                        {order.addressId.address}, {order.addressId.ward},
                                        {order.addressId.district}, {order.addressId.province}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Phương thức vận chuyển</p>
                                    <p className="font-medium">{order.shippingMethod}</p>
                                </div>
                                {/* shipper */}
                                {order.shipper && (
                                    <div className="border rounded-xl">
                                        <h4 className="text-sm text-gray-500 mb-3">Thông tin người giao hàng</h4>
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                            <div className="flex items-center gap-4 flex-1">
                                                <img
                                                    src='https://th.bing.com/th/id/R.e819daa555ac4020c0a2f1265a485cbd?rik=wk%2f9HcdNFMDrsQ&pid=ImgRaw&r=0'
                                                    alt="Shipper"
                                                    className="w-12 h-12 rounded-full"
                                                />
                                                <div>
                                                    <p className="font-medium">{order.shipper.name}</p>
                                                    <p className="text-gray-600">{order.shipper.phone}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow sticky top-6">
                        <div className="p-4 border-b bg-gray-50">
                            <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                                <FiDollarSign /> Tổng quan đơn hàng
                            </h2>
                        </div>
                        <div className="p-4">
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Tạm tính</span>
                                    <span className="font-medium">{formatPrice(order.subtotal)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Phí vận chuyển</span>
                                    <span className="font-medium">{formatPrice(order.shippingFee)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Giảm giá</span>
                                    <span className="font-medium">{formatPrice(order.discount)}</span>
                                </div>
                                <div className="pt-4 border-t">
                                    <div className="flex justify-between">
                                        <span className="font-semibold">Tổng cộng</span>
                                        <span className="font-semibold text-lg">{formatPrice(order.total)}</span>
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Phương thức thanh toán</span>
                                        <span className="font-medium">{order.paymentMethod}</span>
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Tình trạng thanh toán</span>
                                        <span className="font-medium">{order.paymentStatus}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Order Summary Actions */}
                        <div className="p-4 border-t">
                            <div className="space-y-3">
                                {/* Cập nhật trạng thái */}
                                <UpdateOrderStatus
                                    idOrder={order._id}
                                    currentStatus={order.status}
                                    onUpdateStatus={handleUpdateStatus}
                                />

                                {/* In hóa đơn */}
                                <PrintInvoice order={order} />

                                {/* Ghi chú đơn hàng */}
                                <button
                                    onClick={() => setShowNoteModal(true)}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50"
                                >
                                    <FiEdit />
                                    Thêm ghi chú
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Note Modal */}
            {showNoteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold mb-4">Thêm ghi chú</h3>
                            <textarea
                                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows="4"
                                placeholder="Nhập ghi chú..."
                            />
                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    onClick={() => setShowNoteModal(false)}
                                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={() => {
                                        // Handle save note
                                        setShowNoteModal(false);
                                    }}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Lưu
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderDetailPage;