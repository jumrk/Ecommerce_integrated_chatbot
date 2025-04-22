import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { updateVoucher } from '../../../api/voucher/voucherService';

const EditVoucherModal = ({ isOpen, onClose, voucher, onUpdate }) => {
    const [formData, setFormData] = useState({
        code: '',
        type: 'percentage',
        value: '',
        minSpend: '',
        maxDiscount: '',
        startDate: '',
        endDate: '',
        usageLimit: '',
        description: ''
    });

    useEffect(() => {
        if (voucher) {
            // Format dates for input type="date"
            const formatDate = (dateString) => {
                return new Date(dateString).toISOString().split('T')[0];
            };

            setFormData({
                ...voucher,
                startDate: formatDate(voucher.startDate),
                endDate: formatDate(voucher.endDate)
            });
        }
    }, [voucher]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.code || !formData.value || !formData.minSpend || !formData.startDate || !formData.endDate) {
            toast.error('Vui lòng điền đầy đủ thông tin bắt buộc');
            return;
        }

        try {
            console.log(formData)
            const response = await updateVoucher(formData);
            if (!response.success) {
                toast.error(response.message);
                return;
            }
            toast.success('Cập nhật mã giảm giá thành công');
            onUpdate();
            onClose(true);
        } catch (error) {
            toast.error('Có lỗi xảy ra khi cập nhật');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800">
                            Chỉnh sửa mã giảm giá
                        </h2>
                        <button
                            onClick={() => onClose(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mã giảm giá *
                                </label>
                                <input
                                    type="text"
                                    value={formData.code}
                                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Ví dụ: SUMMER2024"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Loại giảm giá *
                                </label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="percentage">Theo phần trăm</option>
                                    <option value="fixed">Số tiền cố định</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Giá trị *
                                </label>
                                <input
                                    type="number"
                                    value={formData.value}
                                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder={formData.type === 'percentage' ? "Ví dụ: 20" : "Ví dụ: 100000"}
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    {formData.type === 'percentage' ? '% giảm giá' : 'VNĐ giảm giá'}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Đơn hàng tối thiểu *
                                </label>
                                <input
                                    type="number"
                                    value={formData.minSpend}
                                    onChange={(e) => setFormData({ ...formData, minSpend: e.target.value })}
                                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Ví dụ: 1000000"
                                />
                                <p className="mt-1 text-sm text-gray-500">VNĐ</p>
                            </div>
                            {formData.type === 'percentage' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Giảm tối đa
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.maxDiscount}
                                        onChange={(e) => setFormData({ ...formData, maxDiscount: e.target.value })}
                                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Ví dụ: 200000"
                                    />
                                    <p className="mt-1 text-sm text-gray-500">VNĐ</p>
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Ngày bắt đầu *
                                </label>
                                <input
                                    type="date"
                                    value={formData.startDate}
                                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Ngày kết thúc *
                                </label>
                                <input
                                    type="date"
                                    value={formData.endDate}
                                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Giới hạn sử dụng *
                                </label>
                                <input
                                    type="number"
                                    value={formData.usageLimit}
                                    onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Ví dụ: 100"
                                />
                                <p className="mt-1 text-sm text-gray-500">Số lần có thể sử dụng</p>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Mô tả
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows="3"
                                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập mô tả cho mã giảm giá..."
                            />
                        </div>
                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => onClose(false)}
                                className="px-6 py-2 border rounded-lg hover:bg-gray-50"
                            >
                                Hủy
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Cập nhật
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditVoucherModal;