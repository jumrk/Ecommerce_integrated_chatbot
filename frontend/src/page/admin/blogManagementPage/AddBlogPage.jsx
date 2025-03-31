import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../../component/common/LoadingSpinner';
import ImageUpload from '../../../component/common/ImageUpload';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddBlogPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        images: [],
        category: '',
        author: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.content || !formData.category) {
            toast.error('Vui lòng điền đầy đủ thông tin bắt buộc');
            return;
        }

        try {
            setLoading(true);
            // API call to save blog
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast.success('Thêm bài viết thành công');
            navigate('/admin/blogs');
        } catch (error) {
            toast.error('Có lỗi xảy ra');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="mr-4 p-2 hover:bg-gray-100 rounded-full"
                    >
                        <FiArrowLeft className="w-6 h-6" />
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Thêm bài viết mới
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tiêu đề *
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                                onChange={(images) => setFormData({ ...formData, images })}
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
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
                                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
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
                                onChange={(content) => setFormData({ ...formData, content })}
                                className="h-64 mb-12"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/blogs')}
                            className="px-6 py-2 border rounded-lg hover:bg-gray-50"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Đăng bài
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBlogPage;