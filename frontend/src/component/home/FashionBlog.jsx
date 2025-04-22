import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ScaleUpWhenVisible } from '../animation/ScaleUpWhenVisible';
import { SlideInWhenVisible } from '../animation/SlideInWhenVisible';
import { getApprovedBlogs } from '../../api/blog/blogSevice';
const FashionBlog = () => {
    const [blogPosts, getBlogPost] = useState([])
    useEffect(() => {
        const fetchBlog = async () => {
            const response = await getApprovedBlogs()
            getBlogPost(response)
        }
        fetchBlog()
    }, [])
    return (
        <section className="py-12 bg-gray-100">
            <div className="text-center mb-8">
                <ScaleUpWhenVisible delay={0.2}>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">BLOG & LOOKBOOK THỜI TRANG</h2>
                </ScaleUpWhenVisible>

                <SlideInWhenVisible direction="down" delay={0.2}>
                    <p className="text-gray-600 mt-2">Cập nhật xu hướng, mẹo phối đồ và cảm hứng từ cộng đồng!</p>
                </SlideInWhenVisible>
            </div>

            {blogPosts && blogPosts.length > 0 ? (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 bento-container">
                    {/* Post 1 */}
                    {blogPosts[0] && (
                        <div className="md:col-span-2 bento-card transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                            <SlideInWhenVisible direction="left" delay={0.2}>
                                <img
                                    src={import.meta.env.VITE_API_URL + (blogPosts[0]?.images?.[0] || 'placeholder.jpg')}
                                    alt={blogPosts[0]?.title || 'Blog Post'}
                                    className="w-full h-64 object-cover rounded-t-xl transition-all duration-500 group-hover:brightness-110"
                                />
                                <div className="p-6">
                                    <div
                                        className="text-sm text-indigo-600 font-semibold uppercase line-clamp-1 overflow-hidden"
                                        dangerouslySetInnerHTML={{ __html: blogPosts[0]?.content || 'Nội dung' }}
                                    />
                                    <h3 className="text-xl font-bold text-gray-800 mt-2 group-hover:text-indigo-600 transition-colors duration-300">
                                        <Link to={`/directory/fashion-blog/${blogPosts[0]?._id || blogPosts[0]?.id || ''}`}>
                                            {blogPosts[0]?.title || 'Tiêu đề'}
                                        </Link>
                                    </h3>
                                    <p className="text-gray-600 mt-2">
                                        {blogPosts[0]?.userId?.fullName || blogPosts[0]?.excerpt || 'Tác giả'}
                                    </p>
                                </div>
                            </SlideInWhenVisible>
                        </div>
                    )}

                    {/* Post 2 */}
                    {blogPosts[1] && (
                        <div className="bento-card transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                            <SlideInWhenVisible direction="up" delay={0.2}>
                                <img
                                    src={import.meta.env.VITE_API_URL + (blogPosts[1]?.images?.[0] || 'placeholder.jpg')}
                                    alt={blogPosts[1]?.title || 'Blog Post'}
                                    className="w-full h-48 object-cover rounded-t-xl transition-all duration-500 group-hover:brightness-110"
                                />
                                <div className="p-4">
                                    <div
                                        className="text-sm text-indigo-600 font-semibold uppercase line-clamp-1 overflow-hidden"
                                        dangerouslySetInnerHTML={{ __html: blogPosts[1]?.content || 'Nội dung' }}
                                    />
                                    <h3 className="text-lg font-bold text-gray-800 mt-2 group-hover:text-indigo-600 transition-colors duration-300">
                                        <Link to={`/directory/fashion-blog/${blogPosts[1]?._id || blogPosts[1]?.id || ''}`}>
                                            {blogPosts[1]?.title || 'Tiêu đề'}
                                        </Link>
                                    </h3>
                                    <p className="text-gray-600 mt-2">
                                        {blogPosts[1]?.userId?.fullName || blogPosts[1]?.excerpt || 'Tác giả'}
                                    </p>
                                </div>
                            </SlideInWhenVisible>
                        </div>
                    )}

                    {/* Post 3 */}
                    {blogPosts[2] && (
                        <div className="bento-card transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                            <SlideInWhenVisible direction="up" delay={0.2}>
                                <img
                                    src={import.meta.env.VITE_API_URL + (blogPosts[2]?.images?.[0] || 'placeholder.jpg')}
                                    alt={blogPosts[2]?.title || 'Blog Post'}
                                    className="w-full h-48 object-cover rounded-t-xl transition-all duration-500 group-hover:brightness-110"
                                />
                                <div className="p-4">
                                    <div
                                        className="text-sm text-indigo-600 font-semibold uppercase line-clamp-1 overflow-hidden"
                                        dangerouslySetInnerHTML={{ __html: blogPosts[2]?.content || 'Nội dung' }}
                                    />
                                    <h3 className="text-lg font-bold text-gray-800 mt-2 group-hover:text-indigo-600 transition-colors duration-300">
                                        <Link to={`/directory/fashion-blog/${blogPosts[2]?._id || blogPosts[2]?.id || ''}`}>
                                            {blogPosts[2]?.title || 'Tiêu đề'}
                                        </Link>
                                    </h3>
                                    <p className="text-gray-600 mt-2">
                                        {blogPosts[2]?.userId?.fullName || blogPosts[2]?.excerpt || 'Tác giả'}
                                    </p>
                                </div>
                            </SlideInWhenVisible>
                        </div>
                    )}

                    {/* Post 4 */}
                    {blogPosts[3] && (
                        <div className="md:col-span-2 bento-card transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                            <SlideInWhenVisible direction="right" delay={0.2}>
                                <img
                                    src={import.meta.env.VITE_API_URL + (blogPosts[3]?.images?.[0] || 'placeholder.jpg')}
                                    alt={blogPosts[3]?.title || 'Blog Post'}
                                    className="w-full h-64 object-cover rounded-t-xl transition-all duration-500 group-hover:brightness-110"
                                />
                                <div className="p-6">
                                    <div
                                        className="text-sm text-indigo-600 font-semibold uppercase line-clamp-1 overflow-hidden"
                                        dangerouslySetInnerHTML={{ __html: blogPosts[3]?.content || 'Nội dung' }}
                                    />
                                    <h3 className="text-xl font-bold text-gray-800 mt-2 group-hover:text-indigo-600 transition-colors duration-300">
                                        <Link to={`/directory/fashion-blog/${blogPosts[3]?._id || blogPosts[3]?.id || ''}`}>
                                            {blogPosts[3]?.title || 'Tiêu đề'}
                                        </Link>
                                    </h3>
                                    <p className="text-gray-600 mt-2">
                                        {blogPosts[3]?.userId?.fullName || blogPosts[3]?.excerpt || 'Tác giả'}
                                    </p>
                                </div>
                            </SlideInWhenVisible>
                        </div>
                    )}

                    {/* Post 5 */}
                    {blogPosts[4] && (
                        <div className="bento-card transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                            <ScaleUpWhenVisible delay={0.2}>
                                <img
                                    src={import.meta.env.VITE_API_URL + (blogPosts[4]?.images?.[0] || 'placeholder.jpg')}
                                    alt={blogPosts[4]?.title || 'Blog Post'}
                                    className="w-full h-48 object-cover rounded-t-xl transition-all duration-500 group-hover:brightness-110"
                                />
                                <div className="p-4">
                                    <div
                                        className="text-sm text-indigo-600 font-semibold uppercase line-clamp-1 overflow-hidden"
                                        dangerouslySetInnerHTML={{ __html: blogPosts[4]?.content || 'Nội dung' }}
                                    />
                                    <h3 className="text-lg font-bold text-gray-800 mt-2 group-hover:text-indigo-600 transition-colors duration-300">
                                        <Link to={`/directory/fashion-blog/${blogPosts[4]?._id || blogPosts[4]?.id || ''}`}>
                                            {blogPosts[4]?.title || 'Tiêu đề'}
                                        </Link>
                                    </h3>
                                    <p className="text-gray-600 mt-2">
                                        {blogPosts[4]?.userId?.fullName || blogPosts[4]?.excerpt || 'Tác giả'}
                                    </p>
                                </div>
                            </ScaleUpWhenVisible>
                        </div>
                    )}

                    {/* Post 6 */}
                    {blogPosts[5] && (
                        <div className="bento-card transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                            <ScaleUpWhenVisible delay={0.3}>
                                <img
                                    src={import.meta.env.VITE_API_URL + (blogPosts[5]?.images?.[0] || 'placeholder.jpg')}
                                    alt={blogPosts[5]?.title || 'Blog Post'}
                                    className="w-full h-48 object-cover rounded-t-xl transition-all duration-500 group-hover:brightness-110"
                                />
                                <div className="p-4">
                                    <div
                                        className="text-sm text-indigo-600 font-semibold uppercase line-clamp-1 overflow-hidden"
                                        dangerouslySetInnerHTML={{ __html: blogPosts[5]?.content || 'Nội dung' }}
                                    />
                                    <h3 className="text-lg font-bold text-gray-800 mt-2 group-hover:text-indigo-600 transition-colors duration-300">
                                        <Link to={`/directory/fashion-blog/${blogPosts[5]?._id || blogPosts[5]?.id || ''}`}>
                                            {blogPosts[5]?.title || 'Tiêu đề'}
                                        </Link>
                                    </h3>
                                    <p className="text-gray-600 mt-2">
                                        {blogPosts[5]?.userId?.fullName || blogPosts[5]?.excerpt || 'Tác giả'}
                                    </p>
                                </div>
                            </ScaleUpWhenVisible>
                        </div>
                    )}
                </div>
            ) : (
                <div>Chưa có blog nào</div>
            )}
        </section >
    );
};

export default FashionBlog;