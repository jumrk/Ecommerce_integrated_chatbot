import React, { useState } from 'react';
import { FiSearch, FiFilter, FiDownload, FiEye } from 'react-icons/fi';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../../component/common/LoadingSpinner';
import ShippingHistory from '../../../component/admin/shippingMethodManagement/ShippingHistory';

const ShippingHistoryPage = () => {
    const [loading, setLoading] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedShipping, setSelectedShipping] = useState(null);
    const [filters, setFilters] = useState({
        dateRange: 'all',
        status: 'all',
        shipper: 'all',
        area: 'all'
    });

    // Mock data - thay thế bằng API call thực tế
    const [historyData] = useState([
        {
            id: 1,
            orderId: "ORD001",
            customerName: "Nguyễn Văn A",
            address: "123 Đường ABC, Quận 1, TP.HCM",
            status: "delivered",
            createdAt: "2024-03-15",
            completedAt: "2024-03-16",
            shipper: "Trần Văn B",
            events: [
                {
                    id: 1,
                    status: "picked_up",
                    description: "Đã lấy hàng từ kho",
                    location: "Kho Quận 1",
                    timestamp: "2024-03-15T08:00:00",
                    note: "Hàng đóng gói cẩn thận"
                },
                {
                    id: 2,
                    status: "delivering",
                    description: "Đang giao hàng",
                    location: "Quận 1, TP.HCM",
                    timestamp: "2024-03-15T10:30:00"
                },
                {
                    id: 3,
                    status: "delivered",
                    description: "Giao hàng thành công",
                    location: "123 Đường ABC, Quận 1",
                    timestamp: "2024-03-15T14:00:00",
                    note: "Khách hàng đã nhận và kiểm tra hàng"
                }
            ]
        },
        // Thêm dữ liệu mẫu khác...
    ]);

    const handleExport = async () => {
        try {
            setLoading(true);
            // API call để xuất file
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast.success('Xuất file thành công');
        } catch (error) {
            toast.error('Có lỗi xảy ra khi xuất file');
        } finally {
            setLoading(false);
        }
    };

    const DetailModal = ({ isOpen, onClose, shipping }) => {
        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-800">
                                Chi tiết vận chuyển - Đơn hàng #{shipping.orderId}
                            </h2>
                            <button
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-2">
                                    Thông tin đơn hàng
                                </h3>
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-900">
                                        Khách hàng: {shipping.customerName}
                                    </p>
                                    <p className="text-sm text-gray-900">
                                        Địa chỉ: {shipping.address}
                                    </p>
                                    <p className="text-sm text-gray-900">
                                        Shipper: {shipping.shipper}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-2">
                                    Thời gian
                                </h3>
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-900">
                                        Ngày tạo: {new Date(shipping.createdAt).toLocaleDateString('vi-VN')}
                                    </p>
                                    {shipping.completedAt && (
                                        <p className="text-sm text-gray-900">
                                            Ngày hoàn thành: {new Date(shipping.completedAt).toLocaleDateString('vi-VN')}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-4">
                                Lịch sử vận chuyển
                            </h3>
                            <ShippingHistory history={shipping.events} />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Lịch sử vận chuyển
                    </h1>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
                        >
                            <FiFilter /> Bộ lọc
                        </button>
                        <button
                            onClick={handleExport}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                            <FiDownload /> Xuất Excel
                        </button>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Tìm kiếm đơn hàng..."
                                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* Filters */}
                {showFilters && (
                    <div className="bg-white rounded-lg shadow p-4 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Thời gian
                                </label>
                                <select
                                    value={filters.dateRange}
                                    onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="all">Tất cả</option>
                                    <option value="today">Hôm nay</option>
                                    <option value="week">Tuần này</option>
                                    <option value="month">Tháng này</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Trạng thái
                                </label>
                                <select
                                    value={filters.status}
                                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="all">Tất cả</option>
                                    <option value="delivered">Đã giao</option>
                                    <option value="failed">Thất bại</option>
                                    <option value="cancelled">Đã hủy</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Shipper
                                </label>
                                <select
                                    value={filters.shipper}
                                    onChange={(e) => setFilters({ ...filters, shipper: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="all">Tất cả</option>
                                    <option value="1">Nguyễn Văn A</option>
                                    <option value="2">Trần Văn B</option>
                                    <option value="3">Lê Văn C</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Khu vực
                                </label>
                                <select
                                    value={filters.area}
                                    onChange={(e) => setFilters({ ...filters, area: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="all">Tất cả</option>
                                    <option value="district1">Quận 1</option>
                                    <option value="district3">Quận 3</option>
                                    <option value="district5">Quận 5</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {/* History Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Đơn hàng
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Khách hàng
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Shipper
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Trạng thái
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thời gian
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {historyData.map((shipping) => (
                                <tr key={shipping.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {shipping.orderId}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900">
                                            {shipping.customerName}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {shipping.address}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {shipping.shipper}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs rounded-full ${shipping.status === 'delivered'
                                            ? 'bg-green-100 text-green-800'
                                            : shipping.status === 'failed'
                                                ? 'bg-red-100 text-red-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {shipping.status === 'delivered' ? 'Đã giao' :
                                                shipping.status === 'failed' ? 'Thất bại' :
                                                    'Đang giao'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {new Date(shipping.createdAt).toLocaleDateString('vi-VN')}
                                        </div>
                                        {shipping.completedAt && (
                                            <div className="text-sm text-gray-500">
                                                {new Date(shipping.completedAt).toLocaleDateString('vi-VN')}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => {
                                                setSelectedShipping(shipping);
                                                setShowDetailModal(true);
                                            }}
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            <FiEye className="inline-block mr-1" />
                                            Chi tiết
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Detail Modal */}
            <DetailModal
                isOpen={showDetailModal}
                onClose={() => {
                    setShowDetailModal(false);
                    setSelectedShipping(null);
                }}
                shipping={selectedShipping}
            />
        </div>
    );
};

export default ShippingHistoryPage;