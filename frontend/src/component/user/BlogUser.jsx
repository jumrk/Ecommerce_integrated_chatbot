import React, { useState, useEffect, useRef } from 'react';
import { FiBook, FiTrash2 } from 'react-icons/fi';
import { deleteBlog, getBlogsForUser } from '../../api/blog/blogSevice';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Loading from '../loading/loading';
import ConfirmDialog from '../common/ConfirmDialog';
import Notification from '../notification/Notification';

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(currentPage * itemsPerPage, totalItems);
    return (
        <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-4 border-t bg-gray-50 rounded-b-xl">
            <span className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-0">
                Hiển thị <span className="font-semibold">{startIndex}</span> đến{' '}
                <span className="font-semibold">{endIndex}</span> trong số{' '}
                <span className="font-semibold">{totalItems}</span> kết quả
            </span>
            <div className="flex items-center space-x-2">
                <button
                    className="px-3 py-1 sm:px-4 sm:py-2 border rounded-xl text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    Trước
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        className={`px-3 py-1 sm:px-4 sm:py-2 border rounded-xl transition-colors text-xs sm:text-sm ${currentPage === index + 1
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        onClick={() => onPageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    className="px-3 py-1 sm:px-4 sm:py-2 border rounded-xl text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    Sau
                </button>
            </div>
        </div>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalItems: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};

const BlogUser = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const blogListRef = useRef(null);
    const navigate = useNavigate();
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [blogToDelete, setBlogToDelete] = useState(null);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await getBlogsForUser();
                setBlogs(response.data || response);
                setLoading(false);
            } catch (err) {
                setError('Không thể tải danh sách blog');
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        if (blogListRef.current) {
            blogListRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleDeleteClick = (id) => {
        setBlogToDelete(id);
        setIsConfirmDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (blogToDelete) {
            setIsConfirmDialogOpen(false);
            setLoading(true)
            const responsive = await deleteBlog(blogToDelete)
            if (responsive.success) {
                setBlogs(blogs.filter(blog => blog._id !== blogToDelete));
            }
            setLoading(false)
            setNotification({
                message: responsive.message,
                type: responsive.success ? 'success' : 'error'
            })
        }
    };

    const handleCancelDelete = () => {
        setIsConfirmDialogOpen(false);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const indexOfLastBlog = currentPage * itemsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - itemsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <span className="ml-4 text-gray-600">Đang tải bài viết...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8 sm:py-12 text-red-500 bg-red-50 rounded-xl mx-4 sm:mx-0">
                <p className="text-base sm:text-lg font-semibold">{error}</p>
            </div>
        );
    }

    return (
        <div className="max-w-full sm:max-w-5xl mx-auto py-6 sm:py-8 px-4 sm:px-6" ref={blogListRef}>
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                <div className="px-4 sm:px-6 py-4 sm:py-6 border-b border-gray-200">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                        Danh sách Blog
                    </h2>
                </div>

                <div className="p-4 sm:p-6 space-y-4">
                    {currentBlogs.map((blog) => (
                        <div
                            key={blog._id}
                            className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-200 border border-gray-200"
                        >
                            {/* Image - Hidden on mobile */}
                            {blog.images && blog.images.length > 0 ? (
                                <div className="hidden sm:block">
                                    <img
                                        src={`${import.meta.env.VITE_API_URL}${blog.images[0]}`}
                                        alt={blog.title}
                                        className="w-[120px] h-[80px] object-cover rounded-lg border border-gray-200"
                                        onError={(e) => (e.target.src = '/fallback-image.jpg')} // Fallback image
                                    />
                                </div>
                            ) : (
                                <div className="hidden sm:flex items-center justify-center w-[120px] h-[80px] bg-gray-100 rounded-lg">
                                    <FiBook className="w-6 h-6 text-gray-400" />
                                </div>
                            )}

                            <div className="flex-1">
                                <div className="flex items-start justify-between gap-3 sm:gap-4">
                                    <div className="w-full">
                                        <div className="flex justify-between items-start">
                                            <h3
                                                onClick={() => navigate(`/directory/fashion-blog/${blog._id}`)}
                                                className="cursor-pointer text-base sm:text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-1"
                                            >
                                                {blog.title}
                                            </h3>
                                            <button
                                                onClick={() => handleDeleteClick(blog._id)}
                                                className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors flex-shrink-0"
                                                title="Xóa blog"
                                            >
                                                <FiTrash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                            </button>
                                        </div>
                                        <div
                                            className="text-gray-600 mt-1 sm:mt-2 text-xs sm:text-sm line-clamp-2"
                                            dangerouslySetInnerHTML={{ __html: blog.content }}
                                        />
                                        <div className="mt-2 sm:mt-3 grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500">
                                            <span>
                                                <span className="font-medium">Tác giả:</span> {blog.userId.fullName}
                                            </span>
                                            <span>
                                                <span className="font-medium">Danh mục:</span> {blog.category.name}
                                            </span>
                                            <span>
                                                <span className="font-medium">Ngày tạo:</span> {formatDate(blog.createdAt)}
                                            </span>
                                            <span>
                                                <span className="font-medium">Trạng thái:</span>{' '}
                                                <span
                                                    className={`${blog.status === 'Đã duyệt'
                                                        ? 'text-green-600'
                                                        : 'text-yellow-600'
                                                        } font-medium`}
                                                >
                                                    {blog.status}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {blogs.length === 0 && (
                    <div className="text-center py-8 sm:py-12 bg-gray-50">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <FiBook className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                        </div>
                        <h3 className="text-base sm:text-lg text-gray-500 font-medium">Chưa có blog nào</h3>
                        <p className="text-gray-400 mt-2 text-xs sm:text-sm">Hãy bắt đầu tạo blog đầu tiên của bạn!</p>
                    </div>
                )}

                {blogs.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalItems={blogs.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>

            {/* Confirm Dialog */}
            <ConfirmDialog
                isOpen={isConfirmDialogOpen}
                title="Xác nhận xóa"
                message="Bạn có chắc chắn muốn xóa blog này không?"
                onConfirm={handleConfirmDelete}
                onClose={handleCancelDelete}
            />
        </div>
    );
};

export default BlogUser;