import React, { useEffect, useState } from 'react';
import { FiPackage, FiCheck, FiTruck, FiEye, FiX } from 'react-icons/fi';
import { cancelOrder, getOrderByIdForUser } from '../../api/order/orderService';
import Pagination from '../pagination/Pagination';
import { SlideInWhenVisible } from '../animation/SlideInWhenVisible';
import ConfirmDialog from '../common/ConfirmDialog';
import Notification from '../notification/Notification';
import EmptyState from '../EmptyState/EmptyState';
const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterStatus, setFilterStatus] = useState('all');
    const itemsPerPage = 3;
    const [loading, setLoading] = useState(true);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [orderCancel, setOrderCancel] = useState(null);
    const [notification, setNotification] = useState({ message: '', type: '' });

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await getOrderByIdForUser();
            setOrders(response);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const getStatusStyle = {
        ordered: { color: 'bg-gray-100 text-gray-800', label: 'Đã đặt hàng' },
        confirmed: { color: 'bg-yellow-100 text-yellow-800', label: 'Đã xác nhận' },
        delivering: { color: 'bg-blue-100 text-blue-800', label: 'Đang giao' },
        completed: { color: 'bg-green-100 text-green-800', label: 'Đã giao' },
        cancelled: { color: 'bg-red-100 text-red-800', label: 'Đã hủy' },
    };

    const getStatusColor = (status) => {
        return getStatusStyle[status]?.color || 'bg-gray-100 text-gray-800';
    };

    const getStatusText = (status) => {
        return getStatusStyle[status]?.label || 'Không xác định';
    };

    const handleCancelOrder = (orderId) => {
        setOrderCancel(orderId);
        setIsConfirmDialogOpen(true);
    };


    const confirmCancelOrder = async () => {
        try {
            setSelectedOrder(null);
            setIsConfirmDialogOpen(false);
            setLoading(true);
            const response = await cancelOrder(orderCancel);
            const data = response;
            if (data.success) {
                setLoading(false);
                setNotification({ message: data.message, type: 'success' });
                fetchOrders();
            } else {
                setNotification({ message: data.message, type: 'error' });
            }
        } catch (error) {
            console.error('Error deleting order:', error);
            setNotification({ message: 'Lỗi khi xóa đơn hàng ❌', type: 'error' });
        }
    };

    // Filter orders based on selected status
    const filteredOrders = orders
        .filter(order =>
            filterStatus === 'all' ? true : order.status === filterStatus
        );

    // Calculate the orders to display based on the current page
    const indexOfLastOrder = currentPage * itemsPerPage;
    const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    return (
        <>
            {/* Danh sách đơn hàng */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Đơn hàng của tôi</h2>

                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setFilterStatus('all')}
                        className={`px-4 py-2 rounded-lg transition-all ${filterStatus === 'all'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            }`}
                    >
                        Tất cả
                    </button>
                    <button
                        onClick={() => setFilterStatus('ordered')}
                        className={`px-4 py-2 rounded-lg transition-all ${filterStatus === 'ordered'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            }`}
                    >
                        Chưa xác nhận
                    </button>
                    <button
                        onClick={() => setFilterStatus('confirmed')}
                        className={`px-4 py-2 rounded-lg transition-all ${filterStatus === 'confirmed'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            }`}
                    >
                        Đã xác nhận
                    </button>
                    <button
                        onClick={() => setFilterStatus('delivering')}
                        className={`px-4 py-2 rounded-lg transition-all ${filterStatus === 'delivering'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            }`}
                    >
                        Đang giao
                    </button>
                    <button
                        onClick={() => setFilterStatus('completed')}
                        className={`px-4 py-2 rounded-lg transition-all ${filterStatus === 'completed'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            }`}
                    >
                        Thành công
                    </button>
                    <button
                        onClick={() => setFilterStatus('cancelled')}
                        className={`px-4 py-2 rounded-lg transition-all ${filterStatus === 'cancelled'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
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
                                subtitle='Bạn chưa có đơn hàng nào cả hãy chọn sản phẩm yêu thích của mình rồi thanh toán nha 🫶'
                                title='Chưa có đơn hàng nào'
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

                                            <button
                                                onClick={() => setSelectedOrder(order)}
                                                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
                                            >
                                                <FiEye className="w-4 h-4" />
                                                <span>Xem chi tiết</span>
                                            </button>
                                        </div>
                                    </div>
                                </SlideInWhenVisible>
                            ))
                        )}
                        { }
                    </div>
                )}
            </div >

            {/* Pagination Component */}
            {
                !loading && currentOrders.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalItems={filteredOrders.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={setCurrentPage}
                    />
                )
            }

            {/* Modal Chi tiết đơn hàng */}
            {
                selectedOrder && (
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
                                {/* Quick Actions */}
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                                        <span className={`px-3 py-1.5 rounded-full text-sm font-medium inline-flex items-center gap-2 ${getStatusColor(selectedOrder.status)}`}>
                                            {selectedOrder.status === 'delivering' && <FiTruck className="w-4 h-4" />}
                                            {selectedOrder.status === 'completed' && <FiCheck className="w-4 h-4" />}
                                            {getStatusText(selectedOrder.status)}
                                        </span>
                                    </div>
                                    {selectedOrder.canCancel && (
                                        <button
                                            onClick={() => handleCancelOrder(selectedOrder._id)}
                                            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all w-full sm:w-auto text-center"
                                        >
                                            Hủy đơn hàng
                                        </button>
                                    )}
                                </div>

                                {/* Shipper Info */}
                                {selectedOrder.shipper && (
                                    <div className="border rounded-xl p-4">
                                        <h4 className="font-semibold mb-4">Thông tin người giao hàng</h4>
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                            <div className="flex items-center gap-4 flex-1">
                                                <img
                                                    src='https://th.bing.com/th/id/R.e819daa555ac4020c0a2f1265a485cbd?rik=wk%2f9HcdNFMDrsQ&pid=ImgRaw&r=0'
                                                    alt="Shipper"
                                                    className="w-12 h-12 rounded-full"
                                                />
                                                <div>
                                                    <p className="font-medium">{selectedOrder.shipper.name}</p>
                                                    <p className="text-gray-600">{selectedOrder.shipper.phone}</p>
                                                </div>
                                            </div>
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
                                                    <p className="text-sm text-gray-500">{new Date(item.time).toLocaleString()}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Thông tin giao hàng */}
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

                                {/* Danh sách sản phẩm */}
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

                                {/* Tổng tiền */}
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

                                {/* Thông tin thanh toán */}
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
                )
            }


            {/* Confirm Dialog */}
            <ConfirmDialog
                isOpen={isConfirmDialogOpen}
                title="Xác nhận xóa đơn hàng"
                message="Bạn có chắc chắn muốn xóa đơn hàng này không?"
                onConfirm={confirmCancelOrder}
                onClose={() => setIsConfirmDialogOpen(false)}
            />

            {/* Notification */}
            {
                notification.message && (
                    <Notification
                        message={notification.message}
                        type={notification.type}
                        onClose={() => setNotification({ message: '', type: '' })}
                    />
                )
            }
        </>
    );
};

export default OrderList;