import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaImage, FaCheck, FaTimes, FaTrash } from 'react-icons/fa';

const CreateBlogPost = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: 'Xu hướng',
        images: [],
        date: new Date().toLocaleDateString(),
        author: 'Khách hàng',
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'images') {
            const newImages = Array.from(files);
            setFormData((prev) => ({
                ...prev,
                images: [...prev.images, ...newImages].slice(0, 5),
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const removeImage = (index) => {
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title.trim() || !formData.content.trim() || formData.images.length === 0) {
            setError('Vui lòng điền đầy đủ tiêu đề, nội dung và tải lên ít nhất một hình ảnh.');
            return;
        }

        setIsSubmitting(true);
        setError('');


        setTimeout(() => {
            console.log('Bài viết đã được gửi để xét duyệt:', {
                ...formData,
                status: 'Chờ xét duyệt',
            });

            setTimeout(() => {
                setFormData({
                    title: '',
                    content: '',
                    category: 'Xu hướng',
                    images: [],
                    date: new Date().toLocaleDateString(),
                    author: 'Khách hàng',
                });
                setIsSubmitting(false);
                navigate('/directory/fashion-blog');
            }, 2000);
        }, 1000);
    };

    const handleBack = () => {
        navigate('/directory/fashion-blog');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <button
                    onClick={handleBack}
                    className="mb-8 flex items-center text-indigo-600 font-semibold hover:text-indigo-800 transition-colors duration-300"
                >
                    <FaArrowLeft className="mr-2" size={16} /> Quay lại
                </button>

                <h1 className="text-4xl font-bold text-gray-800 mb-6 drop-shadow-md">ĐĂNG BÀI BLOG</h1>
                <p className="text-gray-600 mb-8">Tạo bài viết mới và chờ xét duyệt từ admin.</p>

                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6">
                    {error && (
                        <div className="mb-4 text-red-500 text-sm flex items-center">
                            <FaTimes className="mr-2" /> {error}
                        </div>
                    )}

                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">Tiêu đề</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                            placeholder="Nhập tiêu đề bài viết..."
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">Nội dung</label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 h-40 resize-none"
                            placeholder="Viết nội dung bài viết của bạn..."
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">Danh mục</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                        >
                            {['Xu hướng', 'Mẹo phối đồ', 'Review', 'Lookbook'].map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">Hình ảnh</label>
                        <label className="w-full flex items-center px-4 py-3 border border-gray-300 rounded-md bg-white cursor-pointer hover:bg-gray-50 transition-all duration-300">
                            <FaImage className="mr-2 text-gray-500" size={20} />
                            <span className="text-gray-700">Chọn nhiều hình ảnh (tối đa 5 ảnh)...</span>
                            <input
                                type="file"
                                name="images"
                                accept="image/*"
                                multiple
                                onChange={handleChange}
                                className="hidden"
                            />
                        </label>

                        {formData.images.length > 0 && (
                            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {formData.images.map((image, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt={`Image ${index + 1}`}
                                            className="w-full h-32 object-cover rounded-md shadow-md transition-all duration-300 hover:brightness-90"
                                        />
                                        <button
                                            onClick={() => removeImage(index)}
                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-all duration-300"
                                        >
                                            <FaTrash size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        {formData.images.length >= 5 && (
                            <p className="mt-2 text-sm text-gray-500">Đã đạt tối đa 5 ảnh. Xóa ảnh để thêm mới.</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3 rounded-md font-semibold transition-all duration-300 flex items-center justify-center ${isSubmitting
                            ? 'bg-gray-400 text-white cursor-not-allowed'
                            : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg'
                            }`}
                    >
                        {isSubmitting ? (
                            <>
                                <FaCheck className="mr-2 animate-spin" size={16} /> Đang gửi...
                            </>
                        ) : (
                            'Gửi bài viết'
                        )}
                    </button>
                </form>

                {isSubmitting && (
                    <div className="mt-4 text-center text-gray-600">
                        Bài viết của bạn đã được gửi và đang chờ xét duyệt từ admin. Vui lòng quay lại sau để kiểm tra trạng thái.
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateBlogPost;