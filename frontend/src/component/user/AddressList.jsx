import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCheck, FiHome, FiMapPin } from 'react-icons/fi';
import useLocationApi from '../../hooks/useLocationApi';

const AddressList = () => {
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const { provinces, districts, wards, loading, fetchDistricts, fetchWards } = useLocationApi();

    const [addresses, setAddresses] = useState([
        {
            id: '1',
            name: 'Nhà riêng',
            receiver: 'Nguyễn Văn A',
            phone: '0123456789',
            address: '123 Đường ABC',
            provinceCode: '79', // Mã tỉnh/thành phố
            province: 'TP.HCM',
            districtCode: '760', // Mã quận/huyện
            district: 'Quận 1',
            wardCode: '26734', // Mã phường/xã
            ward: 'Phường Bến Nghé',
            isDefault: true
        }
    ]);

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        receiver: '',
        phone: '',
        address: '',
        provinceCode: '',
        districtCode: '',
        wardCode: '',
        isDefault: false
    });

    // Xử lý khi chọn địa chỉ để sửa
    const handleEdit = (address) => {
        setIsEditing(true);
        setShowForm(true);
        // Fetch districts và wards cho địa chỉ đang sửa
        fetchDistricts(address.provinceCode);
        fetchWards(address.districtCode);
        setFormData({
            id: address.id,
            name: address.name,
            receiver: address.receiver,
            phone: address.phone,
            address: address.address,
            provinceCode: address.provinceCode,
            districtCode: address.districtCode,
            wardCode: address.wardCode,
            isDefault: address.isDefault
        });
    };

    // Reset form
    const resetForm = () => {
        setFormData({
            id: '',
            name: '',
            receiver: '',
            phone: '',
            address: '',
            provinceCode: '',
            districtCode: '',
            wardCode: '',
            isDefault: false
        });
        setIsEditing(false);
        setShowForm(false);
    };

    const handleProvinceChange = (e) => {
        const provinceCode = e.target.value;
        setFormData({
            ...formData,
            provinceCode,
            districtCode: '',
            wardCode: ''
        });
        fetchDistricts(provinceCode);
    };

    const handleDistrictChange = (e) => {
        const districtCode = e.target.value;
        setFormData({
            ...formData,
            districtCode,
            wardCode: ''
        });
        fetchWards(districtCode);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const selectedProvince = provinces.find(p => p.code === Number(formData.provinceCode));
        const selectedDistrict = districts.find(d => d.code === Number(formData.districtCode));
        const selectedWard = wards.find(w => w.code === Number(formData.wardCode));

        const addressData = {
            ...formData,
            province: selectedProvince?.name,
            district: selectedDistrict?.name,
            ward: selectedWard?.name
        };

        if (isEditing) {
            // Cập nhật địa chỉ
            setAddresses(addresses.map(addr =>
                addr.id === formData.id ? addressData : addr
            ));
        } else {
            // Thêm địa chỉ mới
            setAddresses([...addresses, { ...addressData, id: Date.now().toString() }]);
        }

        resetForm();
    };

    const handleDelete = (id) => {
        setAddresses(addresses.filter(addr => addr.id !== id));
    };

    const handleSetDefault = (id) => {
        setAddresses(addresses.map(addr => ({
            ...addr,
            isDefault: addr.id === id
        })));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Sổ địa chỉ</h2>
                <button
                    onClick={() => {
                        resetForm();
                        setShowForm(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                >
                    <FiPlus className="w-4 h-4" />
                    <span>Thêm địa chỉ mới</span>
                </button>
            </div>

            {/* Danh sách địa chỉ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map(address => (
                    <div key={address.id} className="border border-gray-200 rounded-xl p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <FiHome className="w-5 h-5 text-gray-500" />
                                <h3 className="font-medium">{address.name}</h3>
                                {address.isDefault && (
                                    <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
                                        Mặc định
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2 text-gray-600">
                            <p><span className="font-medium">Người nhận:</span> {address.receiver}</p>
                            <p><span className="font-medium">Số điện thoại:</span> {address.phone}</p>
                            <p><span className="font-medium">Địa chỉ:</span> {address.address}</p>
                            <p>{address.ward}, {address.district}, {address.province}</p>
                        </div>

                        <div className="flex items-center gap-2 pt-4 border-t">
                            <button
                                onClick={() => handleEdit(address)}
                                className="flex items-center gap-1 px-3 py-1.5 text-gray-600 hover:bg-gray-50 rounded-lg"
                            >
                                <FiEdit2 className="w-4 h-4" />
                                <span>Sửa</span>
                            </button>
                            {!address.isDefault && (
                                <>
                                    <button
                                        onClick={() => handleDelete(address.id)}
                                        className="flex items-center gap-1 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                                    >
                                        <FiTrash2 className="w-4 h-4" />
                                        <span>Xóa</span>
                                    </button>
                                    <button
                                        onClick={() => handleSetDefault(address.id)}
                                        className="flex items-center gap-1 px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg ml-auto"
                                    >
                                        <FiCheck className="w-4 h-4" />
                                        <span>Đặt làm mặc định</span>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Form (Thêm/Sửa) */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl">
                        <div className="flex items-center justify-between p-6 border-b">
                            <h3 className="text-xl font-semibold">
                                {isEditing ? 'Sửa địa chỉ' : 'Thêm địa chỉ mới'}
                            </h3>
                            <button
                                onClick={resetForm}
                                className="p-2 hover:bg-gray-100 rounded-full"
                            >
                                <FiX className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Tên địa chỉ
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="VD: Nhà riêng, Văn phòng"
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Người nhận
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.receiver}
                                        onChange={(e) => setFormData({ ...formData, receiver: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Số điện thoại
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Địa chỉ cụ thể
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        placeholder="Số nhà, tên đường"
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Tỉnh/Thành phố
                                    </label>
                                    <select
                                        value={formData.provinceCode}
                                        onChange={handleProvinceChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    >
                                        <option value="">Chọn Tỉnh/Thành phố</option>
                                        {provinces.map(province => (
                                            <option key={province.code} value={province.code}>
                                                {province.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Quận/Huyện
                                    </label>
                                    <select
                                        value={formData.districtCode}
                                        onChange={handleDistrictChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                        disabled={!formData.provinceCode}
                                    >
                                        <option value="">Chọn Quận/Huyện</option>
                                        {districts.map(district => (
                                            <option key={district.code} value={district.code}>
                                                {district.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Phường/Xã
                                    </label>
                                    <select
                                        value={formData.wardCode}
                                        onChange={(e) => setFormData({ ...formData, wardCode: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                        disabled={!formData.districtCode}
                                    >
                                        <option value="">Chọn Phường/Xã</option>
                                        {wards.map(ward => (
                                            <option key={ward.code} value={ward.code}>
                                                {ward.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="isDefault"
                                    checked={formData.isDefault}
                                    onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                                    className="rounded text-blue-600 focus:ring-blue-500"
                                />
                                <label htmlFor="isDefault" className="text-sm text-gray-700">
                                    Đặt làm địa chỉ mặc định
                                </label>
                            </div>

                            <div className="flex justify-end gap-4 pt-4 border-t">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    disabled={loading}
                                >
                                    {loading ? 'Đang xử lý...' : isEditing ? 'Cập nhật' : 'Thêm địa chỉ'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddressList;