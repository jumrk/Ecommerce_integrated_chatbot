import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiClock } from 'react-icons/fi';
import LoadingSpinner from '../../../component/common/LoadingSpinner';
import ConfirmDialog from '../../../component/common/ConfirmDialog';
import { toast } from 'react-toastify';

const ShipperForm = ({ shipper, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState(shipper || {
        name: '',
        phone: '',
        email: '',
        area: '',
        status: 'active'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.phone) {
            toast.error('Vui lòng điền đầy đủ thông tin bắt buộc');
            return;
        }
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên shipper *
                </label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số điện thoại *
                </label>
                <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                </label>
                <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Khu vực phụ trách
                </label>
                <input
                    type="text"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="VD: Quận 1, Quận 3"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Trạng thái
                </label>
                <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="active">Đang hoạt động</option>
                    <option value="inactive">Tạm nghỉ</option>
                </select>
            </div>

            <div className="flex justify-end gap-4 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                    Hủy
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    {shipper ? 'Cập nhật' : 'Thêm mới'}
                </button>
            </div>
        </form>
    );
};

const DeliveryHistoryModal = ({ isOpen, onClose, shipper }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800">
                            Lịch sử giao hàng - {shipper.name}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="space-y-4">
                        {shipper.deliveryHistory?.map((delivery) => (
                            <div
                                key={delivery.id}
                                className="border rounded-lg p-4 hover:bg-gray-50"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="font-medium text-gray-900">
                                            {delivery.orderId}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {delivery.address}
                                        </div>
                                    </div>
                                    <span className={`px-2 py-1 text-xs rounded-full ${delivery.status === 'delivered'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                        }`}>
                                        {delivery.status === 'delivered' ? 'Đã giao' : 'Thất bại'}
                                    </span>
                                </div>
                                <div className="mt-2 text-sm text-gray-600">
                                    {delivery.date}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ShipperManagementPage = () => {
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [selectedShipper, setSelectedShipper] = useState(null);

    const [shippers, setShippers] = useState([
        {
            id: 1,
            name: "Nguyễn Văn A",
            phone: "0123456789",
            email: "shipper.a@example.com",
            area: "Quận 1, Quận 3",
            status: "active",
            deliveryCount: 150,
            successRate: 98,
            deliveryHistory: [
                {
                    id: 1,
                    orderId: "ORD001",
                    address: "123 Đường ABC, Quận 1",
                    status: "delivered",
                    date: "2024-03-15"
                },
                // Thêm lịch sử giao hàng khác...
            ]
        },
        // Thêm shipper khác...
    ]);

    const handleSubmit = async (formData) => {
        try {
            setLoading(true);
            // API call để thêm/cập nhật shipper
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (selectedShipper) {
                // Cập nhật
                setShippers(shippers.map(s =>
                    s.id === selectedShipper.id ? { ...s, ...formData } : s
                ));
                toast.success('Cập nhật shipper thành công');
            } else {
                // Thêm mới
                setShippers([...shippers, { ...formData, id: Date.now() }]);
                toast.success('Thêm shipper thành công');
            }

            setShowForm(false);
            setSelectedShipper(null);
        } catch (error) {
            toast.error('Có lỗi xảy ra');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            setLoading(true);
            // API call để xóa shipper
            await new Promise(resolve => setTimeout(resolve, 1000));

            setShippers(shippers.filter(s => s.id !== selectedShipper.id));
            toast.success('Xóa shipper thành công');
            setShowDeleteConfirm(false);
            setSelectedShipper(null);
        } catch (error) {
            toast.error('Có lỗi xảy ra khi xóa shipper');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Quản lý shipper</h1>
                    <button
                        onClick={() => {
                            setSelectedShipper(null);
                            setShowForm(true);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        <FiPlus /> Thêm shipper
                    </button>
                </div>

                {/* Shippers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {shippers.map((shipper) => (
                        <div key={shipper.id} className="bg-white rounded-lg shadow p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {shipper.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">{shipper.phone}</p>
                                </div>
                                <span className={`px-2 py-1 text-xs rounded-full ${shipper.status === 'active'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-gray-100 text-gray-800'
                                    }`}>
                                    {shipper.status === 'active' ? 'Đang hoạt động' : 'Tạm nghỉ'}
                                </span>
                            </div>

                            <div className="space-y-2 mb-4">
                                <p className="text-sm text-gray-600">
                                    Email: {shipper.email}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Khu vực: {shipper.area}
                                </p>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Số đơn đã giao: {shipper.deliveryCount}</span>
                                    <span>Tỷ lệ thành công: {shipper.successRate}%</span>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => {
                                        setSelectedShipper(shipper);
                                        setShowHistory(true);
                                    }}
                                    className="p-2 text-blue-600 hover:text-blue-800"
                                    title="Xem lịch sử"
                                >
                                    <FiClock className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectedShipper(shipper);
                                        setShowForm(true);
                                    }}
                                    className="p-2 text-blue-600 hover:text-blue-800"
                                    title="Chỉnh sửa"
                                >
                                    <FiEdit2 className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectedShipper(shipper);
                                        setShowDeleteConfirm(true);
                                    }}
                                    className="p-2 text-red-600 hover:text-red-800"
                                    title="Xóa"
                                >
                                    <FiTrash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add/Edit Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-full max-w-md p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">
                            {selectedShipper ? 'Chỉnh sửa shipper' : 'Thêm shipper mới'}
                        </h2>
                        <ShipperForm
                            shipper={selectedShipper}
                            onSubmit={handleSubmit}
                            onCancel={() => {
                                setShowForm(false);
                                setSelectedShipper(null);
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Delete Confirmation */}
            <ConfirmDialog
                isOpen={showDeleteConfirm}
                title="Xác nhận xóa"
                message={`Bạn có chắc chắn muốn xóa shipper "${selectedShipper?.name}"?`}
                onClose={() => setShowDeleteConfirm(false)}
                onConfirm={handleDelete}
            />

            {/* Delivery History Modal */}
            <DeliveryHistoryModal
                isOpen={showHistory}
                onClose={() => {
                    setShowHistory(false);
                    setSelectedShipper(null);
                }}
                shipper={selectedShipper}
            />
        </div>
    );
};

export default ShipperManagementPage;