import React, { useState } from 'react';
import { FiSearch, FiFilter, FiClock, FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../common/LoadingSpinner';

const OrderActivityLog = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [filterOpen, setFilterOpen] = useState(false);

    // Giả lập loading
    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    // Dữ liệu mẫu
    const orderHistory = [
        {
            id: "DH001",
            date: "2024-03-15T08:00:00Z",
            action: "status_change",
            status: "processing",
            oldStatus: "pending",
            user: "admin",
            note: "Xác nhận đơn hàng"
        },
        {
            id: "DH001",
            date: "2024-03-15T08:30:00Z",
            action: "shipping_update",
            status: "shipping",
            user: "admin",
            note: "Đã giao cho đơn vị vận chuyển",
            trackingInfo: {
                carrier: "GHN Express",
                trackingNumber: "GHN123456789"
            }
        },
        {
            id: "DH001",
            date: "2024-03-16T10:00:00Z",
            action: "status_change",
            status: "completed",
            oldStatus: "shipping",
            user: "admin",
            note: "Giao hàng thành công"
        }
    ];

    const formatDate = (dateString) => {
        return new Intl.DateTimeFormat('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(dateString));
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'processing': return 'bg-blue-100 text-blue-800';
            case 'shipping': return 'bg-purple-100 text-purple-800';
            case 'completed': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'pending': return 'Chờ xác nhận';
            case 'processing': return 'Đang xử lý';
            case 'shipping': return 'Đang giao hàng';
            case 'completed': return 'Hoàn thành';
            case 'cancelled': return 'Đã hủy';
            default: return status;
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                {/* Header with Back Button */}
                <div className="flex items-center mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                        title="Quay lại"
                    >
                        <FiArrowLeft className="w-6 h-6" />
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800">Nhật ký hoạt động</h1>
                </div>

                {/* Search and Filter */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm theo mã đơn hàng..."
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
                                    Loại thao tác
                                </label>
                                <select className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Tất cả</option>
                                    <option value="status_change">Thay đổi trạng thái</option>
                                    <option value="shipping_update">Cập nhật vận chuyển</option>
                                    <option value="note_added">Thêm ghi chú</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>

                {/* History Timeline */}
                <div className="bg-white rounded-lg shadow">
                    <div className="p-6">
                        <div className="flow-root">
                            <ul className="-mb-8">
                                {orderHistory.map((event, eventIdx) => (
                                    <li key={eventIdx}>
                                        <div className="relative pb-8">
                                            {eventIdx !== orderHistory.length - 1 ? (
                                                <span
                                                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                                    aria-hidden="true"
                                                />
                                            ) : null}
                                            <div className="relative flex space-x-3">
                                                <div>
                                                    <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${event.action === 'status_change' ? 'bg-blue-500' :
                                                        event.action === 'shipping_update' ? 'bg-purple-500' : 'bg-gray-500'
                                                        }`}>
                                                        <FiClock className="h-5 w-5 text-white" />
                                                    </span>
                                                </div>
                                                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                                    <div>
                                                        <p className="text-sm text-gray-500">
                                                            {event.note}
                                                            {event.action === 'status_change' && (
                                                                <span className="mx-1">
                                                                    Trạng thái:
                                                                    <span className={`ml-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(event.oldStatus)}`}>
                                                                        {getStatusText(event.oldStatus)}
                                                                    </span>
                                                                    →
                                                                    <span className={`ml-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(event.status)}`}>
                                                                        {getStatusText(event.status)}
                                                                    </span>
                                                                </span>
                                                            )}
                                                            {event.action === 'shipping_update' && event.trackingInfo && (
                                                                <span className="block mt-1 text-xs">
                                                                    Đơn vị vận chuyển: {event.trackingInfo.carrier}<br />
                                                                    Mã vận đơn: {event.trackingInfo.trackingNumber}
                                                                </span>
                                                            )}
                                                        </p>
                                                    </div>
                                                    <div className="whitespace-nowrap text-right text-sm text-gray-500">
                                                        <time dateTime={event.date}>{formatDate(event.date)}</time>
                                                        <div className="text-xs text-gray-400">{event.user}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderActivityLog;