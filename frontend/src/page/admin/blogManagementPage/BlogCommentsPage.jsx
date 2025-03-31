import React, { useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import LoadingSpinner from '../../../component/common/LoadingSpinner';
import ConfirmDialog from '../../../component/common/ConfirmDialog';
import { toast } from 'react-toastify';
import { formatDate } from '../../../utils/format/formatDate';
import Pagination from '../../../component/pagination/Pagination';

const BlogCommentsPage = () => {
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [selectedComment, setSelectedComment] = useState(null);
    const itemsPerPage = 10;

    const [comments, setComments] = useState([
        {
            id: 1,
            blogTitle: "Top 10 Xu Hướng Thời Trang 2025",
            blogId: "641f1a2b9f1b2c3d4e5f0a01",
            author: "Nguyễn Văn A",
            content: "Bài viết rất hay và bổ ích!",
            createdAt: "2025-03-15T10:30:00Z"
        },
        // Thêm dữ liệu mẫu khác
    ]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const handleDelete = (comment) => {
        setSelectedComment(comment);
        setShowConfirmDelete(true);
    };

    const confirmDelete = async () => {
        try {
            setLoading(true);
            // API call để xóa bình luận
            await new Promise(resolve => setTimeout(resolve, 1000));
            setComments(comments.filter(c => c.id !== selectedComment.id));
            toast.success('Xóa bình luận thành công');
        } catch (error) {
            toast.error('Có lỗi xảy ra khi xóa bình luận');
        } finally {
            setLoading(false);
            setShowConfirmDelete(false);
            setSelectedComment(null);
        }
    };

    // Tính toán comments cho trang hiện tại
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentComments = comments.slice(indexOfFirstItem, indexOfLastItem);

    if (loading) return <LoadingSpinner />;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Quản lý bình luận</h1>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Bài viết
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Người bình luận
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Nội dung
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thời gian
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentComments.map((comment) => (
                                <tr key={comment.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                                            {comment.blogTitle}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{comment.author}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-500 line-clamp-2">
                                            {comment.content}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">
                                            {formatDate(comment.createdAt)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleDelete(comment)}
                                            className="text-red-600 hover:text-red-900"
                                            title="Xóa"
                                        >
                                            <FiTrash2 className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <Pagination
                        currentPage={currentPage}
                        totalItems={comments.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>

            {/* Confirm Delete Dialog */}
            <ConfirmDialog
                isOpen={showConfirmDelete}
                title="Xác nhận xóa"
                message={`Bạn có chắc chắn muốn xóa bình luận này?`}
                onClose={() => setShowConfirmDelete(false)}
                onConfirm={confirmDelete}
            />
        </div>
    );
};

export default BlogCommentsPage;