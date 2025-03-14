import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaFacebook, FaTwitter, FaInstagram, FaComment, FaHeart, FaShare } from 'react-icons/fa';
import { SlideGridWhenVisible } from '../../../component/animation/SlideGridWhenVisible';
import { ScaleUpWhenVisible } from '../../../component/animation/ScaleUpWhenVisible';
import { FlipInWhenVisible } from '../../../component/animation/FlipInWhenVisible';
import { RotateInWhenVisible } from '../../../component/animation/RotateInWhenVisible';

const BlogPostDetail = () => {
    const { id } = useParams(); // Lấy ID bài viết từ URL (ví dụ /blog/1)
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]); // Lưu danh sách bình luận cho bài viết
    const [liked, setLiked] = useState(false);
    const [newComment, setNewComment] = useState('');
    const carouselRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    // Dữ liệu mẫu cho blog (thay bằng API sau)
    const blogPosts = [
        {
            id: 1,
            title: 'Top 10 Xu Hướng Thời Trang 2025',
            content: 'Năm 2025 đánh dấu sự bùng nổ của thời trang bền vững, với các thiết kế sử dụng vải tái chế và màu sắc pastel nổi bật. Hãy cùng tìm hiểu cách kết hợp các xu hướng này để luôn dẫn đầu phong cách. Các xu hướng nổi bật bao gồm: váy maxi, quần ống rộng, và phụ kiện ánh kim. Bạn có thể phối đồ với giày sneaker trắng để tạo phong cách trẻ trung, hoặc kết hợp với giày cao gót để sang trọng hơn...',
            images: [
                'https://i.pinimg.com/736x/ea/5e/09/ea5e096ba271673250b76e2ba6b20c04.jpg',
                'https://i.pinimg.com/736x/9e/41/8f/9e418f03e1da0adfa19f254a1f37d3c4.jpg',
                'https://i.pinimg.com/736x/ce/5b/bb/ce5bbb67a205e25e233be3f976b31fc9.jpg',
            ],
            category: 'Xu hướng',
            date: '15/03/2025',
            author: 'Nguyễn Minh Anh',
            initialComments: [
                { id: 1, text: 'Bài viết rất hay, cảm ơn tác giả!', date: '16/03/2025', author: 'Khách A' },
                { id: 2, text: 'Xu hướng này thực sự ấn tượng!', date: '17/03/2025', author: 'Khách B' },
            ],
        },
        {
            id: 2,
            title: 'Mẹo Phối Đồ Với Quần Jeans',
            content: 'Quần jeans là item không thể thiếu trong tủ đồ. Hãy thử kết hợp với áo thun, áo khoác da, và giày sneaker để tạo phong cách đường phố cá tính. Chúng tôi cũng chia sẻ cách chọn jeans phù hợp với dáng người: người cao gầy nên chọn jeans ống rộng, trong khi người nhỏ nhắn phù hợp với jeans skinny. Kết hợp với phụ kiện như mũ snapback hoặc túi tote để hoàn thiện outfit...',
            images: [
                'https://i.pinimg.com/736x/9e/41/8f/9e418f03e1da0adfa19f254a1f37d3c4.jpg',
                'https://i.pinimg.com/736x/27/8a/7f/278a7f32952903f3e70c444e731018d8.jpg',
                'https://i.pinimg.com/736x/fe/8f/ce/fe8fceb06d3132d5f578427d5e2294b5.jpg',
            ],
            category: 'Mẹo phối đồ',
            date: '10/03/2025',
            author: 'Trần Thị Hồng',
            initialComments: [
                { id: 1, text: 'Mẹo này rất hữu ích, cảm ơn!', date: '11/03/2025', author: 'Khách C' },
                { id: 2, text: 'Tôi đã thử và rất đẹp!', date: '12/03/2025', author: 'Khách D' },
            ],
        },
        {
            id: 3,
            title: 'Review Giày Sneaker Đen',
            content: 'Giày sneaker đen từ thương hiệu XYZ mang đến sự thoải mái tuyệt đối với đế êm, chất liệu da cao cấp, và thiết kế tối giản nhưng đầy phong cách. Tôi đã sử dụng trong 2 tháng và đây là cảm nhận: giày nhẹ, không gây đau chân, phù hợp cho cả đi bộ và tập luyện. Tuy nhiên, bạn cần bảo quản cẩn thận để giữ màu đen nguyên vẹn. Phối với quần jeans và áo thun để tạo phong cách đường phố...',
            images: [
                'https://i.pinimg.com/736x/ce/5b/bb/ce5bbb67a205e25e233be3f976b31fc9.jpg',
                'https://i.pinimg.com/736x/54/1b/44/541b4452fbe7aa4a5b1444a112189c73.jpg',
                'https://i.pinimg.com/736x/a1/89/f5/a189f501460bc1421536fc5866302627.jpg',
            ],
            category: 'Review',
            date: '05/03/2025',
            author: 'Lê Văn Nam',
            initialComments: [
                { id: 1, text: 'Giày này tuyệt vời!', date: '06/03/2025', author: 'Khách E' },
                { id: 2, text: 'Tôi sẽ mua thử, cảm ơn review!', date: '07/03/2025', author: 'Khách F' },
            ],
        },
        {
            id: 4,
            title: 'Lookbook KOLs: Phong Cách Đường Phố',
            content: 'Các KOLs như Minh Hằng và Sơn Tùng đã tạo nên xu hướng đường phố với quần jeans rách, áo hoodie oversized, và giày chunky. Hãy xem cách họ phối đồ: Minh Hằng kết hợp jeans rách với áo crop top và giày chunky, trong khi Sơn Tùng chọn hoodie oversized với quần jogger và giày sneaker trắng. Bạn có thể học hỏi để tạo phong cách riêng, thêm phụ kiện như mũ snapback hoặc kính mát...',
            images: [
                'https://i.pinimg.com/736x/27/8a/7f/278a7f32952903f3e70c444e731018d8.jpg',
                'https://i.pinimg.com/736x/fe/8f/ce/fe8fceb06d3132d5f578427d5e2294b5.jpg',
                'https://i.pinimg.com/736x/61/3d/ab/613dab7687b566c26c44b7f8fd943bfb.jpg',
            ],
            category: 'Lookbook',
            date: '01/03/2025',
            author: 'Phạm Thị Thảo',
            initialComments: [
                { id: 1, text: 'Phong cách này quá đẹp!', date: '02/03/2025', author: 'Khách G' },
                { id: 2, text: 'Cảm hứng tuyệt vời!', date: '03/03/2025', author: 'Khách H' },
            ],
        },
        {
            id: 5,
            title: 'Mẹo Chọn Túi Xách Theo Dáng Người',
            content: 'Túi xách không chỉ là phụ kiện mà còn giúp tôn dáng. Người cao gầy nên chọn túi tote lớn để cân đối, trong khi người nhỏ nhắn phù hợp với túi crossbody nhỏ gọn. Người có dáng tròn nên chọn túi hình chữ nhật để tạo đường nét thanh thoát. Kết hợp túi với outfit phù hợp, ví dụ: túi tote với váy maxi, túi crossbody với quần jeans và áo thun...',
            images: [
                'https://i.pinimg.com/736x/fe/8f/ce/fe8fceb06d3132d5f578427d5e2294b5.jpg',
                'https://i.pinimg.com/736x/ea/5e/09/ea5e096ba271673250b76e2ba6b20c04.jpg',
                'https://i.pinimg.com/736x/9e/41/8f/9e418f03e1da0adfa19f254a1f37d3c4.jpg',
            ],
            category: 'Mẹo phối đồ',
            date: '20/02/2025',
            author: 'Hoàng Văn Tuấn',
            initialComments: [
                { id: 1, text: 'Rất hữu ích, cảm ơn!', date: '21/02/2025', author: 'Khách I' },
                { id: 2, text: 'Tôi đã chọn được túi phù hợp!', date: '22/02/2025', author: 'Khách J' },
            ],
        },
        {
            id: 6,
            title: 'Lookbook Người Dùng: Dạo Phố Cuối Tuần',
            content: 'Cộng đồng thời trang tại TP.HCM đã chia sẻ những outfit dạo phố cuối tuần với áo sơ mi, quần short, và giày sneaker. Một số outfit nổi bật: áo sơ mi trắng kết hợp quần short kaki và giày sneaker trắng, hoặc áo hoodie oversized với jeans rách và giày chunky. Hãy chụp ảnh outfit của bạn và gửi đến chúng tôi để cùng chia sẻ...',
            images: [
                'https://i.pinimg.com/736x/a1/89/f5/a189f501460bc1421536fc5866302627.jpg',
                'https://i.pinimg.com/736x/ce/5b/bb/ce5bbb67a205e25e233be3f976b31fc9.jpg',
                'https://i.pinimg.com/736x/27/8a/7f/278a7f32952903f3e70c444e731018d8.jpg',
            ],
            category: 'Lookbook',
            date: '15/02/2025',
            author: 'Nguyễn Thị Huyền',
            initialComments: [
                { id: 1, text: 'Lookbook này tuyệt vời!', date: '16/02/2025', author: 'Khách K' },
                { id: 2, text: 'Tôi sẽ thử outfit này!', date: '17/02/2025', author: 'Khách L' },
            ],
        },
        {
            id: 7,
            title: 'Xu Hướng Mùa Hè 2025',
            content: 'Mùa hè năm nay nổi bật với váy maxi và phụ kiện ánh kim. Váy maxi với họa tiết hoa và màu pastel là lựa chọn hoàn hảo để dạo biển hoặc đi chơi. Phối với sandal hoặc giày cao gót, thêm vòng cổ ánh kim để làm nổi bật. Đừng quên bảo vệ da với mũ rộng vành...',
            images: [
                'https://i.pinimg.com/736x/54/1b/44/541b4452fbe7aa4a5b1444a112189c73.jpg',
                'https://i.pinimg.com/736x/fe/8f/ce/fe8fceb06d3132d5f578427d5e2294b5.jpg',
                'https://i.pinimg.com/736x/9e/41/8f/9e418f03e1da0adfa19f254a1f37d3c4.jpg',
            ],
            category: 'Xu hướng',
            date: '10/02/2025',
            author: 'Trần Văn Hùng',
            initialComments: [
                { id: 1, text: 'Xu hướng này rất đẹp!', date: '11/02/2025', author: 'Khách M' },
                { id: 2, text: 'Tôi thích váy maxi!', date: '12/02/2025', author: 'Khách N' },
            ],
        },
        {
            id: 8,
            title: 'Review Áo Khoác Hoodie',
            content: 'Áo hoodie từ thương hiệu ABC mang đến sự ấm áp, thoải mái, và phong cách trẻ trung. Chất liệu cotton mềm mại, thiết kế oversized phù hợp với mọi dáng người. Tôi đã mặc trong các buổi dạo phố và thấy rất vừa vặn, dễ phối với jeans và giày sneaker. Tuy nhiên, cần giặt nhẹ để giữ form áo...',
            images: [
                'https://i.pinimg.com/736x/27/8a/7f/278a7f32952903f3e70c444e731018d8.jpg',
                'https://i.pinimg.com/736x/ea/5e/09/ea5e096ba271673250b76e2ba6b20c04.jpg',
                'https://i.pinimg.com/736x/ce/5b/bb/ce5bbb67a205e25e233be3f976b31fc9.jpg',
            ],
            category: 'Review',
            date: '05/02/2025',
            author: 'Lê Thị Mai',
            initialComments: [
                { id: 1, text: 'Áo hoodie này chất lượng tốt!', date: '06/02/2025', author: 'Khách O' },
                { id: 2, text: 'Tôi sẽ mua ngay!', date: '07/02/2025', author: 'Khách P' },
            ],
        },
    ];

    // Lấy bài viết dựa trên ID
    useEffect(() => {
        const foundPost = blogPosts.find((p) => p.id === parseInt(id));
        if (foundPost) {
            setPost(foundPost);
            // Khởi tạo bình luận từ dữ liệu mẫu của bài viết
            setComments(foundPost.initialComments || []);
        } else {
            setPost(null);
        }
    }, [id]);

    // Xử lý kéo chuột trong carousel
    const handleMouseDown = (e) => {
        e.preventDefault(); // Ngăn chặn hành vi kéo thả mặc định
        setIsDragging(true);
        setStartX(e.pageX - carouselRef.current.offsetLeft);
        setScrollLeft(carouselRef.current.scrollLeft);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault(); // Ngăn chặn hành vi kéo thả mặc định
        const x = e.pageX - carouselRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Tốc độ scroll
        carouselRef.current.scrollLeft = scrollLeft - walk;

        // Tính toán chỉ số ảnh hiện tại dựa trên scroll
        const cardWidth = carouselRef.current.querySelector('.carousel-card')?.offsetWidth || 0;
        const scrollPosition = carouselRef.current.scrollLeft;
        const newIndex = Math.round(scrollPosition / cardWidth);
        setCurrentIndex(newIndex);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Xử lý bình luận
    const handleCommentSubmit = (e) => {
        if (e.key === 'Enter' && newComment.trim()) {
            setComments((prev) => [
                ...prev,
                { id: Date.now(), text: newComment.trim(), date: new Date().toLocaleString(), author: 'Khách' },
            ]);
            setNewComment('');
        }
    };

    // Xử lý thích
    const toggleLike = () => {
        setLiked(!liked);
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
            alert('Sharing is not supported on this browser. Copy the URL: ' + window.location.href);
        }
    };

    if (!post) {
        return <div className="min-h-screen bg-gray-100 flex items-center justify-center text-gray-800">Bài viết không tồn tại</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <SlideGridWhenVisible direction="left">
                    <button
                        onClick={() => { history.back() }}
                        className="mb-8 flex items-center text-indigo-600 font-semibold hover:text-indigo-800 transition-colors duration-300"
                    >
                        <FaArrowLeft className="mr-2" size={16} /> Quay lại
                    </button>
                </SlideGridWhenVisible>

                {/* Tiêu đề */}
                <FlipInWhenVisible>
                    <h1 className="text-4xl font-bold text-gray-800 mb-6 drop-shadow-md">{post.title}</h1>
                </FlipInWhenVisible>

                {/* Carousel ảnh chồng lấn */}
                <ScaleUpWhenVisible>
                    <div
                        ref={carouselRef}
                        className="mb-8 relative w-full h-96 overflow-hidden perspective-1000"
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                    >
                        <div className="absolute w-full h-full flex items-center justify-start space-x-[-20px] carousel-track">
                            {post.images.map((image, index) => (
                                <div
                                    key={index}
                                    className="carousel-card transform transition-all duration-500 ease-out w-96 h-96 rounded-xl shadow-lg bg-white overflow-hidden"
                                    style={{
                                        transform: `translateX(${index * -100 + (currentIndex === index ? 0 : (index < currentIndex ? -50 : 50))}px) scale(${currentIndex === index ? 1.1 : 0.9}) rotateY(${currentIndex === index ? 0 : (index < currentIndex ? -10 : 10)}deg)`,
                                        zIndex: post.images.length - Math.abs(index - currentIndex),
                                        userSelect: 'none',
                                        WebkitUserDrag: 'none',
                                        MozUserDrag: 'none',
                                    }}
                                >
                                    <img
                                        src={image}
                                        alt={`${post.title} - Image ${index + 1}`}
                                        className="w-full h-full object-cover rounded-xl transition-all duration-500 hover:brightness-110"
                                        onDragStart={(e) => e.preventDefault()}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4">
                            <button
                                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                                className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-all duration-300"
                            >
                                <FaArrowLeft size={16} />
                            </button>
                            <button
                                onClick={() => setCurrentIndex((prev) => Math.min(post.images.length - 1, prev + 1))}
                                className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-all duration-300"
                            >
                                <FaArrowLeft size={16} className="rotate-180" />
                            </button>
                        </div>
                    </div>
                </ScaleUpWhenVisible>

                <SlideGridWhenVisible direction="right">
                    <div className="flex justify-between items-center mb-4 text-gray-500">
                        <span>{post.date} - {post.author}</span>
                        <span className="text-sm text-indigo-600 uppercase">{post.category}</span>
                    </div>
                </SlideGridWhenVisible>

                {/* Nội dung chi tiết */}
                <SlideGridWhenVisible direction="up">
                    <div className="prose prose-lg text-gray-700 leading-relaxed mb-8">
                        <p>{post.content}</p>
                    </div>
                </SlideGridWhenVisible>

                {/* Tương tác */}
                <RotateInWhenVisible>
                    <div className="flex justify-between items-center mb-6 text-gray-500">
                        <button onClick={toggleLike} className="flex items-center space-x-2 hover:text-red-500 transition-colors duration-300">
                            <FaHeart size={18} color={liked ? 'red' : 'gray'} /> <span>{liked ? 'Đã thích' : 'Thích'}</span>
                        </button>
                        <button onClick={handleShare} className="flex items-center space-x-2 hover:text-blue-500 transition-colors duration-300">
                            <FaShare size={18} /> <span>Chia sẻ</span>
                        </button>
                    </div>
                </RotateInWhenVisible>

                {/* Phần bình luận */}
                <FlipInWhenVisible>
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Bình luận</h3>
                        <div className="space-y-4">
                            {comments.map((comment, index) => (
                                <SlideGridWhenVisible key={comment.id} direction="right" delay={index * 0.1}>
                                    <div className="bg-white p-4 rounded-lg shadow-md text-gray-600">
                                        <p>{comment.text}</p>
                                        <span className="text-sm text-gray-500 mt-2 block">{comment.date} - {comment.author}</span>
                                    </div>
                                </SlideGridWhenVisible>
                            ))}
                        </div>
                        <ScaleUpWhenVisible>
                            <div className="mt-4">
                                <input
                                    type="text"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    onKeyPress={handleCommentSubmit}
                                    placeholder="Viết bình luận của bạn..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                                />
                            </div>
                        </ScaleUpWhenVisible>
                    </div>
                </FlipInWhenVisible>

                {/* Nút quay lại */}
                <SlideGridWhenVisible direction="up">
                    <button
                        onClick={() => navigate('/directory/fashion-blog')}
                        className="mt-8 flex items-center text-indigo-600 font-semibold hover:text-indigo-800 transition-colors duration-300"
                    >
                        <FaArrowLeft className="mr-2" size={16} /> Quay lại danh sách blog
                    </button>
                </SlideGridWhenVisible>
            </div>
        </div>
    );
};

export default BlogPostDetail;