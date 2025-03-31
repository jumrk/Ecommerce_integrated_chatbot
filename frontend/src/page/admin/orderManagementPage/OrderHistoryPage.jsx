import React, { useState } from 'react';
import { FiSearch, FiFilter, FiEye } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../../component/common/LoadingSpinner';
import StatusBadge from '../../../component/condition/ConditionCustom';
import ButtonViewMore from '../../../component/button/ButtonViewMore';
import Pagination from '../../../component/pagination/Pagination';
const OrderHistoryPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [filterOpen, setFilterOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    // Giả lập loading
    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    // Dữ liệu mẫu - chỉ lấy đơn hàng đã hoàn thành hoặc đã hủy
    const completedOrders = [
        {
            id: "DH001",
            customerName: "Nguyễn Văn A",
            phone: "0123456789",
            totalAmount: 2990000,
            status: "Đã giao", // đã giao
            paymentStatus: "Đã thanh toán",
            completedDate: "2024-03-10T08:00:00Z",
            items: 3
        },
        {
            id: "DH002",
            customerName: "Trần Thị B",
            phone: "0987654321",
            totalAmount: 1500000,
            status: "Đã hủy", // đã hủy
            paymentStatus: "Đã hoàn tiền",
            completedDate: "2024-03-12T09:30:00Z",
            items: 2,
            cancelReason: "Khách hàng yêu cầu hủy"
        },
        {
            id: "DH003",
            customerName: "Lê Văn C",
            phone: "0369852147",
            totalAmount: 5600000,
            status: "Đã giao",
            paymentStatus: "Đã thanh toán",
            completedDate: "2024-03-14T15:20:00Z",
            items: 4
        },
        {
            id: "DH004",
            customerName: "Trần Thị B",
            phone: "0987654321",
            totalAmount: 1500000,
            status: "Đã hủy", // đã hủy
            paymentStatus: "Đã hoàn tiền",
            completedDate: "2024-03-12T09:30:00Z",
            items: 2,
            cancelReason: "Khách hàng yêu cầu hủy"
        },
        {
            id: "DH005",
            customerName: "Lê Văn C",
            phone: "0369852147",
            totalAmount: 5600000,
            status: "Đã giao",
            paymentStatus: "Đã thanh toán",
            completedDate: "2024-03-14T15:20:00Z",
            items: 4
        },
        {
            id: "DH006",
            customerName: "Trần Thị B",
            phone: "0987654321",
            totalAmount: 1500000,
            status: "Đã hủy", // đã hủy
            paymentStatus: "Đã hoàn tiền",
            completedDate: "2024-03-12T09:30:00Z",
            items: 2,
            cancelReason: "Khách hàng yêu cầu hủy"
        },
        {
            id: "DH007",
            customerName: "Lê Văn C",
            phone: "0369852147",
            totalAmount: 5600000,
            status: "Đã giao",
            paymentStatus: "Đã thanh toán",
            completedDate: "2024-03-14T15:20:00Z",
            items: 4
        },
        {
            id: "DH008",
            customerName: "Trần Thị B",
            phone: "0987654321",
            totalAmount: 1500000,
            status: "Đã hủy", // đã hủy
            paymentStatus: "Đã hoàn tiền",
            completedDate: "2024-03-12T09:30:00Z",
            items: 2,
            cancelReason: "Khách hàng yêu cầu hủy"
        },
        {
            id: "DH009",
            customerName: "Lê Văn C",
            phone: "0369852147",
            totalAmount: 5600000,
            status: "Đã giao",
            paymentStatus: "Đã thanh toán",
            completedDate: "2024-03-14T15:20:00Z",
            items: 4
        },
        {
            id: "DH010",
            customerName: "Lê Văn C",
            phone: "0369852147",
            totalAmount: 5600000,
            status: "Đã giao",
            paymentStatus: "Đã thanh toán",
            completedDate: "2024-03-14T15:20:00Z",
            items: 4
        },
        {
            id: "DH011",
            customerName: "Lê Văn C",
            phone: "0369852147",
            totalAmount: 5600000,
            status: "Đã giao",
            paymentStatus: "Đã thanh toán",
            completedDate: "2024-03-14T15:20:00Z",
            items: 4
        },
        {
            id: "DH012",
            customerName: "Lê Văn C",
            phone: "0369852147",
            totalAmount: 5600000,
            status: "Đã giao",
            paymentStatus: "Đã thanh toán",
            completedDate: "2024-03-14T15:20:00Z",
            items: 4
        },
    ];

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

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentOrders = completedOrders.slice(indexOfFirstItem, indexOfLastItem);
    if (loading) return <LoadingSpinner />;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Lịch sử đơn hàng</h1>
                <div className="flex gap-4">
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        Xuất Excel
                    </button>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Tìm kiếm đơn hàng..."
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
                    <select className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="all">Tất cả trạng thái</option>
                        <option value="completed">Đã giao</option>
                        <option value="cancelled">Đã hủy</option>
                    </select>
                </div>

                {filterOpen && (
                    <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Từ ngày
                            </label>
                            <input
                                type="date"
                                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Đến ngày
                            </label>
                            <input
                                type="date"
                                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Trạng thái thanh toán
                            </label>
                            <select className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">Tất cả</option>
                                <option value="paid">Đã thanh toán</option>
                                <option value="refunded">Đã hoàn tiền</option>
                            </select>
                        </div>
                        <div className="flex items-end">
                            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                Áp dụng
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Mã đơn hàng
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Khách hàng
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tổng tiền
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Trạng thái
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thanh toán
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ngày hoàn thành
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="font-medium text-blue-600">#{order.id}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <div className="font-medium text-gray-900">
                                                {order.customerName}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {order.phone}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-medium text-gray-900">
                                            {formatPrice(order.totalAmount)}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {order.items} sản phẩm
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {order.status == 'Đã giao' ? <StatusBadge type="success" text={order.status} /> :
                                            order.status == 'Đã hủy' ? <StatusBadge type="danger" text={order.status} /> :
                                                <StatusBadge type="info" text={order.status} />}
                                        {order.cancelReason && (
                                            <div className="text-sm text-gray-500 mt-1">
                                                {order.cancelReason}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {order.paymentStatus == 'Đã thanh toán' ? <StatusBadge type="success" text={order.paymentStatus} /> :
                                            order.paymentStatus == 'Đã hoàn tiền' ? <StatusBadge type="danger" text={order.paymentStatus} /> :
                                                <StatusBadge type="info" text={order.paymentStatus} />}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                        {formatDate(order.completedDate)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <ButtonViewMore
                                            onClick={() => navigate(`/admin/orders/order-detail/${order.id}`)}
                                            text="Chi tiết"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalItems={completedOrders.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div >
    );
};

export default OrderHistoryPage;