import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiEdit2, FiTrash2, FiCheck, FiX } from 'react-icons/fi';
import Loading from '../../../component/loading/loading';
import ConfirmDialog from '../../../component/common/ConfirmDialog';
import { toast } from 'react-toastify';
import { formatDate } from '../../../utils/format/formatDate';
import { getBlogById, deleteBlog, browse_Article, rejectArticle } from '../../../api/blog/blogSevice';
import { Helmet } from 'react-helmet';

const BlogDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showApproveConfirm, setShowApproveConfirm] = useState(false);
    const [showRejectConfirm, setShowRejectConfirm] = useState(false);

    useEffect(() => {
        fetchBlogDetail();
    }, [id]);

    const fetchBlogDetail = async () => {
        try {
            setLoading(true);
            const blogData = await getBlogById(id);
            setBlog(blogData);
        } catch (error) {
            toast.error('Có lỗi xảy ra khi tải bài viết');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            setLoading(true);
            await deleteBlog(id); // Call delete API
            toast.success('Xóa bài viết thành công');
            navigate('/admin/blogs');
        } catch (error) {
            toast.error('Có lỗi xảy ra khi xóa bài viết');
        } finally {
            setLoading(false);
            setShowDeleteConfirm(false);
        }
    };

    const handleApprove = async () => {
        try {
            setLoading(true);
            await browse_Article(id); // Call approve API
            setBlog(prev => ({ ...prev, status: 'Đã duyệt' }));
            toast.success('Đã duyệt bài viết thành công');
        } catch (error) {
            toast.error('Có lỗi xảy ra khi duyệt bài viết');
        } finally {
            setLoading(false);
            setShowApproveConfirm(false);
        }
    };

    const handleReject = async () => {
        try {
            setLoading(true);
            await rejectArticle(id); // Call reject API
            setBlog(prev => ({ ...prev, status: 'Đã từ chối' }));
            toast.success('Đã từ chối bài viết');
        } catch (error) {
            toast.error('Có lỗi xảy ra khi từ chối bài viết');
        } finally {
            setLoading(false);
            setShowRejectConfirm(false);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            // Giả lập API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setBlog(prev => ({
                ...prev,
                comments: prev.comments.filter(comment => comment.id !== commentId)
            }));
            toast.success('Đã xóa bình luận');
        } catch (error) {
            toast.error('Có lỗi xảy ra khi xóa bình luận');
        }
    };

    if (loading) return <Loading />;
    if (!blog) return <div className="text-center py-8">Không tìm thấy bài viết</div>;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <Helmet>
                <title>Chi tiết bài viết</title>
            </Helmet>
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                        <button
                            onClick={() => navigate(-1)}
                            className="mr-4 p-2 hover:bg-gray-100 rounded-full"
                        >
                            <FiArrowLeft className="w-6 h-6" />
                        </button>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Chi tiết bài viết
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        {blog.status === 'Chờ duyệt' && (
                            <>
                                <button
                                    onClick={() => setShowApproveConfirm(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                >
                                    <FiCheck /> Duyệt
                                </button>
                                <button
                                    onClick={() => setShowRejectConfirm(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                                >
                                    <FiX /> Từ chối
                                </button>
                            </>
                        )}
                        <button
                            onClick={() => setShowDeleteConfirm(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                            <FiTrash2 /> Xóa
                        </button>
                    </div>
                </div>

                {/* Blog Content */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    {/* Blog Header */}
                    <div className="p-6 border-b">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            {blog.title}
                        </h2>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center gap-4">
                                <span>Tác giả: {blog.userId.fullName}</span>
                                <span>Danh mục: {blog.category.name}</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold
                                    ${blog.status === 'Đã duyệt'
                                        ? 'bg-green-100 text-green-800'
                                        : blog.status === 'Đã từ chối'
                                            ? 'bg-red-100 text-red-800'
                                            : 'bg-yellow-100 text-yellow-800'}`}>
                                    {blog.status}
                                </span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span>Đăng: {formatDate(blog.createdAt)}</span>
                                <span>Cập nhật: {formatDate(blog.updatedAt)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Images */}
                    {blog.images.length > 0 && (
                        <div className="p-6 border-b">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {blog.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={import.meta.env.VITE_API_URL + image}
                                        alt={`Hình ${index + 1}`}
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Content */}
                    <div className="p-6">
                        <div
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        />
                    </div>

                    {/* Comments Section */}
                    {blog.comments && (
                        <div className="p-6 bg-gray-50">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                Bình luận ({blog.comments.length})
                            </h3>
                            <div className="space-y-4">
                                {blog.comments.map((comment) => (
                                    <div key={comment.id} className="bg-white p-4 rounded-lg shadow-sm">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-gray-900">
                                                        {comment.author}
                                                    </span>
                                                    <span className="text-sm text-gray-500">
                                                        {formatDate(comment.createdAt)}
                                                    </span>
                                                </div>
                                                <p className="text-gray-700 mt-1">{comment.content}</p>
                                            </div>
                                            <button
                                                onClick={() => handleDeleteComment(comment.id)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <FiTrash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>

            {/* Delete Confirmation */}
            <ConfirmDialog
                isOpen={showDeleteConfirm}
                title="Xác nhận xóa"
                message="Bạn có chắc chắn muốn xóa bài viết này? Hành động này không thể hoàn tác."
                onClose={() => setShowDeleteConfirm(false)}
                onConfirm={handleDelete}
            />

            {/* Approve Confirmation */}
            <ConfirmDialog
                isOpen={showApproveConfirm}
                title="Xác nhận duyệt"
                message="Bạn có chắc chắn muốn duyệt bài viết này?"
                onClose={() => setShowApproveConfirm(false)}
                onConfirm={handleApprove}
            />

            {/* Reject Confirmation */}
            <ConfirmDialog
                isOpen={showRejectConfirm}
                title="Xác nhận từ chối"
                message="Bạn có chắc chắn muốn từ chối bài viết này?"
                onClose={() => setShowRejectConfirm(false)}
                onConfirm={handleReject}
            />
        </div>
    );
};

export default BlogDetailPage;