import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AssignShipperModal = ({ isOpen, onClose, shipping, shippers, onSubmit }) => {
    const [formData, setFormData] = useState({
        shipperId: '',
        note: '',
        expectedDate: ''
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.shipperId || !formData.expectedDate) {
            toast.error('Vui lòng điền đầy đủ thông tin bắt buộc');
            return;
        }
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">
                        Phân công shipper
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Chọn shipper *
                        </label>
                        <select
                            value={formData.shipperId}
                            onChange={(e) => setFormData({ ...formData, shipperId: e.target.value })}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Chọn shipper</option>
                            {shippers?.map(shipper => (
                                <option key={shipper.id} value={shipper.id}>
                                    {shipper.name} - {shipper.area}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ngày giao dự kiến *
                        </label>
                        <input
                            type="date"
                            value={formData.expectedDate}
                            onChange={(e) => setFormData({ ...formData, expectedDate: e.target.value })}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ghi chú
                        </label>
                        <textarea
                            value={formData.note}
                            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="3"
                            placeholder="Thêm ghi chú cho shipper"
                        />
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Xác nhận
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AssignShipperModal;