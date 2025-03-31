import React, { useState } from 'react';
import { FiSearch, FiFilter, FiRefreshCcw } from 'react-icons/fi';
import LoadingSpinner from '../../../component/common/LoadingSpinner';
import Pagination from '../../../component/pagination/Pagination';
import { formatDate } from '../../../utils/format/formatDate';
import ConfirmDialog from '../../../component/common/ConfirmDialog';
import { toast } from 'react-toastify';

const RefundPage = () => {
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterOpen, setFilterOpen] = useState(false);
    const [showRefundConfirm, setShowRefundConfirm] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [refundReason, setRefundReason] = useState('');
    const itemsPerPage = 10;

    const [refunds, setRefunds] = useState([
        {
            id: "REF001",
            transactionId: "TRX001",
            orderId: "ORD001",
            customerName: "Nguyễn Văn A",
            amount: 1500000,
            paymentMethod: "MoMo",
            status: "pending", // pending, processing, completed, failed
            reason: "Sản phẩm không đúng mô tả",
            requestDate: "2024-03-15T10:30:00Z",
            completedDate: null
        },
        // Thêm dữ liệu mẫu khác...
    ]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const handleRefund = (refund) => {
        setSelectedTransaction(refund);
        setShowRefundConfirm(true);
    };

    const confirmRefund = async () => {
        if (!refundReason.trim()) {
            toast.error('Vui lòng nhập lý do hoàn tiền');
            return;
        }

        try {
            setLoading(true);
            // API call để xử lý hoàn tiền
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Cập nhật trạng thái trong danh sách
            setRefunds(refunds.map(r =>
                r.id === selectedTransaction.id
                    ? { ...r, status: 'processing', reason: refundReason }
                    : r
            ));

            toast.success('Đã gửi yêu cầu hoàn tiền');
            setShowRefundConfirm(false);
            setRefundReason('');
            setSelectedTransaction(null);
        } catch (error) {
            toast.error('Có lỗi xảy ra khi xử lý hoàn tiền');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'processing':
                return 'bg-yellow-100 text-yellow-800';
            case 'failed':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'completed':
                return 'Đã hoàn tiền';
            case 'processing':
                return 'Đang xử lý';
            case 'failed':
                return 'Thất bại';
            case 'pending':
                return 'Chờ xử lý';
            default:
                return status;
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Quản lý hoàn tiền</h1>
                </div>

                {/* Search and Filter */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm theo mã giao dịch, khách hàng..."
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
                                    Trạng thái
                                </label>
                                <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Tất cả</option>
                                    <option value="pending">Chờ xử lý</option>
                                    <option value="processing">Đang xử lý</option>
                                    <option value="completed">Đã hoàn tiền</option>
                                    <option value="failed">Thất bại</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phương thức
                                </label>
                                <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Tất cả</option>
                                    <option value="MoMo">MoMo</option>
                                    <option value="VNPay">VNPay</option>
                                    <option value="Bank">Chuyển khoản</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>

                {/* Refunds Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Mã hoàn tiền
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Mã giao dịch
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Khách hàng
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Số tiền
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Lý do
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Trạng thái
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ngày yêu cầu
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {refunds.map((refund) => (
                                <tr key={refund.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-blue-600">
                                            {refund.id}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {refund.transactionId}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {refund.customerName}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {new Intl.NumberFormat('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND'
                                            }).format(refund.amount)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900 line-clamp-2">
                                            {refund.reason}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(refund.status)}`}>
                                            {getStatusText(refund.status)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {formatDate(refund.requestDate)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        {refund.status === 'pending' && (
                                            <button
                                                onClick={() => handleRefund(refund)}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                <FiRefreshCcw className="h-5 w-5" />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Pagination
                        currentPage={currentPage}
                        totalItems={refunds.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>

            {/* Refund Confirmation Dialog */}
            <ConfirmDialog
                isOpen={showRefundConfirm}
                title="Xác nhận hoàn tiền"
                onClose={() => {
                    setShowRefundConfirm(false);
                    setRefundReason('');
                    setSelectedTransaction(null);
                }}
                onConfirm={confirmRefund}
            >
                <div className="space-y-4">
                    <p>Bạn có chắc chắn muốn hoàn tiền cho giao dịch này?</p>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Lý do hoàn tiền *
                        </label>
                        <textarea
                            value={refundReason}
                            onChange={(e) => setRefundReason(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="3"
                            placeholder="Nhập lý do hoàn tiền"
                        />
                    </div>
                </div>
            </ConfirmDialog>
        </div>
    );
};

export default RefundPage;