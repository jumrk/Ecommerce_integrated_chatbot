import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import useShowMore from '../../../hooks/useShowMore';
import { ButtonOrange } from '../../../component/button/Button';
import { SlideGridWhenVisible } from '../../../component/animation/SlideGridWhenVisible';
import { ScaleUpWhenVisible } from '../../../component/animation/ScaleUpWhenVisible';
import { FlipInWhenVisible } from '../../../component/animation/FlipInWhenVisible';
import { getApprovedBlogs } from '../../../api/blog/blogSevice';
import { formatDate } from '../../../utils/format/formatDate';
import Loading from '../../../component/loading/loading';
import { Helmet } from 'react-helmet';
const FashionBlogPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApprovedBlogs = async () => {
            try {
                const blogs = await getApprovedBlogs();
                setBlogPosts(blogs);
                setLoading(false)
            } catch (error) {
                console.error('Error fetching approved blogs:', error);
            }
        };

        fetchApprovedBlogs();
    }, []);

    const filteredPosts = blogPosts.filter((post) =>
        (post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.category.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (!categoryFilter || post.category.name === categoryFilter)
    );

    const { showMore, toggleShowMore, visibleItems } = useShowMore(filteredPosts, 6);

    const isAuthenticated = true;

    const handleCreatePost = () => {
        if (isAuthenticated) {
            navigate('/directory/fashion-blog/create');
        } else {
            alert('Vui lòng đăng nhập để đăng bài viết.');
            navigate('/login');
        }
    };
    if (loading) {
        return <Loading />
    }
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
            <Helmet>
                <title>Fashion Blog</title>
            </Helmet>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <FlipInWhenVisible>
                    <div className="text-center mb-12 flex flex-col items-center">
                        <h1 className="text-5xl font-bold text-gray-800 mb-4 drop-shadow-md">BLOG THỜI TRANG</h1>
                        <p className="text-xl text-gray-600 mb-4">Cập nhật xu hướng, mẹo phối đồ và cảm hứng thời trang mới nhất!</p>
                        <ScaleUpWhenVisible>
                            <button
                                onClick={handleCreatePost}
                                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full 
                                hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 ease-in-out shadow-lg 
                                hover:shadow-xl hover:scale-105 font-semibold uppercase tracking-wide flex items-center"
                            >
                                <FaPlus className="mr-2" size={16} /> Đăng bài viết
                            </button>
                        </ScaleUpWhenVisible>
                    </div>
                </FlipInWhenVisible>

                <ScaleUpWhenVisible>
                    <div className="mb-8 flex flex-col md:flex-row gap-4">
                        <div className="relative w-full max-w-md mx-auto">
                            <input
                                type="text"
                                placeholder="Tìm kiếm bài viết..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-12 py-3 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out placeholder-gray-400"
                            />
                            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                        </div>

                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="w-full md:w-48 px-4 py-3 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out"
                        >
                            <option value="">Tất cả danh mục</option>
                            {['Xu hướng', 'Mẹo phối đồ', 'Review', 'Lookbook'].map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </ScaleUpWhenVisible>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {visibleItems.map((post, index) => (
                        <SlideGridWhenVisible
                            key={post._id}
                            direction={index % 2 === 0 ? "left" : "right"}
                            delay={index * 0.1}
                        >
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                                <ScaleUpWhenVisible>
                                    <img
                                        src={import.meta.env.VITE_API_URL + post.images[0]}
                                        alt={post.title}
                                        className="w-full h-64 object-cover transition-all duration-500 hover:brightness-110"
                                    />
                                </ScaleUpWhenVisible>
                                <div className="p-6">
                                    <FlipInWhenVisible>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm text-indigo-600 font-semibold uppercase">{post.category.name}</span>
                                            <span className="text-sm text-gray-500">{formatDate(post.createdAt)}</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-800 mt-2 hover:text-indigo-600 transition-colors duration-300">
                                            {post.title}
                                        </h3>
                                        <div className="text-sm text-gray-500 line-clamp-2" dangerouslySetInnerHTML={{ __html: post.content }} />
                                    </FlipInWhenVisible>

                                    <ScaleUpWhenVisible>
                                        <Link
                                            to={`/directory/fashion-blog/${post._id}`}
                                            className="mt-4 inline-block text-indigo-600 font-semibold hover:text-indigo-800 transition-colors duration-300"
                                        >
                                            Đọc thêm <span aria-hidden="true">→</span>
                                        </Link>
                                    </ScaleUpWhenVisible>
                                </div>
                            </div>
                        </SlideGridWhenVisible>
                    ))}
                </div>

                {showMore && (
                    <ScaleUpWhenVisible>
                        <div className="text-center mt-8">
                            <ButtonOrange onClick={toggleShowMore} text="Xem thêm" />
                        </div>
                    </ScaleUpWhenVisible>
                )}
            </div>
        </div>
    );
};

export default FashionBlogPage;