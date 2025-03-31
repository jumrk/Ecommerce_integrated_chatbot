import React, { useState } from 'react';
import { FiSearch, FiFilter, FiEdit2, FiUser } from 'react-icons/fi';
import LoadingSpinner from '../../../component/common/LoadingSpinner';
import Pagination from '../../../component/pagination/Pagination';
import { formatDate } from '../../../utils/format/formatDate';
import AssignShipperModal from '../../../component/admin/shippingMethodManagement/AssignShipperModal';
import { toast } from 'react-toastify';

const ShippingListPage = () => {
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterOpen, setFilterOpen] = useState(false);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [selectedShipping, setSelectedShipping] = useState(null);
    const itemsPerPage = 10;

    const [shippings, setShippings] = useState([
        {
            id: "SHP001",
            orderId: "ORD001",
            customerName: "Nguyễn Văn A",
            address: "123 Đường ABC, Quận 1, TP.HCM",
            phone: "0123456789",
            method: "internal", // internal, store_pickup, cod
            status: "pending", // pending, delivering, delivered, failed
            expectedDate: "2024-03-20T10:00:00Z",
            shipper: null,
            createdAt: "2024-03-15T10:30:00Z",
            items: [
                { name: "Áo thun nam", quantity: 2 },
                { name: "Quần jean", quantity: 1 }
            ]
        },
        // Thêm dữ liệu mẫu khác...
    ]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const handleUpdateStatus = (shipping) => {
        setSelectedShipping(shipping);
        setShowStatusModal(true);
    };

    const handleAssignShipper = (shipping) => {
        setSelectedShipping(shipping);
        setShowAssignModal(true);
    };

    const getMethodText = (method) => {
        switch (method) {
            case 'internal':
                return 'Giao hàng nội bộ';
            case 'store_pickup':
                return 'Nhận tại cửa hàng';
            case 'cod':
                return 'Ship COD';
            default:
                return method;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'delivered':
                return 'bg-green-100 text-green-800';
            case 'delivering':
                return 'bg-blue-100 text-blue-800';
            case 'failed':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-yellow-100 text-yellow-800';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'pending':
                return 'Chờ giao hàng';
            case 'delivering':
                return 'Đang giao';
            case 'delivered':
                return 'Đã giao';
            case 'failed':
                return 'Giao thất bại';
            default:
                return status;
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Quản lý vận chuyển</h1>
                </div>

                {/* Search and Filter */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm theo mã đơn, tên khách hàng..."
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
                    </div>

                    {filterOpen && (
                        <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Trạng thái
                                </label>
                                <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Tất cả</option>
                                    <option value="pending">Chờ giao hàng</option>
                                    <option value="delivering">Đang giao</option>
                                    <option value="delivered">Đã giao</option>
                                    <option value="failed">Giao thất bại</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phương thức
                                </label>
                                <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Tất cả</option>
                                    <option value="internal">Giao hàng nội bộ</option>
                                    <option value="store_pickup">Nhận tại cửa hàng</option>
                                    <option value="cod">Ship COD</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Từ ngày
                                </label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Đến ngày
                                </label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Shippings Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Mã vận đơn
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thông tin giao hàng
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Phương thức
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Trạng thái
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ngày dự kiến
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {shippings.map((shipping) => (
                                <tr key={shipping.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-blue-600">
                                            {shipping.id}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {shipping.orderId}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">
                                            {shipping.customerName}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {shipping.phone}
                                        </div>
                                        <div className="text-sm text-gray-500 line-clamp-2">
                                            {shipping.address}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {getMethodText(shipping.method)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(shipping.status)}`}>
                                            {getStatusText(shipping.status)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {formatDate(shipping.expectedDate)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="gap-2">
                                            {shipping.method === 'internal' && (
                                                <button
                                                    onClick={() => handleAssignShipper(shipping)}
                                                    className="text-green-600 hover:text-green-900"
                                                    title="Gán shipper"
                                                >
                                                    <FiUser className="h-5 w-5" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Pagination
                        currentPage={currentPage}
                        totalItems={shippings.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>

            {/* Assign Shipper Modal */}
            <AssignShipperModal
                isOpen={showAssignModal}
                onClose={() => {
                    setShowAssignModal(false);
                    setSelectedShipping(null);
                }}
                shipping={selectedShipping}
                onAssign={(shipperId) => {
                    // Xử lý gán shipper
                    setShippings(shippings.map(s =>
                        s.id === selectedShipping.id ? { ...s, shipperId } : s
                    ));
                    toast.success('Gán shipper thành công');
                    setShowAssignModal(false);
                    setSelectedShipping(null);
                }}
            />
        </div>
    );
};

export default ShippingListPage;