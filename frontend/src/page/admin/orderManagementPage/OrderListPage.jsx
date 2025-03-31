import React, { useState } from 'react';
import { FiSearch, FiFilter, FiEye } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../../component/common/LoadingSpinner';
import StatusBadge from '../../../component/condition/ConditionCustom';
import ButtonViewMore from '../../../component/button/ButtonViewMore';
import Pagination from '../../../component/pagination/Pagination';
const OrderListPage = () => {
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

    // Dữ liệu mẫu
    const orders = [
        {
            id: "DH001",
            customerName: "Nguyễn Văn A",
            phone: "0123456789",
            totalAmount: 2990000,
            status: "pending",
            paymentMethod: "COD",
            orderDate: "2024-03-15T08:00:00Z",
            items: 3
        },
        {
            id: "DH002",
            customerName: "Trần Thị B",
            phone: "0987654321",
            totalAmount: 1500000,
            status: "processing",
            paymentMethod: "Banking",
            orderDate: "2024-03-15T09:30:00Z",
            items: 2
        },
        {
            id: "DH003",
            customerName: "Lê Văn C",
            phone: "0369852147",
            totalAmount: 5600000,
            status: "completed",
            paymentMethod: "Momo",
            orderDate: "2024-03-14T15:20:00Z",
            items: 4
        },
        {
            id: "DH004",
            customerName: "Nguyễn Thị D",
            phone: "0912345678",
            totalAmount: 3200000,
            status: "cancelled",
            paymentMethod: "Banking",
            orderDate: "2024-03-13T10:45:00Z",
            items: 1
        },
        {
            id: "DH005",
            customerName: "Trần Văn E",
            phone: "0987654321",
            totalAmount: 4500000,
            status: "processing",
            paymentMethod: "Momo",
            orderDate: "2024-03-12T14:30:00Z",
            items: 2
        },
        {
            id: "DH006",
            customerName: "Lê Thị F",
            phone: "0369852147",
            totalAmount: 2800000,
            status: "completed",
            paymentMethod: "Banking",
            orderDate: "2024-03-11T16:15:00Z",
            items: 1
        },
        {
            id: "DH007",
            customerName: "Nguyễn Văn G",
            phone: "0987654321",
            totalAmount: 3800000,
            status: "processing",
            paymentMethod: "Momo",
            orderDate: "2024-03-10T12:00:00Z",
            items: 3
        },
        {
            id: "DH008",
            customerName: "Trần Thị H",
            phone: "0912345678",
            totalAmount: 2500000,
            status: "cancelled",
            paymentMethod: "Banking",
            orderDate: "2024-03-09T18:30:00Z",
            items: 1
        },
        {
            id: "DH009",
            customerName: "Lê Văn I",
            phone: "0369852147",
            totalAmount: 4200000,
            status: "processing",
            paymentMethod: "Momo",
            orderDate: "2024-03-08T11:00:00Z",
            items: 2
        },
        {
            id: "DH010",
            customerName: "Nguyễn Thị K",
            phone: "0912345678",
            totalAmount: 3500000,
            status: "completed",
            paymentMethod: "Banking",
            orderDate: "2024-03-07T13:45:00Z",
            items: 1
        },
        {
            id: "DH011",
            customerName: "Trần Văn L",
            phone: "0987654321",
            totalAmount: 4800000,
            status: "processing",
            paymentMethod: "Momo",
            orderDate: "2024-03-06T15:30:00Z",
            items: 2
        },

    ];
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);
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
        return <LoadingSpinner />;
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Quản lý đơn hàng</h1>
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
                        <option value="">Tất cả trạng thái</option>
                        <option value="pending">Chờ xác nhận</option>
                        <option value="processing">Đang xử lý</option>
                        <option value="completed">Hoàn thành</option>
                        <option value="cancelled">Đã hủy</option>
                    </select>
                </div>

                {filterOpen && (
                    <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4">
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
                                Phương thức thanh toán
                            </label>
                            <select className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">Tất cả</option>
                                <option value="COD">COD</option>
                                <option value="Banking">Chuyển khoản</option>
                                <option value="Momo">Ví Momo</option>
                            </select>
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
                                    Ngày đặt
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
                                        {order.status == 'pending' ? <StatusBadge type="warning" text={order.status} /> :
                                            order.status == 'processing' ? <StatusBadge type="info" text={order.status} /> :
                                                order.status == 'completed' ? <StatusBadge type="success" text={order.status} /> :
                                                    <StatusBadge type="danger" text={order.status} />}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                        {order.paymentMethod}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                        {formatDate(order.orderDate)}
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
                    totalItems={orders.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default OrderListPage;