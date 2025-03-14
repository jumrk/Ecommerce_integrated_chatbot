import React, { useState } from 'react';
import { FiTruck, FiPackage, FiCheck, FiX } from 'react-icons/fi';

const UpdateOrderStatus = ({ currentStatus, onUpdateStatus }) => {
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [newStatus, setNewStatus] = useState(currentStatus);
    const [note, setNote] = useState('');
    const [trackingInfo, setTrackingInfo] = useState({
        carrier: '',
        trackingNumber: ''
    });

    const statusOptions = [
        { value: 'pending', label: 'Chờ xác nhận', icon: FiPackage },
        { value: 'processing', label: 'Đang xử lý', icon: FiPackage },
        { value: 'shipping', label: 'Đang giao hàng', icon: FiTruck },
        { value: 'completed', label: 'Hoàn thành', icon: FiCheck },
        { value: 'cancelled', label: 'Đã hủy', icon: FiX }
    ];

    const handleSubmit = () => {
        onUpdateStatus({
            status: newStatus,
            note,
            trackingInfo: newStatus === 'shipping' ? trackingInfo : null
        });
        setShowStatusModal(false);
    };

    return (
        <>
            <button
                onClick={() => setShowStatusModal(true)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
                Cập nhật trạng thái
            </button>

            {showStatusModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold mb-4">Cập nhật trạng thái đơn hàng</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Trạng thái mới
                                    </label>
                                    <select
                                        value={newStatus}
                                        onChange={(e) => setNewStatus(e.target.value)}
                                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {statusOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {newStatus === 'shipping' && (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Đơn vị vận chuyển
                                            </label>
                                            <select
                                                value={trackingInfo.carrier}
                                                onChange={(e) => setTrackingInfo(prev => ({
                                                    ...prev,
                                                    carrier: e.target.value
                                                }))}
                                                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="">Chọn đơn vị vận chuyển</option>
                                                <option value="GHN">Giao Hàng Nhanh</option>
                                                <option value="GHTK">Giao Hàng Tiết Kiệm</option>
                                                <option value="VNPost">VNPost</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Mã vận đơn
                                            </label>
                                            <input
                                                type="text"
                                                value={trackingInfo.trackingNumber}
                                                onChange={(e) => setTrackingInfo(prev => ({
                                                    ...prev,
                                                    trackingNumber: e.target.value
                                                }))}
                                                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Nhập mã vận đơn"
                                            />
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Ghi chú
                                    </label>
                                    <textarea
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows="3"
                                        placeholder="Nhập ghi chú cho cập nhật này"
                                    />
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    onClick={() => setShowStatusModal(false)}
                                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Cập nhật
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UpdateOrderStatus;