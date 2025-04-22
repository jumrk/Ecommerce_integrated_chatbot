import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../component/loading/loading';
import StatusBadge from '../../../component/condition/ConditionCustom';
import ButtonViewMore from '../../../component/button/ButtonViewMore';
import Pagination from '../../../component/pagination/Pagination';
import { getAllOrder } from '../../../api/order/orderService';
import { Helmet } from 'react-helmet';

const OrderListPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');

    const statusOptions = [
        { value: '', label: 'Tất cả trạng thái' },
        { value: 'ordered', label: 'Chờ xác nhận' },
        { value: 'confirmed', label: 'Đã xác nhận' },
        { value: 'delivering', label: 'Đang giao hàng' },
        { value: 'completed', label: 'Hoàn thành' },
        { value: 'cancelled', label: 'Đã hủy' },
    ];

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Set loading to true before fetching
            const response = await getAllOrder();
            setOrders(response);
            setLoading(false); // Set loading to false after fetching
        };
        fetchData();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const filteredOrders = orders
        .filter(order => {
            const matchesSearch = order.orderCode.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = selectedStatus ? order.status === selectedStatus : true;
            return matchesSearch && matchesStatus;
        });
    const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

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

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <Helmet>
                <title>Danh sách đơn hàng</title>
            </Helmet>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Quản lý đơn hàng</h1>
            </div>

            {/* Search and Filter */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Tìm kiếm đơn hàng..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {statusOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã đơn hàng</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khách hàng</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng tiền</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thanh toán</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày đặt</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentOrders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="font-medium text-blue-600">#{order.orderCode}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <div className="font-medium text-gray-900">{order.userId.fullName}</div>
                                            <div className="text-sm text-gray-500">{order.userId.phone}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-medium text-gray-900">{formatPrice(order.total)}</div>
                                        <div className="text-sm text-gray-500">{order.items.length} sản phẩm</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {order.status === 'ordered' ? <StatusBadge type="warning" text='Đã đặt hàng' /> :
                                            order.status === 'confirmed' ? <StatusBadge type="info" text='Đã xác nhận' /> :
                                                order.status === 'delivering' ? <StatusBadge type='info' text='Đang vận chuyển' /> :
                                                    order.status === 'completed' ? <StatusBadge type="success" text='Đã giao' /> :
                                                        <StatusBadge type="danger" text='Đã hủy' />}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{order.paymentMethod}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{formatDate(order.createdAt)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <ButtonViewMore onClick={() => {
                                            setLoading(true); // Set loading to true when the button is clicked
                                            navigate(`/admin/orders/order-detail/${order._id}`);
                                            setLoading(false); // Set loading to false immediately after navigating
                                        }} text="Chi tiết" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalItems={orders.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default OrderListPage;