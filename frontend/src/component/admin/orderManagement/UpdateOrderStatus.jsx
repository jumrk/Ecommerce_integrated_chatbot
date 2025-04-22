import React, { useState } from 'react';
import { FiCheckCircle, FiTruck, FiPackage, FiX } from 'react-icons/fi';

const UpdateOrderStatus = ({ idOrder, currentStatus, onUpdateStatus }) => {
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [newStatus, setNewStatus] = useState('');
    const [note, setNote] = useState('');
    const [loading, setLoading] = useState(false);
    // Định nghĩa luồng trạng thái và thông tin button
    const statusFlow = {
        ordered: {
            nextStatus: 'confirmed',
            buttonText: 'Xác nhận đơn hàng',
            icon: <FiCheckCircle className="w-5 h-5" />,
        },
        confirmed: {
            nextStatus: 'delivering',
            buttonText: 'Bắt đầu giao hàng',
            icon: <FiTruck className="w-5 h-5" />,
        },
        delivering: {
            nextStatus: 'completed',
            buttonText: 'Hoàn thành giao hàng',
            icon: <FiPackage className="w-5 h-5" />,
        },
    };

    // Kiểm tra trạng thái có thể hủy
    const canCancel = ['ordered', 'confirmed'].includes(currentStatus);

    // Mở modal với trạng thái mới
    const openModalWithStatus = (status) => {
        setNewStatus(status);
        setShowStatusModal(true);
    };

    // Xử lý submit
    const handleSubmit = async () => {
        setLoading(true);
        try {
            const updateData = {
                status: newStatus,
                note,
            };
            await onUpdateStatus(updateData);
            setShowStatusModal(false);
            setNote('');
        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái:', error);
        } finally {
            setLoading(false);
        }
    };

    // Nếu trạng thái là completed hoặc cancelled, không hiển thị button
    if (!statusFlow[currentStatus] && !canCancel) {
        return null;
    }

    // Lấy thông tin button cho trạng thái hiện tại (nếu có)
    const currentAction = statusFlow[currentStatus];

    return (
        <>
            <div className="space-y-3">
                {currentAction && (
                    <button
                        onClick={() => openModalWithStatus(currentAction.nextStatus)}
                        disabled={loading}
                        className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-colors ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                    >
                        {currentAction.icon}
                        {loading ? 'Đang xử lý...' : currentAction.buttonText}
                    </button>
                )}

                {canCancel && (
                    <button
                        onClick={() => openModalWithStatus('cancelled')}
                        disabled={loading}
                        className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-colors ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
                            }`}
                    >
                        <FiX className="w-5 h-5" />
                        {loading ? 'Đang xử lý...' : 'Hủy đơn hàng'}
                    </button>
                )}
            </div>

            {showStatusModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold mb-4">Cập nhật trạng thái đơn hàng</h3>

                            <div className="space-y-4">
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
                                    onClick={() => {
                                        setShowStatusModal(false);
                                        setNote('');
                                    }}
                                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className={`px-4 py-2 rounded-lg text-white ${loading
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700'
                                        }`}
                                >
                                    {loading ? 'Đang xử lý...' : 'Cập nhật'}
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