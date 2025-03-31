import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiFilter, FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import LoadingSpinner from '../../../component/common/LoadingSpinner';
import Pagination from '../../../component/pagination/Pagination';
import { formatDate } from '../../../utils/format/formatDate';
import ConfirmDialog from '../../../component/common/ConfirmDialog';
import { toast } from 'react-toastify';
import EditBlogModal from '../../../component/admin/blogManagement/EditBlogModal';
import ButtonEdit from '../../../component/button/ButtonEdit';
import ButtonDelete from '../../../component/button/ButtonDelete';
import StatusBadge from '../../../component/condition/ConditionCustom';

const BlogListPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterOpen, setFilterOpen] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const itemsPerPage = 10;
    const [showEditModal, setShowEditModal] = useState(false);

    // Mock data - thay thế bằng API call thực tế
    const [blogs, setBlogs] = useState([
        {
            _id: "641f1a2b9f1b2c3d4e5f0a01",
            title: "Top 10 Xu Hướng Thời Trang 2025",
            content: "Năm 2025 đánh dấu sự bùng nổ của thời trang bền vững...",
            images: ["https://i.pinimg.com/736x/ea/5e/09/ea5e096ba271673250b76e2ba6b20c04.jpg"],
            category: "Xu hướng",
            author: "Nguyễn Minh Anh",
            createdAt: "2025-03-15T00:00:00Z",
            updatedAt: "2025-03-15T00:00:00Z",
            status: "pending" // pending hoặc approved
        },
        {
            _id: "641f1a22b9f1b2c3d4e5f0a02",
            title: "Top 10adsadsa Xu Hướng Thời Trang 2025",
            content: "Năm 202ádsdsadsadsa5 đánh dấu sự bùng nổ của thời trang bền vững...",
            images: ["https://i.pinimg.com/736x/ea/5e/09/ea5e096ba271673250b76e2ba6b20c04.jpg"],
            category: "Xu hướng",
            date: "2025-03-15",
            author: "Nguyễn Minh Anh",
            createdAt: "2025-03-15T00:00:00Z",
            updatedAt: "2025-03-15T00:00:00Z"
        },
        // Thêm dữ liệu mẫu khác
    ]);

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
            // API call để xóa bài viết
            await new Promise(resolve => setTimeout(resolve, 1000));
            setBlogs(blogs.filter(b => b._id !== selectedBlog._id));
            toast.success('Xóa bài viết thành công');
        } catch (error) {
            toast.error('Có lỗi xảy ra khi xóa bài viết');
        } finally {
            setLoading(false);
            setShowConfirmDelete(false);
            setSelectedBlog(null);
        }
    };

    const handleEdit = (blog) => {
        console.log('Blog data being passed:', blog);
        setSelectedBlog(blog);
        setShowEditModal(true);
    };

    const handleEditModalClose = (wasUpdated) => {
        if (wasUpdated) {
            // Refresh lại danh sách blog nếu có cập nhật
            fetchBlogs(); // Hàm fetch lại danh sách blog
        }
        setShowEditModal(false);
        setSelectedBlog(null);
    };

    // Tính toán blogs cho trang hiện tại
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstItem, indexOfLastItem);

    // Thêm hàm fetchBlogs
    const fetchBlogs = async () => {
        try {
            setLoading(true);
            // Giả lập API call - sau này thay bằng API thật
            await new Promise(resolve => setTimeout(resolve, 1000));
            // Tạm thời dùng lại dữ liệu mock
            // Sau này sẽ fetch từ API thật
            setLoading(false);
        } catch (error) {
            toast.error('Có lỗi xảy ra khi tải danh sách bài viết');
            setLoading(false);
        }
    };

    // Thêm useEffect để fetch dữ liệu khi component mount
    useEffect(() => {
        fetchBlogs();
    }, []);

    if (loading) return <LoadingSpinner />;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
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
                                <select className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Tất cả</option>
                                    <option value="Xu hướng">Xu hướng</option>
                                    <option value="Thời trang">Thời trang</option>
                                    <option value="Lifestyle">Lifestyle</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tác giả
                                </label>
                                <select className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Tất cả</option>
                                    <option value="Nguyễn Minh Anh">Nguyễn Minh Anh</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Sắp xếp theo
                                </label>
                                <select className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
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
                                    Tác giả
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
                                                src={blog.images[0]}
                                                alt=""
                                                className="w-16 h-16 object-cover rounded-lg mr-4"
                                            />
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 hover:text-blue-600 cursor-pointer"
                                                    onClick={() => navigate(`/admin/blogs/blog-detail/${blog._id}`)}>
                                                    {blog.title}
                                                </div>
                                                <div className="text-sm text-gray-500 line-clamp-2">
                                                    {blog.content}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                            {blog.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {blog.author}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatDate(blog.createdAt)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <StatusBadge
                                            type={blog.status === 'approved' ? 'success' : 'warning'}
                                            text={blog.status === 'approved' ? 'Đã duyệt' : 'Chờ duyệt'}
                                        />
                                    </td>
                                    <td className="flex items-center gap-2 mt-8 justify-end whitespace-nowrap text-right text-sm font-medium">
                                        <ButtonEdit
                                            onClick={() => handleEdit(blog)}
                                        />
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

            <EditBlogModal
                isOpen={showEditModal}
                onClose={(wasUpdated) => {
                    setShowEditModal(false);
                    if (wasUpdated) {
                        fetchBlogs(); // Refresh lại danh sách nếu có cập nhật
                    }
                }}
                blog={selectedBlog}
            />
        </div >
    );
};

export default BlogListPage;