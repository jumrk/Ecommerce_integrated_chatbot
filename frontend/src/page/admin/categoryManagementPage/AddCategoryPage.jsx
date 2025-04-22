import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUpload, FaTimes } from 'react-icons/fa';
import { createCategoryProduct } from '../../../api/category/categoryProduct';
import Notification from '../../../component/notification/Notification';
import { Helmet } from 'react-helmet';

const AddCategoryPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: null
    });
    const [errors, setErrors] = useState({});
    const [notification, setNotification] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 1024 * 1024) { // 1MB
                setErrors(prev => ({
                    ...prev,
                    image: 'Kích thước ảnh không được vượt quá 1MB'
                }));
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                setFormData(prev => ({ ...prev, image: file }));
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setPreview(null);
        setFormData(prev => ({ ...prev, image: null }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = 'Vui lòng nhập tên danh mục';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            setLoading(true);

            // Tạo FormData để gửi dữ liệu
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('description', formData.description);
            if (formData.image) {
                formDataToSend.append('category', formData.image);
            }

            await createCategoryProduct(formDataToSend);

            // Hiển thị thông báo thành công
            setNotification({ message: 'Thêm danh mục thành công!', type: 'success' });

            // Điều hướng về trang danh mục
            setTimeout(() => navigate('/admin/categories/list-category'), 3000);
        } catch (error) {
            setNotification({ message: 'Có lỗi xảy ra khi thêm danh mục!', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <Helmet>
                <title>Thêm danh mục sản phẩm</title>
            </Helmet>
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Thêm danh mục mới</h1>

                {notification && (
                    <Notification
                        message={notification.message}
                        type={notification.type}
                        onClose={() => setNotification(null)}
                    />
                )}

                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
                    {/* Icon Upload */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Icon danh mục
                        </label>
                        <div className="flex items-center justify-center">
                            {preview ? (
                                <div className="relative">
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="w-32 h-32 object-cover rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                    >
                                        <FaTimes size={14} />
                                    </button>
                                </div>
                            ) : (
                                <div className="w-32">
                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <FaUpload className="w-8 h-8 mb-2 text-gray-500" />
                                            <p className="text-xs text-gray-500">Tải ảnh lên</p>
                                        </div>
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                    </label>
                                </div>
                            )}
                        </div>
                        {errors.icon && (
                            <p className="mt-1 text-sm text-red-600">{errors.icon}</p>
                        )}
                    </div>

                    {/* Name Input */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tên danh mục <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 
                                ${errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
                            placeholder="Nhập tên danh mục"
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                        )}
                    </div>

                    {/* Description Input */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mô tả
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                            placeholder="Nhập mô tả danh mục"
                        />
                    </div>

                    {/* Error Message */}
                    {errors.submit && (
                        <div className="mb-6">
                            <p className="text-sm text-red-600">{errors.submit}</p>
                        </div>
                    )}

                    {/* Form Actions */}
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/categories')}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                                ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Đang xử lý...' : 'Thêm danh mục'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCategoryPage;