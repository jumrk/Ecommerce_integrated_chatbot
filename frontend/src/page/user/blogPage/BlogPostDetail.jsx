import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHeart, FaShare, FaPaperPlane } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion'; // Thêm framer-motion
import { getBlogById } from '../../../api/blog/blogSevice';
import { checkBlogLike, getBlogLikesCount, likeBlog } from '../../../api/blog/likeBlogSevice';
import { createComment, getCommentsByBlog } from '../../../api/blog/commentBlogSevice';
import Notification from '../../../component/notification/Notification';
import Loading from '../../../component/loading/loading';
import { Helmet } from 'react-helmet';
import { getToken } from '../../../utils/storage';

const BlogPostDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState(null);
    const carouselRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const checkUser = getToken();

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('vi-VN', options);
    };

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            try {
                const fetchedPost = await getBlogById(id);
                setPost(fetchedPost);
                if (checkUser) {
                    const likeStatus = await checkBlogLike(id);
                    setLiked(likeStatus.success);
                }
                const count = await getBlogLikesCount(id);
                setLikeCount(count.data);
                const response = await getCommentsByBlog(id);
                setComments(response);
            } catch (error) {
                console.error('Error fetching blog post:', error);
                setNotification({ message: 'Error fetching blog post', type: 'error' });
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    // Xử lý carousel
    const handleNext = () => {
        setCurrentIndex((prev) => Math.min(prev + 1, post.images.length - 1));
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };

    // Xử lý bình luận
    const handleCommentSubmit = async () => {
        if (newComment.trim()) {
            setLoading(true);
            try {
                const response = await createComment(id, newComment.trim());
                setNewComment('');
                const updatedComments = await getCommentsByBlog(id);
                setComments(updatedComments);
                setNotification({ message: response.message, type: 'success' });
            } catch (error) {
                console.error('Error submitting comment:', error);
                setNotification({ message: 'Error submitting comment', type: 'error' });
            } finally {
                setLoading(false);
            }
        }
    };

    // Xử lý thích
    const toggleLike = async () => {
        try {
            await likeBlog(id);
            setLiked(!liked);
            setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
            setNotification({ message: liked ? 'Removed like' : 'Liked the post!', type: 'success' });
        } catch (error) {
            console.error('Error liking the blog:', error);
            setNotification({ message: 'Error liking the blog', type: 'error' });
        }
    };

    // Xử lý chia sẻ
    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: post?.title,
                text: post?.content.slice(0, 100) + '...',
                url: window.location.href,
            }).catch((error) => console.error('Error sharing:', error));
        } else {
            navigator.clipboard.writeText(window.location.href);
            setNotification({ message: 'Link copied to clipboard!', type: 'success' });
        }
    };

    if (loading) return <Loading />;
    if (!post) return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-800">Bài viết không tồn tại</div>;

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <Helmet>
                <title>{post.title}</title>
            </Helmet>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Nút quay lại */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate(-1)}
                    className="mb-8 flex items-center text-indigo-600 font-semibold hover:text-indigo-800 transition-colors duration-300"
                >
                    <FaArrowLeft className="mr-2" size={16} /> Quay lại
                </motion.button>

                {/* Tiêu đề */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight"
                >
                    {post.title}
                </motion.h1>

                {/* Carousel ảnh */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative mb-12 h-96 rounded-2xl overflow-hidden shadow-xl"
                >
                    <AnimatePresence>
                        <motion.img
                            key={currentIndex}
                            src={import.meta.env.VITE_API_URL + post.images[currentIndex]}
                            alt={`${post.title} - Image ${currentIndex + 1}`}
                            className="w-full h-full object-cover"
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                        />
                    </AnimatePresence>
                    <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 transform -translate-y-1/2">
                        <button
                            onClick={handlePrev}
                            disabled={currentIndex === 0}
                            className="bg-white/80 p-3 rounded-full shadow-md hover:bg-white transition-all duration-300 disabled:opacity-50"
                        >
                            <FaArrowLeft size={16} />
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={currentIndex === post.images.length - 1}
                            className="bg-white/80 p-3 rounded-full shadow-md hover:bg-white transition-all duration-300 disabled:opacity-50"
                        >
                            <FaArrowLeft size={16} className="rotate-180" />
                        </button>
                    </div>
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                        {post.images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-white scale-125' : 'bg-white/50'}`}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Thông tin bài viết */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-between items-center mb-6 text-gray-500"
                >
                    <span>{formatDate(post.createdAt)} - {post.userId.fullName}</span>
                    <span className="text-sm font-semibold text-indigo-600 uppercase">{post.category.name || post.category}</span>
                </motion.div>

                {/* Nội dung */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="prose prose-lg text-gray-700 leading-relaxed mb-12"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Tương tác */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-between items-center mb-12"
                >
                    <button
                        onClick={toggleLike}
                        disabled={!checkUser}
                        className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors duration-300"
                    >
                        <FaHeart size={20} color={liked ? '#EF4444' : '#6B7280'} />
                        <span>{liked ? 'Đã thích' : 'Thích'} ({likeCount})</span>
                    </button>
                    <button
                        onClick={handleShare}
                        className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors duration-300"
                    >
                        <FaShare size={20} /> <span>Chia sẻ</span>
                    </button>
                </motion.div>

                {/* Bình luận */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-12">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Bình luận</h3>
                    <div className="space-y-6">
                        {comments.map((comment) => (
                            <motion.div
                                key={comment._id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-sm"
                            >
                                <img
                                    src={import.meta.env.VITE_API_URL + comment.userId?.avatar || 'https://via.placeholder.com/40'}
                                    alt="Avatar"
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <p className="text-gray-700">{comment.content}</p>
                                    <span className="text-sm text-gray-500 mt-1 block">
                                        {formatDate(comment.createdAt)} - {comment.userId ? comment.userId.fullName : 'Khách'}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-8 flex items-center space-x-4"
                    >
                        <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            disabled={!checkUser}
                            placeholder="Viết bình luận của bạn..."
                            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                        />
                        <button
                            onClick={handleCommentSubmit}
                            disabled={!newComment.trim() || !checkUser}
                            className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition-all duration-300 disabled:bg-gray-300"
                        >
                            <FaPaperPlane size={16} />
                        </button>
                    </motion.div>
                </motion.div>

                {/* Nút quay lại danh sách */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate('/directory/fashion-blog')}
                    className="flex items-center text-indigo-600 font-semibold hover:text-indigo-800 transition-colors duration-300"
                >
                    <FaArrowLeft className="mr-2" size={16} /> Quay lại danh sách blog
                </motion.button>

                {/* Notification */}
                {notification && (
                    <Notification
                        message={notification.message}
                        type={notification.type}
                        onClose={() => setNotification(null)}
                    />
                )}
            </div>
        </div>
    );
};

export default BlogPostDetail;