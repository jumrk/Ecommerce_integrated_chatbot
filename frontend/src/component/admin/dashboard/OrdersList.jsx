import React, { useEffect, useState } from 'react';
import { FiPackage, FiCheck, FiTruck, FiEye, FiX } from 'react-icons/fi';
import { getAllOrder } from '../../../api/order/orderService';
import { SlideInWhenVisible } from '../../animation/SlideInWhenVisible';
import EmptyState from '../../EmptyState/EmptyState';

const OrdersList = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeFilter, setActiveFilter] = useState('all');
    const itemsPerPage = 3;
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await getAllOrder();
            setOrders(response);
            setFilteredOrders(response);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        if (activeFilter === 'all') {
            setFilteredOrders(orders);
        } else {
            setFilteredOrders(orders.filter(order => order.status === activeFilter));
        }
        setCurrentPage(1);
    }, [activeFilter, orders]);

    const getStatusStyle = {
        ordered: { color: 'bg-gray-100 text-gray-800', label: 'Chưa xác nhận' },
        confirmed: { color: 'bg-yellow-100 text-yellow-800', label: 'Đã xác nhận' },
        delivering: { color: 'bg-blue-100 text-blue-800', label: 'Đang giao' },
        completed: { color: 'bg-green-100 text-green-800', label: 'Thành công' },
        cancelled: { color: 'bg-red-100 text-red-800', label: 'Đã hủy' },
    };

    const getStatusColor = (status) => {
        return getStatusStyle[status]?.color || 'bg-gray-100 text-gray-800';
    };

    const getStatusText = (status) => {
        return getStatusStyle[status]?.label || 'Không xác định';
    };

    // Calculate the orders to display based on the current page
    const indexOfLastOrder = currentPage * itemsPerPage;
    const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Danh sách đơn hàng</h2>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => setActiveFilter('all')}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${activeFilter === 'all'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                >
                    Tất cả
                </button>
                <button
                    onClick={() => setActiveFilter('ordered')}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${activeFilter === 'ordered'
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                        }`}
                >
                    Chưa xác nhận
                </button>
                <button
                    onClick={() => setActiveFilter('confirmed')}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${activeFilter === 'confirmed'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
                        }`}
                >
                    Đã xác nhận
                </button>
                <button
                    onClick={() => setActiveFilter('delivering')}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${activeFilter === 'delivering'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                        }`}
                >
                    Đang giao
                </button>
                <button
                    onClick={() => setActiveFilter('completed')}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${activeFilter === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-green-50 text-green-600 hover:bg-green-100'
                        }`}
                >
                    Thành công
                </button>
                <button
                    onClick={() => setActiveFilter('cancelled')}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${activeFilter === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-red-50 text-red-600 hover:bg-red-100'
                        }`}
                >
                    Đã hủy
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <span className="ml-4 text-gray-600">Đang tải đơn hàng...</span>
                </div>
            ) : (
                <div className="space-y-4">
                    {currentOrders.length === 0 ? (
                        <EmptyState
                            image='shopping.png'
                            subtitle='Không có đơn hàng nào'
                            title='Danh sách trống'
                        />
                    ) : (
                        currentOrders.map(order => (
                            <SlideInWhenVisible key={order._id} direction="up" distance={50} delay={0.1}>
                                <div className="border border-gray-200 rounded-xl overflow-hidden">
                                    <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <FiPackage className="w-5 h-5 text-gray-500" />
                                            <span className="font-medium">Đơn hàng #{order.orderCode}</span>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                            {getStatusText(order.status)}
                                        </span>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                            <span>Ngày đặt: {new Date(order.createdAt).toLocaleDateString()}</span>
                                            <span>Tổng tiền: {order.total.toLocaleString()}đ</span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => setSelectedOrder(order)}
                                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
                                            >
                                                <FiEye className="w-4 h-4" />
                                                <span>Xem chi tiết</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </SlideInWhenVisible>
                        ))
                    )}
                </div>
            )}

            {/* Pagination */}
            {!loading && filteredOrders.length > itemsPerPage && (
                <div className="flex justify-center mt-4">
                    <div className="flex gap-2">
                        {Array.from({ length: Math.ceil(filteredOrders.length / itemsPerPage) }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${currentPage === i + 1
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Order Detail Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
                            <h3 className="text-xl font-bold">Chi tiết đơn hàng #{selectedOrder.orderCode}</h3>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-all"
                            >
                                <FiX className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Status */}
                            <div className="flex items-center gap-2">
                                <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                                    {getStatusText(selectedOrder.status)}
                                </span>
                            </div>

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
                                                <p className="text-sm text-gray-500">{new Date(item.time).toLocaleString()}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Shipping Info */}
                            <div className="border rounded-xl p-4">
                                <h4 className="font-semibold mb-4">Thông tin giao hàng</h4>
                                <div className="space-y-2">
                                    <p><span className="text-gray-600">Người nhận:</span> {selectedOrder.addressId.receiver}</p>
                                    <p><span className="text-gray-600">Số điện thoại:</span> {selectedOrder.addressId.phone}</p>
                                    <p>
                                        <span className="text-gray-600">Địa chỉ:</span>{' '}
                                        {selectedOrder.addressId.address + ', ' +
                                            selectedOrder.addressId.ward + ', ' +
                                            selectedOrder.addressId.district + ', ' +
                                            selectedOrder.addressId.province}
                                    </p>
                                    <p><span className="text-gray-600">Phương thức vận chuyển:</span> {selectedOrder.shippingMethod}</p>
                                </div>
                            </div>

                            {/* Products */}
                            <div className="border rounded-xl p-4">
                                <h4 className="font-semibold mb-4">Sản phẩm</h4>
                                <div className="space-y-4">
                                    {selectedOrder.items.map((item) => (
                                        <div key={item.productId} className="flex items-center gap-4">
                                            <img
                                                src={import.meta.env.VITE_API_URL + item.productId.images[0]}
                                                className="w-20 h-20 object-cover rounded-lg"
                                            />
                                            <div className="flex-1">
                                                <h5 className="font-medium">{item.productId.name}</h5>
                                                <p className="text-gray-500">Số lượng: {item.quantity}</p>
                                                <div className='flex items-center gap-1'>
                                                    <h5 className="text-gray-500">{item.size}</h5>/
                                                    <span
                                                        className="inline-flex border items-center w-5 h-5 rounded-full"
                                                        style={{ backgroundColor: item.color }}
                                                    ></span>
                                                </div>
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

                            {/* Payment Info */}
                            <div className="border rounded-xl p-4">
                                <h4 className="font-semibold mb-4">Thanh toán</h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Tổng tiền hàng</span>
                                        <span>{selectedOrder.subtotal.toLocaleString()}đ</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Phí vận chuyển</span>
                                        <span>{selectedOrder.shippingFee.toLocaleString()}đ</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Giảm giá</span>
                                        <span>{selectedOrder.discount.toLocaleString()}đ</span>
                                    </div>
                                    <div className="flex justify-between font-medium pt-2 border-t">
                                        <span>Tổng thanh toán</span>
                                        <span className="text-blue-600">
                                            {selectedOrder.total.toLocaleString()}đ
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="border rounded-xl p-4">
                                <h4 className="font-semibold mb-4">Phương thức thanh toán</h4>
                                <p>{selectedOrder.paymentMethod}</p>
                            </div>
                            <div className="border rounded-xl p-4">
                                <h4 className="font-semibold mb-4">Tình trạng thanh toán</h4>
                                <p>{selectedOrder.paymentStatus}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrdersList;