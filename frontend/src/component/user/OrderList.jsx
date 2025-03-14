import React, { useState } from 'react';
import { FiPackage, FiCheck, FiTruck, FiEye, FiX, FiMessageSquare, FiStar, FiMapPin } from 'react-icons/fi';

const OrderList = () => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [selectedRating, setSelectedRating] = useState(0);
    const [ratingComment, setRatingComment] = useState('');

    const orders = [
        {
            id: 'DH001',
            date: '2024-03-20',
            total: 1500000,
            status: 'delivering',
            paymentMethod: 'COD',
            shippingFee: 30000,
            canCancel: true,
            canRate: false,
            trackingNumber: 'TK123456789',
            estimatedDelivery: '2024-03-22',
            address: {
                receiver: 'Nguyễn Văn A',
                phone: '0123456789',
                address: '123 Đường ABC, Phường XYZ, Quận 1, TP.HCM'
            },
            shipper: {
                name: 'Trần Văn B',
                phone: '0987654321',
                avatar: 'https://via.placeholder.com/50'
            },
            items: [
                {
                    id: 1,
                    name: 'Áo thun nam basic',
                    quantity: 2,
                    price: 750000,
                    image: 'https://via.placeholder.com/150',
                    rated: false
                },
                {
                    id: 2,
                    name: 'Quần jean slim fit',
                    quantity: 1,
                    price: 550000,
                    image: 'https://via.placeholder.com/150',
                    rated: false
                }
            ],
            timeline: [
                { status: 'ordered', time: '2024-03-20 08:30', text: 'Đặt hàng thành công' },
                { status: 'confirmed', time: '2024-03-20 09:15', text: 'Đã xác nhận đơn hàng' },
                { status: 'delivering', time: '2024-03-20 14:20', text: 'Đang giao hàng' }
            ]
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'delivering': return 'bg-blue-100 text-blue-800';
            case 'completed': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'pending': return 'Chờ xử lý';
            case 'delivering': return 'Đang giao';
            case 'completed': return 'Đã giao';
            default: return 'Không xác định';
        }
    };

    const handleCancelOrder = (orderId) => {
        console.log('Hủy đơn hàng:', orderId);
    };

    const handleSubmitRating = () => {
        console.log('Đánh giá:', { rating: selectedRating, comment: ratingComment });
        setShowRatingModal(false);
    };

    return (
        <>
            {/* Danh sách đơn hàng */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Đơn hàng của tôi</h2>

                <div className="space-y-4">
                    {orders.map(order => (
                        <div key={order.id} className="border border-gray-200 rounded-xl overflow-hidden">
                            <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <FiPackage className="w-5 h-5 text-gray-500" />
                                    <span className="font-medium">Đơn hàng #{order.id}</span>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                    {getStatusText(order.status)}
                                </span>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                    <span>Ngày đặt: {order.date}</span>
                                    <span>Tổng tiền: {order.total.toLocaleString()}đ</span>
                                </div>

                                <button
                                    onClick={() => setSelectedOrder(order)}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
                                >
                                    <FiEye className="w-4 h-4" />
                                    <span>Xem chi tiết</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal Chi tiết đơn hàng */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
                            <h3 className="text-xl font-bold">Chi tiết đơn hàng #{selectedOrder.id}</h3>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-all"
                            >
                                <FiX className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Quick Actions */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                                    <span className={`px-3 py-1.5 rounded-full text-sm font-medium inline-flex items-center gap-2 ${getStatusColor(selectedOrder.status)}`}>
                                        {selectedOrder.status === 'delivering' && <FiTruck className="w-4 h-4" />}
                                        {selectedOrder.status === 'completed' && <FiCheck className="w-4 h-4" />}
                                        {getStatusText(selectedOrder.status)}
                                    </span>
                                    {selectedOrder.estimatedDelivery && (
                                        <span className="text-sm text-gray-500">
                                            Dự kiến giao: {selectedOrder.estimatedDelivery}
                                        </span>
                                    )}
                                </div>
                                {selectedOrder.canCancel && (
                                    <button
                                        onClick={() => handleCancelOrder(selectedOrder.id)}
                                        className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all w-full sm:w-auto text-center"
                                    >
                                        Hủy đơn hàng
                                    </button>
                                )}
                            </div>

                            {/* Tracking Info */}
                            <div className="flex flex-col sm:flex-row items-start gap-6 border rounded-xl p-4">
                                <div className="w-full sm:w-auto flex items-center sm:items-start gap-4">
                                    <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                                        <FiTruck className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold mb-2">Theo dõi đơn hàng</h4>
                                        <p className="text-gray-600 text-sm mb-2">Mã vận đơn: {selectedOrder.trackingNumber}</p>
                                        <button className="text-blue-600 text-sm hover:underline flex items-center gap-2">
                                            <FiMapPin className="w-4 h-4" />
                                            Theo dõi trên bản đồ
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Shipper Info */}
                            {selectedOrder.status === 'delivering' && selectedOrder.shipper && (
                                <div className="border rounded-xl p-4">
                                    <h4 className="font-semibold mb-4">Thông tin người giao hàng</h4>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                        <div className="flex items-center gap-4 flex-1">
                                            <img
                                                src={selectedOrder.shipper.avatar}
                                                alt="Shipper"
                                                className="w-12 h-12 rounded-full"
                                            />
                                            <div>
                                                <p className="font-medium">{selectedOrder.shipper.name}</p>
                                                <p className="text-gray-600">{selectedOrder.shipper.phone}</p>
                                            </div>
                                        </div>
                                        <button className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 w-full sm:w-auto flex items-center justify-center gap-2">
                                            <FiMessageSquare className="w-5 h-5" />
                                            <span className="sm:hidden">Liên hệ shipper</span>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Timeline */}
                            <div className="border rounded-xl p-4">
                                <h4 className="font-semibold mb-4">Trạng thái đơn hàng</h4>
                                <div className="space-y-4">
                                    {selectedOrder.timeline.map((item, index) => (
                                        <div key={index} className="flex items-start gap-4">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                                <FiCheck className="w-4 h-4 text-blue-600" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium">{item.text}</p>
                                                <p className="text-sm text-gray-500">{item.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Thông tin giao hàng */}
                            <div className="border rounded-xl p-4">
                                <h4 className="font-semibold mb-4">Thông tin giao hàng</h4>
                                <div className="space-y-2">
                                    <p><span className="text-gray-600">Người nhận:</span> {selectedOrder.address.receiver}</p>
                                    <p><span className="text-gray-600">Số điện thoại:</span> {selectedOrder.address.phone}</p>
                                    <p><span className="text-gray-600">Địa chỉ:</span> {selectedOrder.address.address}</p>
                                </div>
                            </div>

                            {/* Danh sách sản phẩm */}
                            <div className="border rounded-xl p-4">
                                <h4 className="font-semibold mb-4">Sản phẩm</h4>
                                <div className="space-y-4">
                                    {selectedOrder.items.map((item) => (
                                        <div key={item.id} className="flex items-center gap-4">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-20 h-20 object-cover rounded-lg"
                                            />
                                            <div className="flex-1">
                                                <h5 className="font-medium">{item.name}</h5>
                                                <p className="text-gray-500">Số lượng: {item.quantity}</p>
                                                {selectedOrder.status === 'completed' && !item.rated && (
                                                    <button
                                                        onClick={() => setShowRatingModal(true)}
                                                        className="mt-2 text-sm text-blue-600 hover:underline flex items-center gap-1"
                                                    >
                                                        <FiStar className="w-4 h-4" />
                                                        Đánh giá sản phẩm
                                                    </button>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium">{item.price.toLocaleString()}đ</p>
                                                <p className="text-sm text-gray-500">
                                                    {(item.price * item.quantity).toLocaleString()}đ
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tổng tiền */}
                            <div className="border rounded-xl p-4">
                                <h4 className="font-semibold mb-4">Thanh toán</h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Tổng tiền hàng</span>
                                        <span>{selectedOrder.total.toLocaleString()}đ</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Phí vận chuyển</span>
                                        <span>{selectedOrder.shippingFee.toLocaleString()}đ</span>
                                    </div>
                                    <div className="flex justify-between font-medium pt-2 border-t">
                                        <span>Tổng thanh toán</span>
                                        <span className="text-blue-600">
                                            {(selectedOrder.total + selectedOrder.shippingFee).toLocaleString()}đ
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Thông tin thanh toán */}
                            <div className="border rounded-xl p-4">
                                <h4 className="font-semibold mb-4">Phương thức thanh toán</h4>
                                <p>{selectedOrder.paymentMethod}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Đánh giá */}
            {showRatingModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Đánh giá sản phẩm</h3>
                            <button
                                onClick={() => setShowRatingModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-full"
                            >
                                <FiX className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-center gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => setSelectedRating(star)}
                                        className={`p-1 ${selectedRating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                                    >
                                        <FiStar className="w-8 h-8" fill={selectedRating >= star ? 'currentColor' : 'none'} />
                                    </button>
                                ))}
                            </div>

                            <textarea
                                value={ratingComment}
                                onChange={(e) => setRatingComment(e.target.value)}
                                placeholder="Nhập đánh giá của bạn..."
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                rows="4"
                            />

                            <button
                                onClick={handleSubmitRating}
                                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                            >
                                Gửi đánh giá
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default OrderList;