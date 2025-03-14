import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiPackage, FiUser, FiTruck, FiDollarSign, FiPrinter, FiClock, FiEdit, FiArrowLeft } from 'react-icons/fi';
import LoadingSpinner from '../../../component/common/LoadingSpinner';
import { toast } from 'react-toastify';
import UpdateOrderStatus from '../../../component/admin/orderManagement/UpdateOrderStatus';
import PrintInvoice from '../../../component/admin/orderManagement/PrintInvoice';

const OrderDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState(null);
    const [showNoteModal, setShowNoteModal] = useState(false);

    useEffect(() => {
        // Giả lập API call
        setTimeout(() => {
            setOrder({
                id: "DH001",
                status: "processing",
                orderDate: "2024-03-15T08:00:00Z",
                customer: {
                    name: "Nguyễn Văn A",
                    phone: "0123456789",
                    email: "nguyenvana@example.com"
                },
                shippingAddress: {
                    street: "123 Đường ABC",
                    ward: "Phường XYZ",
                    district: "Quận 1",
                    city: "TP.HCM"
                },
                paymentMethod: "COD",
                shippingMethod: "Express",
                items: [
                    {
                        id: 1,
                        image: "https://example.com/product1.jpg",
                        name: "Nike Air Max 270",
                        variant: "Đen - 42",
                        price: 2990000,
                        quantity: 1
                    },
                    {
                        id: 2,
                        image: "https://example.com/product2.jpg",
                        name: "Adidas Ultraboost",
                        variant: "Trắng - 43",
                        price: 3500000,
                        quantity: 2
                    }
                ],
                subtotal: 9990000,
                shippingFee: 30000,
                discount: 500000,
                total: 9520000,
                trackingInfo: {
                    carrier: "Giao Hàng Nhanh",
                    trackingNumber: "GHN123456789"
                },
                notes: [
                    {
                        content: "Khách hàng yêu cầu giao hàng ngoài giờ hành chính",
                        author: "Admin",
                        createdAt: "2024-03-15T09:00:00Z"
                    },
                    {
                        content: "Đã liên hệ xác nhận đơn hàng",
                        author: "Admin",
                        createdAt: "2024-03-15T08:30:00Z"
                    }
                ],
                history: [
                    {
                        action: "create",
                        status: "pending",
                        note: "Đơn hàng được tạo",
                        timestamp: "2024-03-15T08:00:00Z"
                    },
                    {
                        action: "status_change",
                        status: "processing",
                        note: "Xác nhận đơn hàng",
                        timestamp: "2024-03-15T08:30:00Z"
                    }
                ]
            });
            setLoading(false);
        }, 1000);
    }, [id]);

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'processing':
                return 'bg-blue-100 text-blue-800';
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'pending':
                return 'Chờ xác nhận';
            case 'processing':
                return 'Đang xử lý';
            case 'completed':
                return 'Hoàn thành';
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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    const handleUpdateStatus = async (updateData) => {
        try {
            setLoading(true);
            // Giả lập API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            setOrder(prev => ({
                ...prev,
                status: updateData.status,
                trackingInfo: updateData.trackingInfo
            }));

            toast.success('Cập nhật trạng thái thành công');
        } catch (error) {
            toast.error('Có lỗi xảy ra khi cập nhật trạng thái');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!order) {
        return <div>Không tìm thấy đơn hàng</div>;
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
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
                            Chi tiết đơn hàng #{order.id}
                        </h1>
                        <p className="text-gray-600">
                            Đặt ngày {formatDate(order.orderDate)}
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
                                    <div key={item.id} className="py-4 flex items-center space-x-4">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-16 h-16 rounded-lg object-cover"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-900">{item.name}</h3>
                                            <p className="text-sm text-gray-500">{item.variant}</p>
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
                                    <p className="font-medium">{order.customer.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Số điện thoại</p>
                                    <p className="font-medium">{order.customer.phone}</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="font-medium">{order.customer.email}</p>
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
                                    <p className="text-sm text-gray-500">Địa chỉ giao hàng</p>
                                    <p className="font-medium">
                                        {order.shippingAddress.street}, {order.shippingAddress.ward},
                                        {order.shippingAddress.district}, {order.shippingAddress.city}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Phương thức vận chuyển</p>
                                    <p className="font-medium">{order.shippingMethod}</p>
                                </div>
                                {/* Thêm thông tin tracking nếu có */}
                                {order.trackingInfo && (
                                    <>
                                        <div>
                                            <p className="text-sm text-gray-500">Đơn vị vận chuyển</p>
                                            <p className="font-medium">{order.trackingInfo.carrier}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Mã vận đơn</p>
                                            <p className="font-medium">{order.trackingInfo.trackingNumber}</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Order Notes */}
                    {order.notes && order.notes.length > 0 && (
                        <div className="bg-white rounded-lg shadow">
                            <div className="p-4 border-b bg-gray-50">
                                <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                                    <FiEdit /> Ghi chú đơn hàng
                                </h2>
                            </div>
                            <div className="p-4">
                                <div className="space-y-4">
                                    {order.notes.map((note, index) => (
                                        <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                                            <p className="text-gray-600">{note.content}</p>
                                            <div className="mt-2 flex justify-between text-sm text-gray-500">
                                                <span>{note.author}</span>
                                                <span>{formatDate(note.createdAt)}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
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
                                    <span className="font-medium text-red-600">-{formatPrice(order.discount)}</span>
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
                            </div>
                        </div>
                        {/* Order Summary Actions */}
                        <div className="p-4 border-t">
                            <div className="space-y-3">
                                {/* Cập nhật trạng thái */}
                                <UpdateOrderStatus
                                    currentStatus={order.status}
                                    onUpdateStatus={handleUpdateStatus}
                                />

                                {/* In hóa đơn */}
                                <PrintInvoice order={order} />

                                {/* Xem lịch sử */}
                                <button
                                    onClick={() => navigate(`/admin/orders/order-activity-log/${order.id}`)}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50"
                                >
                                    <FiClock />
                                    Xem lịch sử đơn hàng
                                </button>

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