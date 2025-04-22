import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiClock } from 'react-icons/fi';
import Loading from '../../../component/loading/loading';
import ConfirmDialog from '../../../component/common/ConfirmDialog';
import { toast } from 'react-toastify';
import Notification from '../../../component/notification/Notification';
import { createShipper, updateShipper, deleteShipper, getAllShippers } from '../../../api/shipper/shipperSevice';
import useLocationApi from '../../../hooks/useLocationAPI';
import { Helmet } from 'react-helmet';

const ShipperForm = ({ shipper, onSubmit, onCancel }) => {
    const { provinces, districts, wards, fetchDistricts, fetchWards } = useLocationApi();
    const [formData, setFormData] = useState(shipper || {
        name: '',
        phone: '',
        email: '',
        status: 'active',
        province: '',
        district: ''
    });

    const handleProvinceChange = (e) => {
        const selectedProvince = e.target.value;
        const selectedProvinceObj = provinces.find(province => province.name === selectedProvince); // Find the province object
        if (selectedProvinceObj) {
            setFormData(prev => ({
                ...prev,
                province: selectedProvinceObj.name, // Store the name
                district: '', // Reset district when province changes
            }));
            fetchDistricts(selectedProvinceObj.code); // Use the code to fetch districts
        }
    };

    const handleDistrictChange = (e) => {
        const selectedDistrict = e.target.value;
        setFormData(prev => ({
            ...prev,
            district: selectedDistrict,
        }));
    };

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
                    Tỉnh/Thành phố *
                </label>
                <select
                    value={formData.province}
                    onChange={handleProvinceChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Chọn tỉnh/thành phố</option>
                    {provinces.map(province => (
                        <option key={province.code} value={province.name}>
                            {province.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quận/Huyện *
                </label>
                <select
                    value={formData.district}
                    onChange={handleDistrictChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Chọn quận/huyện</option>
                    {districts.map(district => (
                        <option key={district.code} value={district.name}>
                            {district.name}
                        </option>
                    ))}
                </select>
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

const ShipperManagementPage = () => {
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [selectedShipper, setSelectedShipper] = useState(null);
    const [shippers, setShippers] = useState([]);
    const [notification, setNotification] = useState({ message: '', type: '', visible: false });

    useEffect(() => {
        const fetchShippers = async () => {
            try {
                setLoading(true);
                const data = await getAllShippers();
                setShippers(data.shippers);
            } catch (error) {
                setNotification({ message: 'Có lỗi xảy ra khi lấy danh sách shipper', type: 'error', visible: true });
            } finally {
                setLoading(false);
            }
        };

        fetchShippers();
    }, []);

    const handleSubmit = async (formData) => {
        try {
            setLoading(true);
            if (selectedShipper) {
                // Cập nhật
                const updatedShipperData = await updateShipper(selectedShipper._id, formData);
                setShippers(prev => prev.map(s => (s._id === selectedShipper._id ? updatedShipperData.updatedShipper : s)));
                setNotification({ message: 'Cập nhật shipper thành công', type: 'success', visible: true });
            } else {
                // Thêm mới
                const newShipperData = await createShipper(formData);
                setShippers(prev => [...prev, newShipperData.newShipper]);
                setNotification({ message: 'Thêm shipper thành công', type: 'success', visible: true });
            }
            setShowForm(false);
            setSelectedShipper(null);
        } catch (error) {
            setNotification({ message: 'Có lỗi xảy ra', type: 'error', visible: true });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            setLoading(true);
            await deleteShipper(selectedShipper._id);
            const data = await getAllShippers();
            setShippers(data.shippers);
            setNotification({ message: 'Xóa shipper thành công', type: 'success', visible: true });
            setShowDeleteConfirm(false);
            setSelectedShipper(null);
        } catch (error) {
            setNotification({ message: 'Có lỗi xảy ra khi xóa shipper', type: 'error', visible: true });
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <Helmet>
                <title>Danh sách shipper</title>
            </Helmet>
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
                        <div key={shipper._id} className="bg-white rounded-lg shadow p-6">
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
                                    Khu vực hoạt động:
                                </p>
                                <hr />
                                <p className="text-sm text-gray-600">
                                    {shipper.district} / {shipper.province}
                                </p>
                                <hr />
                            </div>

                            <div className="flex justify-end gap-2">
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
            {showDeleteConfirm && selectedShipper && (
                <ConfirmDialog
                    isOpen={true}
                    title="Xác nhận xóa"
                    message={`Bạn có chắc chắn muốn xóa shipper "${selectedShipper.name}"?`}
                    onClose={() => {
                        setShowDeleteConfirm(false);
                        setSelectedShipper(null);
                    }}
                    onConfirm={handleDelete}
                />
            )}

            {/* Notification */}
            {notification.visible && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification({ ...notification, visible: false })}
                />
            )}
        </div>
    );
};

export default ShipperManagementPage;