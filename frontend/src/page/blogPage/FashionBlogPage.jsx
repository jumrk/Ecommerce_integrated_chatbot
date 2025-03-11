import React, { useState } from 'react';
import { FaSearch, FaFacebook, FaTwitter, FaInstagram, FaComment, FaHeart, FaShare, FaPlus } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import useShowMore from '../../hooks/useShowMore';
import { ButtonOrange } from '../../component/button/Button';

const FashionBlogPage = () => {
    const [visiblePosts, setVisiblePosts] = useState(6);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [comments, setComments] = useState({});
    const [likedPosts, setLikedPosts] = useState(new Set());
    const navigate = useNavigate();

    // Dữ liệu mẫu cho blog
    const blogPosts = [
        {
            id: 1,
            title: 'Top 10 Xu Hướng Thời Trang 2025',
            excerpt: 'Khám phá các xu hướng mới nhất đang làm mưa làm gió trong năm nay!',
            content: 'Năm 2025 đánh dấu sự bùng nổ của thời trang bền vững, với các thiết kế sử dụng vải tái chế và màu sắc pastel nổi bật. Hãy cùng tìm hiểu cách kết hợp các xu hướng này để luôn dẫn đầu phong cách...',
            image: 'https://i.pinimg.com/736x/ea/5e/09/ea5e096ba271673250b76e2ba6b20c04.jpg',
            category: 'Xu hướng',
            date: '15/03/2025',
            author: 'Nguyễn Minh Anh',
        },
        {
            id: 2,
            title: 'Mẹo Phối Đồ Với Quần Jeans',
            excerpt: 'Học cách phối đồ để luôn nổi bật với quần jeans yêu thích.',
            content: 'Quần jeans là item không thể thiếu trong tủ đồ. Hãy thử kết hợp với áo thun, áo khoác da, và giày sneaker để tạo phong cách đường phố cá tính. Chúng tôi cũng chia sẻ cách chọn jeans phù hợp với dáng người...',
            image: 'https://i.pinimg.com/736x/9e/41/8f/9e418f03e1da0adfa19f254a1f37d3c4.jpg',
            category: 'Mẹo phối đồ',
            date: '10/03/2025',
            author: 'Trần Thị Hồng',
        },
        {
            id: 3,
            title: 'Review Giày Sneaker Đen',
            excerpt: 'Đánh giá chi tiết về độ thoải mái và phong cách của đôi giày này.',
            content: 'Giày sneaker đen từ thương hiệu XYZ mang đến sự thoải mái tuyệt đối với đế êm, chất liệu da cao cấp, và thiết kế tối giản nhưng đầy phong cách. Tôi đã sử dụng trong 2 tháng và đây là cảm nhận...',
            image: 'https://i.pinimg.com/736x/ce/5b/bb/ce5bbb67a205e25e233be3f976b31fc9.jpg',
            category: 'Review',
            date: '05/03/2025',
            author: 'Lê Văn Nam',
        },
        {
            id: 4,
            title: 'Lookbook KOLs: Phong Cách Đường Phố',
            excerpt: 'Cảm hứng từ các KOLs nổi tiếng với phong cách độc đáo.',
            content: 'Các KOLs như Minh Hằng và Sơn Tùng đã tạo nên xu hướng đường phố với quần jeans rách, áo hoodie oversized, và giày chunky. Hãy xem cách họ phối đồ và bắt chước phong cách này...',
            image: 'https://i.pinimg.com/736x/27/8a/7f/278a7f32952903f3e70c444e731018d8.jpg',
            category: 'Lookbook',
            date: '01/03/2025',
            author: 'Phạm Thị Thảo',
        },
        {
            id: 5,
            title: 'Mẹo Chọn Túi Xách Theo Dáng Người',
            excerpt: 'Cách chọn túi phù hợp để tôn lên vóc dáng của bạn.',
            content: 'Túi xách không chỉ là phụ kiện mà còn giúp tôn dáng. Người cao gầy nên chọn túi tote lớn, trong khi người nhỏ nhắn phù hợp với túi crossbody nhỏ gọn. Hãy tham khảo các mẹo chi tiết...',
            image: 'https://i.pinimg.com/736x/fe/8f/ce/fe8fceb06d3132d5f578427d5e2294b5.jpg',
            category: 'Mẹo phối đồ',
            date: '20/02/2025',
            author: 'Hoàng Văn Tuấn',
        },
        {
            id: 6,
            title: 'Lookbook Người Dùng: Dạo Phố Cuối Tuần',
            excerpt: 'Hình ảnh thực tế từ cộng đồng yêu thời trang.',
            content: 'Cộng đồng thời trang tại TP.HCM đã chia sẻ những outfit dạo phố cuối tuần với áo sơ mi, quần short, và giày sneaker. Hãy xem những bộ ảnh đẹp nhất và lấy cảm hứng...',
            image: 'https://i.pinimg.com/736x/a1/89/f5/a189f501460bc1421536fc5866302627.jpg',
            category: 'Lookbook',
            date: '15/02/2025',
            author: 'Nguyễn Thị Huyền',
        },
        {
            id: 7,
            title: 'Xu Hướng Mùa Hè 2025',
            excerpt: 'Mùa hè năm nay nổi bật với váy maxi và phụ kiện ánh kim.',
            content: 'Váy maxi với họa tiết hoa và phụ kiện ánh kim sẽ là xu hướng hot nhất mùa hè 2025. Hãy khám phá cách phối đồ để luôn nổi bật dưới ánh nắng...',
            image: 'https://i.pinimg.com/736x/54/1b/44/541b4452fbe7aa4a5b1444a112189c73.jpg',
            category: 'Xu hướng',
            date: '10/02/2025',
            author: 'Trần Văn Hùng',
        },
        {
            id: 8,
            title: 'Review Áo Khoác Hoodie',
            excerpt: 'Đánh giá chi tiết về chất lượng và phong cách của áo hoodie.',
            content: 'Áo hoodie từ thương hiệu ABC mang đến sự ấm áp, thoải mái, và phong cách trẻ trung. Tôi đã sử dụng trong nhiều dịp và đây là trải nghiệm thực tế...',
            image: 'https://i.pinimg.com/736x/27/8a/7f/278a7f32952903f3e70c444e731018d8.jpg',
            category: 'Review',
            date: '05/02/2025',
            author: 'Lê Thị Mai',
        },
    ];

    const filteredPosts = blogPosts.filter((post) =>
        (post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (!categoryFilter || post.category === categoryFilter)
    );
    const { showMore, toggleShowMore, visibleItems } = useShowMore(filteredPosts, 6)

    const handleCommentSubmit = (postId, comment) => {
        setComments((prev) => ({
            ...prev,
            [postId]: [...(prev[postId] || []), { id: Date.now(), text: comment, date: new Date().toLocaleString() }],
        }));
    };

    const toggleLike = (postId) => {
        setLikedPosts((prev) => {
            const newLikedPosts = new Set(prev);
            if (newLikedPosts.has(postId)) {
                newLikedPosts.delete(postId);
            } else {
                newLikedPosts.add(postId);
            }
            return newLikedPosts;
        });
    };

    const handleShare = (post) => {
        if (navigator.share) {
            navigator.share({
                title: post.title,
                text: post.excerpt,
                url: window.location.href,
            }).catch((error) => console.error('Error sharing:', error));
        } else {
            alert('Sharing is not supported on this browser. Copy the URL: ' + window.location.href);
        }
    };

    const isAuthenticated = true;

    const handleCreatePost = () => {
        if (isAuthenticated) {
            navigate('/directory/fashion-blog/create');
        } else {
            alert('Vui lòng đăng nhập để đăng bài viết.');
            navigate('/login');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12 flex flex-col items-center">
                    <h1 className="text-5xl font-bold text-gray-800 mb-4 drop-shadow-md">BLOG THỜI TRANG</h1>
                    <p className="text-xl text-gray-600 mb-4">Cập nhật xu hướng, mẹo phối đồ và cảm hứng thời trang mới nhất!</p>
                    <button
                        onClick={handleCreatePost}
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full 
            hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 ease-in-out shadow-lg 
            hover:shadow-xl hover:scale-105 font-semibold uppercase tracking-wide flex items-center"
                    >
                        <FaPlus className="mr-2" size={16} /> Đăng bài viết
                    </button>
                </div>

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
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {visibleItems.map((post) => (
                        <div
                            key={post.id}
                            className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
                        >
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-64 object-cover transition-all duration-500 hover:brightness-110"
                            />
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-indigo-600 font-semibold uppercase">{post.category}</span>
                                    <span className="text-sm text-gray-500">{post.date} - {post.author}</span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mt-2 hover:text-indigo-600 transition-colors duration-300">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 mt-2 line-clamp-3">{post.excerpt}</p>
                                <Link
                                    to={`/directory/fashion-blog/${post.id}`}
                                    className="mt-4 inline-block text-indigo-600 font-semibold hover:text-indigo-800 transition-colors duration-300"
                                >
                                    Đọc thêm <span aria-hidden="true">→</span>
                                </Link>
                                <div className="mt-4 flex justify-between items-center text-gray-500">
                                    <div className="flex space-x-4">
                                        <button onClick={() => toggleLike(post.id)} className="hover:text-red-500 transition-colors duration-300">
                                            <FaHeart size={18} color={likedPosts.has(post.id) ? 'red' : 'gray'} />
                                        </button>
                                        <button onClick={() => handleShare(post)} className="hover:text-blue-500 transition-colors duration-300">
                                            <FaShare size={18} />
                                        </button>
                                        <button className="hover:text-gray-700 transition-colors duration-300">
                                            <FaComment size={18} onClick={() => setComments((prev) => ({ ...prev, [post.id]: prev[post.id] || [] }))} />
                                        </button>
                                    </div>
                                </div>
                                {comments[post.id] && (
                                    <div className="mt-4">
                                        <h4 className="font-semibold text-gray-800">Bình luận</h4>
                                        {comments[post.id].map((comment) => (
                                            <div key={comment.id} className="mt-2 text-gray-600 text-sm">
                                                {comment.text} - <span className="text-gray-500">{comment.date}</span>
                                            </div>
                                        ))}
                                        <input
                                            type="text"
                                            placeholder="Viết bình luận..."
                                            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                                            onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit(post.id, e.target.value)}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {showMore && (
                    <div className="text-center mt-8">
                        <ButtonOrange onClick={toggleShowMore} text="Xem thêm" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default FashionBlogPage;