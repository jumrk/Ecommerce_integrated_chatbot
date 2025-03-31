import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../common/LoadingSpinner';
import ImageUpload from '../../common/ImageUpload';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditBlogModal = ({ isOpen, onClose, blog }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        images: [],
        category: '',
        author: ''
    });

    // Thêm state để theo dõi việc form đã được chỉnh sửa
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        if (blog) {
            // Xử lý dữ liệu blog khi được truyền vào
            setFormData({
                title: blog.title || '',
                content: blog.content || '',
                images: Array.isArray(blog.images) ? [...blog.images] : [],
                category: blog.category || '',
                author: blog.author || ''
            });
            setIsDirty(false); // Reset trạng thái form
        }
    }, [blog]);

    // Hàm xử lý thay đổi form
    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        setIsDirty(true);
    };

    // Xử lý đóng modal
    const handleClose = () => {
        if (isDirty) {
            if (window.confirm('Bạn có những thay đổi chưa lưu. Bạn có chắc muốn đóng không?')) {
                onClose(false);
            }
        } else {
            onClose(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation chi tiết
        const errors = [];
        if (!formData.title.trim()) errors.push('Tiêu đề không được để trống');
        if (!formData.content.trim()) errors.push('Nội dung không được để trống');
        if (!formData.category) errors.push('Vui lòng chọn danh mục');
        if (!formData.author.trim()) errors.push('Tác giả không được để trống');

        if (errors.length > 0) {
            errors.forEach(error => toast.error(error));
            return;
        }

        try {
            setLoading(true);
            // Giả lập API call - sau này thay bằng API thật
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Chuẩn bị dữ liệu để gửi lên server
            const updateData = {
                ...formData,
                _id: blog._id,
                updatedAt: new Date().toISOString()
            };

            console.log('Sending update data:', updateData);

            toast.success('Cập nhật bài viết thành công');
            onClose(true); // Trả về true để báo hiệu cập nhật thành công
        } catch (error) {
            console.error('Error updating blog:', error);
            toast.error('Có lỗi xảy ra khi cập nhật bài viết');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800">
                            Chỉnh sửa bài viết: {formData.title}
                        </h2>
                        <button
                            onClick={handleClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>

                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tiêu đề *
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => handleChange('title', e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nhập tiêu đề bài viết"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Hình ảnh
                                </label>
                                <ImageUpload
                                    images={formData.images}
                                    onChange={(images) => handleChange('images', images)}
                                    multiple={true}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Danh mục *
                                    </label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => handleChange('category', e.target.value)}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Chọn danh mục</option>
                                        <option value="Xu hướng">Xu hướng</option>
                                        <option value="Thời trang">Thời trang</option>
                                        <option value="Lifestyle">Lifestyle</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tác giả *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.author}
                                        onChange={(e) => handleChange('author', e.target.value)}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Nhập tên tác giả"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nội dung *
                                </label>
                                <ReactQuill
                                    value={formData.content}
                                    onChange={(content) => handleChange('content', content)}
                                    className="h-64 mb-12"
                                />
                            </div>

                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={handleClose}
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
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditBlogModal;