import React, { useState } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';
import LoadingSpinner from '../../../component/common/LoadingSpinner';
import Pagination from '../../../component/pagination/Pagination';
import { formatDate } from '../../../utils/format/formatDate';

const ActivityLogPage = () => {
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterOpen, setFilterOpen] = useState(false);
    const itemsPerPage = 10;

    const [logs, setLogs] = useState([
        {
            id: "LOG001",
            action: "REFUND_APPROVED",
            description: "Duyệt hoàn tiền cho đơn hàng #ORD001",
            admin: "admin@example.com",
            ipAddress: "192.168.1.1",
            createdAt: "2024-03-15T10:30:00Z"
        },
        {
            id: "LOG002",
            action: "PAYMENT_METHOD_UPDATED",
            description: "Cập nhật cấu hình thanh toán MoMo",
            admin: "admin@example.com",
            ipAddress: "192.168.1.1",
            createdAt: "2024-03-15T10:35:00Z"
        },
        // Thêm dữ liệu mẫu khác...
    ]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const getActionColor = (action) => {
        switch (action) {
            case 'REFUND_APPROVED':
                return 'bg-green-100 text-green-800';
            case 'PAYMENT_METHOD_UPDATED':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getActionText = (action) => {
        switch (action) {
            case 'REFUND_APPROVED':
                return 'Duyệt hoàn tiền';
            case 'PAYMENT_METHOD_UPDATED':
                return 'Cập nhật PTTT';
            default:
                return action;
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Nhật ký hoạt động</h1>
                </div>

                {/* Search and Filter */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm nhật ký..."
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
                        <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4">
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
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Hành động
                                </label>
                                <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Tất cả</option>
                                    <option value="REFUND_APPROVED">Duyệt hoàn tiền</option>
                                    <option value="PAYMENT_METHOD_UPDATED">Cập nhật PTTT</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>

                {/* Logs Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Mã nhật ký
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Hành động
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Mô tả
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Admin
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    IP
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thời gian
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {logs.map((log) => (
                                <tr key={log.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {log.id}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getActionColor(log.action)}`}>
                                            {getActionText(log.action)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900">
                                            {log.description}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {log.admin}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {log.ipAddress}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {formatDate(log.createdAt)}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Pagination
                        currentPage={currentPage}
                        totalItems={logs.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default ActivityLogPage;