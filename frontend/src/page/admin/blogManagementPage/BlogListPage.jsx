import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { formatDate } from '../../../utils/format/formatDate';
import { toast } from 'react-toastify';
import { deleteBlog, getBlogs } from '../../../api/blog/blogSevice';
import Loading from '../../../component/loading/loading';
import Pagination from '../../../component/pagination/Pagination';
import ConfirmDialog from '../../../component/common/ConfirmDialog';
import Notification from '../../../component/notification/Notification';
import ButtonDelete from '../../../component/button/ButtonDelete';
import StatusBadge from '../../../component/condition/ConditionCustom';
import { getCategories } from '../../../api/blog/categoryBlogSevice';
import { Helmet } from 'react-helmet';


const BlogListPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterOpen, setFilterOpen] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 10;
    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortOrder, setSortOrder] = useState('newest');

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const handleDelete = (blog) => {
        setSelectedBlog(blog);
        setShowConfirmDelete(true);
    };

    const confirmDelete = async () => {
        try {
            setLoading(true);
            // API call to delete the blog
            const response = await deleteBlog(selectedBlog._id)
            if (response.success) {
                setBlogs(blogs.filter(b => b._id !== selectedBlog._id));
            }
            setNotification({ message: response.message, type: response.success ? 'success' : 'error' });
        } catch (error) {
            setNotification({ message: 'Có lỗi xảy ra khi xóa bài viết', type: 'error' });
        } finally {
            setLoading(false);
            setShowConfirmDelete(false);
            setSelectedBlog(null);
        }
    };

    // Fetch blogs and categories
    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const response = await getBlogs();
            setBlogs(response);
        } catch (error) {
            toast.error('Có lỗi xảy ra khi tải danh sách bài viết');
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await getCategories();
            setCategories(response);
        } catch (error) {
            toast.error('Có lỗi xảy ra khi tải danh sách danh mục');
        }
    };

    // Fetch data when component mounts
    useEffect(() => {
        fetchBlogs();
        fetchCategories();
    }, []);

    if (loading) return <Loading />;

    // Filter blogs based on search term and selected category
    const filteredBlogs = blogs.filter(blog => {
        const matchesTitle = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory ? blog.category._id === selectedCategory : true;
        return matchesTitle && matchesCategory;
    });

    // Sort blogs based on selected order
    const sortedBlogs = [...filteredBlogs].sort((a, b) => {
        if (sortOrder === 'newest') {
            return new Date(b.createdAt) - new Date(a.createdAt); // Newest first
        } else {
            return new Date(a.createdAt) - new Date(b.createdAt); // Oldest first
        }
    });

    // Calculate blogs for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBlogs = sortedBlogs.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <Helmet>
                <title>Danh sách blog</title>
            </Helmet>
            {notification.message && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification({ message: '', type: '' })}
                />
            )}
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Quản lý bài viết</h1>
                </div>

                {/* Search and Filter */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm bài viết..."
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                            <button
                                onClick={() => setFilterOpen(!filterOpen)}
                                className="p-2 border rounded-lg hover:bg-gray-50"
                            >
                                <FiFilter className="text-gray-600" />
                            </button>
                        </div>
                    </div>

                    {filterOpen && (
                        <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Danh mục
                                </label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Tất cả</option>
                                    {categories.map(category => (
                                        <option key={category._id} value={category._id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Sắp xếp theo
                                </label>
                                <select
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="newest">Mới nhất</option>
                                    <option value="oldest">Cũ nhất</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>

                {/* Blogs Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Bài viết
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Danh mục
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ngày đăng
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Trạng thái
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentBlogs.map((blog) => (
                                <tr key={blog._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <img
                                                src={import.meta.env.VITE_API_URL + blog.images[0]}
                                                alt=""
                                                className="w-16 h-16 object-cover rounded-lg mr-4"
                                            />
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 hover:text-blue-600 cursor-pointer"
                                                    onClick={() => navigate(`/admin/blogs/blog-detail/${blog._id}`)}>
                                                    {blog.title}
                                                </div>
                                                <div className="text-sm text-gray-500 line-clamp-2" dangerouslySetInnerHTML={{ __html: blog.content }} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                            {typeof blog.category === 'string' ? blog.category : blog.category.name}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatDate(blog.createdAt)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <StatusBadge
                                            type={blog.status === 'Đã duyệt' ? 'success' : blog.status === 'Chờ duyệt' ? 'warning' : 'danger'}
                                            text={blog.status}
                                        />
                                    </td>
                                    <td className="flex items-center mt-8 justify-center whitespace-nowrap text-right text-sm font-medium">
                                        <ButtonDelete
                                            onClick={() => handleDelete(blog)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <Pagination
                        currentPage={currentPage}
                        totalItems={blogs.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>

            {/* Confirm Delete Dialog */}
            <ConfirmDialog
                isOpen={showConfirmDelete}
                title="Xác nhận xóa"
                message={`Bạn có chắc chắn muốn xóa bài viết "${selectedBlog?.title}"?`}
                onClose={() => setShowConfirmDelete(false)}
                onConfirm={confirmDelete}
            />
        </div>
    );
};

export default BlogListPage;