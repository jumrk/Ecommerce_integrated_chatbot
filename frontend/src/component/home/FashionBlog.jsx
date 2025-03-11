import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const FashionBlog = () => {
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
    return (
        <section className="py-12 bg-gray-100">
            <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">BLOG & LOOKBOOK THỜI TRANG</h2>
                <p className="text-gray-600 mt-2">Cập nhật xu hướng, mẹo phối đồ và cảm hứng từ cộng đồng!</p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 bento-container">

                <div className="md:col-span-2 bento-card transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                    <img
                        src={blogPosts[0].image}
                        alt={blogPosts[0].title}
                        className="w-full h-64 object-cover rounded-t-xl transition-all duration-500 group-hover:brightness-110"
                    />
                    <div className="p-6">
                        <span className="text-sm text-indigo-600 font-semibold uppercase">{blogPosts[0].type}</span>
                        <h3 className="text-xl font-bold text-gray-800 mt-2 group-hover:text-indigo-600 transition-colors duration-300">
                            <Link to={`/directory/fashion-blog/${blogPosts[0].id}`}>
                                {blogPosts[0].title}
                            </Link>
                        </h3>
                        <p className="text-gray-600 mt-2">{blogPosts[0].excerpt}</p>
                    </div>
                </div>

                <div className="bento-card transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                    <img
                        src={blogPosts[1].image}
                        alt={blogPosts[1].title}
                        className="w-full h-48 object-cover rounded-t-xl transition-all duration-500 group-hover:brightness-110"
                    />
                    <div className="p-4">
                        <span className="text-sm text-indigo-600 font-semibold uppercase">{blogPosts[1].type}</span>
                        <h3 className="text-lg font-bold text-gray-800 mt-2 group-hover:text-indigo-600 transition-colors duration-300">
                            <Link to={`/directory/fashion-blog/${blogPosts[1].id}`}>
                                {blogPosts[1].title}
                            </Link>
                        </h3>
                        <p className="text-gray-600 mt-2">{blogPosts[1].excerpt}</p>
                    </div>
                </div>

                <div className="bento-card transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                    <img
                        src={blogPosts[2].image}
                        alt={blogPosts[2].title}
                        className="w-full h-48 object-cover rounded-t-xl transition-all duration-500 group-hover:brightness-110"
                    />
                    <div className="p-4">
                        <span className="text-sm text-indigo-600 font-semibold uppercase">{blogPosts[2].type}</span>
                        <h3 className="text-lg font-bold text-gray-800 mt-2 group-hover:text-indigo-600 transition-colors duration-300">
                            <Link to={`/directory/fashion-blog/${blogPosts[2].id}`}>
                                {blogPosts[2].title}
                            </Link>
                        </h3>
                        <p className="text-gray-600 mt-2">{blogPosts[2].excerpt}</p>
                    </div>
                </div>

                <div className="md:col-span-2 bento-card transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                    <img
                        src={blogPosts[3].image}
                        alt={blogPosts[3].title}
                        className="w-full h-64 object-cover rounded-t-xl transition-all duration-500 group-hover:brightness-110"
                    />
                    <div className="p-6">
                        <span className="text-sm text-indigo-600 font-semibold uppercase">{blogPosts[3].type}</span>
                        <h3 className="text-xl font-bold text-gray-800 mt-2 group-hover:text-indigo-600 transition-colors duration-300">
                            <Link to={`/directory/fashion-blog/${blogPosts[2].id}`}>
                                {blogPosts[3].title}
                            </Link>
                        </h3>
                        <p className="text-gray-600 mt-2">{blogPosts[3].excerpt}</p>
                    </div>
                </div>

                <div className="bento-card transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                    <img
                        src={blogPosts[4].image}
                        alt={blogPosts[4].title}
                        className="w-full h-48 object-cover rounded-t-xl transition-all duration-500 group-hover:brightness-110"
                    />
                    <div className="p-4">
                        <span className="text-sm text-indigo-600 font-semibold uppercase">{blogPosts[4].type}</span>
                        <h3 className="text-lg font-bold text-gray-800 mt-2 group-hover:text-indigo-600 transition-colors duration-300">
                            <Link to={`/directory/fashion-blog/${blogPosts[2].id}`}>
                                {blogPosts[4].title}
                            </Link>
                        </h3>
                        <p className="text-gray-600 mt-2">{blogPosts[4].excerpt}</p>
                    </div>
                </div>

                <div className="bento-card transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                    <img
                        src={blogPosts[5].image}
                        alt={blogPosts[5].title}
                        className="w-full h-48 object-cover rounded-t-xl transition-all duration-500 group-hover:brightness-110"
                    />
                    <div className="p-4">
                        <span className="text-sm text-indigo-600 font-semibold uppercase">{blogPosts[5].type}</span>
                        <h3 className="text-lg font-bold text-gray-800 mt-2 group-hover:text-indigo-600 transition-colors duration-300">
                            <Link to={`/directory/fashion-blog/${blogPosts[2].id}`}>
                                {blogPosts[5].title}
                            </Link>
                        </h3>
                        <p className="text-gray-600 mt-2">{blogPosts[5].excerpt}</p>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default FashionBlog;