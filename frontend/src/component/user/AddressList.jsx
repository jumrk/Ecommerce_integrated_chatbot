import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCheck, FiHome } from 'react-icons/fi';
import useLocationApi from '../../hooks/useLocationApi';
import { getAddressesAPI, createAddressAPI, updateAddressAPI, deleteAddressAPI } from '../../api/address/addressAPI';
import { motion } from 'framer-motion';

const AddressList = () => {
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const { provinces, districts, wards, loading, fetchDistricts, fetchWards } = useLocationApi();

    const [addresses, setAddresses] = useState([]); // Dữ liệu từ backend
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

    const [error, setError] = useState(null);
    const [loadingForm, setLoadingForm] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null); // Thông báo thành công
    const [failureMessage, setFailureMessage] = useState(null); // Thông báo thất bại

    // Lấy danh sách địa chỉ từ backend
    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await getAddressesAPI();
                setAddresses(response.data);
            } catch (err) {
                console.error("Lỗi khi lấy danh sách địa chỉ:", err);
                setError("Không thể tải danh sách địa chỉ");
            }
        };

        fetchAddresses();
    }, []);

    // Xử lý khi chọn địa chỉ để sửa
    const handleEdit = (address) => {
        setIsEditing(true);
        setShowForm(true);
        fetchDistricts(address.provinceCode);
        fetchWards(address.districtCode);
        setFormData({
            id: address._id,
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

    // Reset thông báo
    const resetMessages = () => {
        setSuccessMessage(null);
        setFailureMessage(null);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingForm(true);
        resetMessages();

        try {
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
                // Gửi request cập nhật địa chỉ
                const updatedAddress = await updateAddressAPI(formData.id, addressData);
                setAddresses(addresses.map(addr => (addr._id === formData.id ? updatedAddress.data : addr)));
                setSuccessMessage("Cập nhật địa chỉ thành công!");
            } else {
                // Gửi request thêm địa chỉ mới
                const newAddress = await createAddressAPI(addressData);
                setAddresses([...addresses, newAddress.data]);
                setSuccessMessage("Thêm địa chỉ mới thành công!");
            }

            resetForm();
        } catch (err) {
            console.error("Lỗi khi lưu địa chỉ:", err);
            setFailureMessage("Không thể lưu địa chỉ. Vui lòng thử lại.");
        } finally {
            setLoadingForm(false);
        }
    };

    const handleDelete = async (id) => {
        resetMessages();
        try {
            await deleteAddressAPI(id);
            setAddresses(addresses.filter(addr => addr._id !== id));
            setSuccessMessage("Xóa địa chỉ thành công!");
        } catch (err) {
            console.error("Lỗi khi xóa địa chỉ:", err);
            setFailureMessage("Không thể xóa địa chỉ. Vui lòng thử lại.");
        }
    };

    const handleSetDefault = async (id) => {
        resetMessages();
        try {
            // Cập nhật địa chỉ được đặt làm mặc định
            const updatedAddress = await updateAddressAPI(id, { isDefault: true });

            // Cập nhật danh sách địa chỉ: chỉ một địa chỉ có `isDefault: true`
            const updatedAddresses = addresses.map(addr => ({
                ...addr,
                isDefault: addr._id === id
            }));
            setAddresses(updatedAddresses);

            setSuccessMessage("Đặt địa chỉ mặc định thành công!");
        } catch (err) {
            console.error("Lỗi khi đặt địa chỉ mặc định:", err);
            setFailureMessage("Không thể đặt địa chỉ mặc định. Vui lòng thử lại.");
        }
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

            {/* Thông báo thành công */}
            {successMessage && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4 mt-4"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center"
                    >
                        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </motion.div>
                    <p className="text-gray-700">{successMessage}</p>
                </motion.div>
            )}

            {/* Thông báo thất bại */}
            {failureMessage && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4 mt-4"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="w-16 h-16 bg-red-100 rounded-full mx-auto flex items-center justify-center"
                    >
                        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </motion.div>
                    <p className="text-red-700">{failureMessage}</p>
                </motion.div>
            )}

            {/* Danh sách địa chỉ */}
            {addresses.length === 0 ? (
                <p className="text-gray-500 text-center">Bạn chưa có địa chỉ nào.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses.map(address => (
                        <div key={address._id} className="border border-gray-200 rounded-xl p-6 space-y-4">
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
                                            onClick={() => handleDelete(address._id)}
                                            className="flex items-center gap-1 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                                        >
                                            <FiTrash2 className="w-4 h-4" />
                                            <span>Xóa</span>
                                        </button>
                                        <button
                                            onClick={() => handleSetDefault(address._id)}
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
            )}

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
                                    disabled={loadingForm}
                                >
                                    {loadingForm ? 'Đang xử lý...' : isEditing ? 'Cập nhật' : 'Thêm địa chỉ'}
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