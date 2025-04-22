import React, { useState, useEffect } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';
import Loading from '../../../component/loading/loading';
import EditVoucherModal from '../../../component/admin/voucherManagement/EditVoucherModal';
import StatusCustom from '../../../component/condition/ConditionCustom';
import Pagination from '../../../component/pagination/Pagination';
import ButtonDelete from '../../../component/button/ButtonDelete';
import ButtonEdit from '../../../component/button/ButtonEdit';
import { getListVoucher, deleteVoucher } from '../../../api/voucher/voucherService';
import Notification from '../../../component/notification/Notification';
import ConfirmDialog from '../../../component/common/ConfirmDialog';
import { Helmet } from 'react-helmet';
import CountdownTimer from '../../../component/CountdownTimer/CountdownTimer';

const VoucherListPage = () => {
    const [loading, setLoading] = useState(true);
    const [vouchers, setVouchers] = useState([]);
    const [filterOpen, setFilterOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [voucherToDelete, setVoucherToDelete] = useState(null);
    const [filters, setFilters] = useState({
        status: '',
        type: '',
        sort: 'newest'
    });
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = vouchers.slice(indexOfFirstItem, indexOfLastItem);

    // State cho thông báo
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [showNotification, setShowNotification] = useState(false);

    // Hàm để lấy danh sách voucher
    const fetchVouchers = async () => {
        setLoading(true);
        try {
            console.log("🔄 Fetching vouchers...");
            const response = await getListVoucher();
            console.log("📦 Received vouchers:", response);
            setVouchers(response || []);
        } catch (error) {
            console.error('❌ Error fetching vouchers:', error);
            setNotification({ message: 'Có lỗi xảy ra khi lấy danh sách voucher', type: 'error' });
            setShowNotification(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVouchers(); // Gọi hàm fetchVouchers khi component được mount
    }, []);

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
            day: '2-digit'
        }).format(new Date(dateString));
    };

    const handleDelete = (id) => {
        setVoucherToDelete(id);
        setIsConfirmDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (!voucherToDelete) return;

        try {
            setLoading(true);
            const response = await deleteVoucher(voucherToDelete);
            if (!response.success) {
                setNotification({ message: response.message, type: 'error' });
                setShowNotification(true);
                return;
            }
            setNotification({ message: 'Xóa mã giảm giá thành công', type: 'success' });
            fetchVouchers()
            setLoading(false)
            setShowNotification(true);
        } catch (error) {
            setNotification({ message: 'Có lỗi xảy ra khi xóa mã giảm giá', type: 'error' });
            setShowNotification(true);
        } finally {
            setLoading(false);
            setIsConfirmDialogOpen(false);
            setVoucherToDelete(null);
        }
    };
    const handleEdit = (voucher) => {
        setSelectedVoucher(voucher);
        setIsEditModalOpen(true);
    };
    const handleEditModalClose = () => {
        setIsEditModalOpen(false);
    }


    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (name, value) => {
        setFilters(prev => ({ ...prev, [name]: value }));
        // Thực hiện lọc
    };

    if (loading) return <Loading />;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <Helmet>
                <title>Danh sách mã giảm giá</title>
            </Helmet>
            <ConfirmDialog
                isOpen={isConfirmDialogOpen}
                title="Xác nhận xóa"
                message="Bạn có chắc chắn muốn xóa mã giảm giá này?"
                onConfirm={confirmDelete}
                onClose={() => setIsConfirmDialogOpen(false)}
            />
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Quản lý mã giảm giá</h1>
                </div>

                {/* Thông báo */}
                {showNotification && (
                    <Notification
                        message={notification.message}
                        type={notification.type}
                        onClose={() => setShowNotification(false)}
                    />
                )}

                {/* Search and Filter */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    placeholder="Tìm kiếm mã giảm giá..."
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                            <button
                                onClick={() => setFilterOpen(!filterOpen)}
                                className={`p-2 border rounded-lg hover:bg-gray-50 ${filterOpen ? 'bg-blue-50 border-blue-200' : ''}`}
                            >
                                <FiFilter className={`${filterOpen ? 'text-blue-600' : 'text-gray-600'}`} />
                            </button>
                        </div>
                    </div>

                    {filterOpen && (
                        <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Trạng thái
                                </label>
                                <select
                                    value={filters.status}
                                    onChange={(e) => handleFilterChange('status', e.target.value)}
                                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Tất cả</option>
                                    <option value="active">Đang hoạt động</option>
                                    <option value="expired">Hết hạn</option>
                                    <option value="scheduled">Chưa bắt đầu</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Loại giảm giá
                                </label>
                                <select
                                    value={filters.type}
                                    onChange={(e) => handleFilterChange('type', e.target.value)}
                                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Tất cả</option>
                                    <option value="percentage">Theo phần trăm</option>
                                    <option value="fixed">Số tiền cố định</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Sắp xếp theo
                                </label>
                                <select
                                    value={filters.sort}
                                    onChange={(e) => handleFilterChange('sort', e.target.value)}
                                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="newest">Mới nhất</option>
                                    <option value="oldest">Cũ nhất</option>
                                    <option value="value">Giá trị giảm</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>

                {/* Vouchers Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Mã giảm giá
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Giá trị
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Điều kiện
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Thời gian
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Đã dùng
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Trạng thái
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {currentItems.map((voucher) => (
                                    <tr key={voucher._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {voucher.code}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {voucher.description}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {voucher.type === 'percentage'
                                                    ? `${voucher.value}%`
                                                    : formatPrice(voucher.value)
                                                }
                                            </div>
                                            {voucher.type === 'percentage' && voucher.maxDiscount && (
                                                <div className="text-sm text-gray-500">
                                                    Tối đa: {formatPrice(voucher.maxDiscount)}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                Đơn tối thiểu: {formatPrice(voucher.minSpend)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {formatDate(voucher.startDate)}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                đến {formatDate(voucher.endDate)}
                                            </div>
                                            {voucher.status === 'Đang diễn ra' && (
                                                <div className="mt-2">
                                                    <CountdownTimer endDate={voucher.endDate} />
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {voucher.usageCount}/{voucher.usageLimit}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {voucher.status === "Đang diễn ra" ? (
                                                <StatusCustom
                                                    type={"success"}
                                                    text={voucher.status}
                                                />
                                            ) : voucher.status === "Đã kết thúc" ? (
                                                <StatusCustom
                                                    type={"danger"}
                                                    text={voucher.status}
                                                />
                                            ) : voucher.status === "Chưa bắt đầu" ? (
                                                <StatusCustom
                                                    type={"warning"}
                                                    text={voucher.status}
                                                />
                                            ) : (
                                                <StatusCustom
                                                    type={"danger"}
                                                    text={voucher.status}
                                                />
                                            )}
                                        </td>
                                        <td className="flex justify-end gap-2 mt-4 whitespace-nowrap text-right text-sm font-medium">
                                            <ButtonEdit
                                                onClick={() => handleEdit(voucher)}
                                            />
                                            <ButtonDelete
                                                onClick={() => handleDelete(voucher._id)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                <Pagination
                    totalItems={vouchers.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                />
            </div>

            <EditVoucherModal
                isOpen={isEditModalOpen}
                onClose={handleEditModalClose}
                voucher={selectedVoucher}
                onUpdate={fetchVouchers}
            />
        </div>
    );
};

export default VoucherListPage;