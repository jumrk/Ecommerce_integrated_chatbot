import React from 'react';
import {
    FaInstagram, FaFacebook, FaArrowLeft, FaTwitter, FaMapMarkerAlt,
    FaEnvelope, FaPhone, FaShare, FaUsers, FaStore, FaStar, FaTshirt, FaHandshake, FaGlobe, FaLightbulb, FaAward, FaTrophy, FaHeart
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { SlideGridWhenVisible } from '../../../component/animation/SlideGridWhenVisible';
import { motion } from 'framer-motion';

const AboutUsPage = () => {
    const navigate = useNavigate();

    const teamMembers = [
        {
            name: 'Nguyễn Minh Anh',
            role: 'CEO & Nhà Thiết Kế',
            image: 'https://i.pravatar.cc/150?img=1',
            bio: 'Minh Anh là người sáng lập, dẫn dắt thương hiệu thời trang với hơn 10 năm kinh nghiệm trong ngành. Cô từng học tại Học viện Thời trang Paris và có kinh nghiệm làm việc tại các thương hiệu lớn như Chanel và Dior.',
            expertise: ['Thiết kế thời trang', 'Quản lý chiến lược', 'Phát triển thương hiệu'],
            achievements: ['Top 30 under 30 Forbes Vietnam', 'Giải thưởng Nhà thiết kế trẻ 2020']
        },
        {
            name: 'Trần Thị Hồng',
            role: 'Giám đốc Marketing',
            image: 'https://i.pravatar.cc/150?img=2',
            bio: 'Hồng có hơn 8 năm kinh nghiệm trong lĩnh vực digital marketing và xây dựng thương hiệu. Cô từng là Marketing Manager tại Lazada và Shopee Việt Nam.',
            expertise: ['Digital Marketing', 'Brand Strategy', 'Social Media Management'],
            achievements: ['Best Marketing Campaign 2022', 'Social Media Award 2021']
        },
        {
            name: 'Lê Văn Nam',
            role: 'Chuyên gia Phong Cách',
            image: 'https://i.pravatar.cc/150?img=3',
            bio: 'Nam là chuyên gia tư vấn phong cách với chứng chỉ từ Fashion Institute of Technology (FIT). Anh có 6 năm kinh nghiệm trong ngành thời trang cao cấp.',
            expertise: ['Personal Styling', 'Fashion Consulting', 'Trend Analysis'],
            achievements: ['Best Fashion Stylist 2023', 'Fashion Influencer of the Year']
        },
        {
            name: 'Phạm Thu Thảo',
            role: 'Giám đốc Sản phẩm',
            image: 'https://i.pravatar.cc/150?img=4',
            bio: 'Thảo chịu trách nhiệm phát triển sản phẩm và quản lý chuỗi cung ứng. 12 năm kinh nghiệm trong ngành dệt may và thời trang.',
            expertise: ['Product Development', 'Supply Chain', 'Quality Control'],
            achievements: ['Supply Chain Excellence Award', 'Best Product Innovation 2022']
        },
    ];

    const stats = [
        { label: 'Khách hàng', value: '50K+', icon: <FaUsers />, description: 'Khách hàng thân thiết trên toàn quốc' },
        { label: 'Chi nhánh', value: '20+', icon: <FaStore />, description: 'Cửa hàng tại các thành phố lớn' },
        { label: 'Đánh giá 5 sao', value: '10K+', icon: <FaStar />, description: 'Đánh giá tích cực từ khách hàng' },
        { label: 'Sản phẩm', value: '1000+', icon: <FaTshirt />, description: 'Mẫu thiết kế độc quyền' },
        { label: 'Đối tác', value: '50+', icon: <FaHandshake />, description: 'Đối tác chiến lược' },
        { label: 'Quốc gia', value: '5+', icon: <FaGlobe />, description: 'Thị trường xuất khẩu' }
    ];

    const timeline = [
        {
            year: '2018',
            title: 'Thành lập',
            description: 'JUMRK được thành lập tại Đà Nẵng với cửa hàng đầu tiên rộng 100m2',
            milestone: 'Đạt doanh thu 1 tỷ đồng trong 6 tháng đầu hoạt động'
        },
        {
            year: '2019',
            title: 'Mở rộng',
            description: 'Mở chi nhánh đầu tiên tại TP.HCM, ra mắt dòng sản phẩm cao cấp JUMRK Premium',
            milestone: 'Đạt 10,000 khách hàng thân thiết'
        },
        {
            year: '2020',
            title: 'Chuyển đổi số',
            description: 'Ra mắt nền tảng thương mại điện tử, phát triển ứng dụng di động JUMRK App',
            milestone: 'Tăng trưởng 200% doanh số online'
        },
        {
            year: '2021',
            title: 'Quốc tế hóa',
            description: 'Mở rộng thị trường sang Singapore và Malaysia, ra mắt BST hợp tác quốc tế',
            milestone: 'Xuất khẩu đạt 2 triệu USD'
        },
        {
            year: '2022',
            title: 'Đổi mới',
            description: 'Áp dụng công nghệ AR/VR vào trải nghiệm mua sắm, ra mắt dịch vụ tư vấn thời trang 1-1',
            milestone: 'Đạt giải thưởng Innovation in Fashion Retail'
        },
        {
            year: '2023',
            title: 'Phát triển bền vững',
            description: 'Triển khai chiến lược thời trang bền vững, ra mắt dòng sản phẩm eco-friendly',
            milestone: 'Được chứng nhận Sustainable Fashion Brand of the Year'
        }
    ];

    const values = [
        {
            title: 'Sáng tạo không ngừng',
            description: 'Luôn đổi mới và sáng tạo trong thiết kế, mang đến những xu hướng thời trang độc đáo.',
            icon: <FaLightbulb />
        },
        {
            title: 'Chất lượng xuất sắc',
            description: 'Cam kết sử dụng chất liệu cao cấp và quy trình sản xuất đạt chuẩn quốc tế.',
            icon: <FaAward />
        },
        {
            title: 'Trách nhiệm xã hội',
            description: 'Thực hiện các hoạt động bảo vệ môi trường và phát triển cộng đồng.',
            icon: <FaHeart />
        },
        {
            title: 'Khách hàng là trọng tâm',
            description: 'Luôn lắng nghe và đáp ứng nhu cầu của khách hàng một cách tốt nhất.',
            icon: <FaUsers />
        }
    ];

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Về Chúng Tôi - JUMRK',
                text: 'Khám phá câu chuyện và sứ mệnh của JUMRK!',
                url: window.location.href,
            }).catch((error) => console.error('Error sharing:', error));
        } else {
            alert('Sharing is not supported on this browser. Copy the URL: ' + window.location.href);
        }
    };

    const renderValues = () => (
        <section className="mb-20">
            <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Giá Trị Cốt Lõi</h2>
            <SlideGridWhenVisible
                direction="up"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                stagger={0.1}
            >
                {values.map((value, index) => (
                    <div key={index} className="bg-white rounded-2xl shadow-xl p-6 transform hover:-translate-y-2 transition-all duration-500">
                        <div className="text-4xl text-indigo-600 mb-4 flex justify-center">
                            {value.icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">{value.title}</h3>
                        <p className="text-gray-600 text-center">{value.description}</p>
                    </div>
                ))}
            </SlideGridWhenVisible>
        </section>
    );

    const renderAchievements = () => (
        <section className="mb-20 bg-indigo-50 py-16 rounded-3xl">
            <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Thành Tựu Nổi Bật</h2>
            <div className="max-w-4xl mx-auto px-4">
                <SlideGridWhenVisible
                    direction="right"
                    className="space-y-8"
                    stagger={0.2}
                >
                    <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:-translate-y-1 transition-all duration-300">
                        <h3 className="text-2xl font-bold text-indigo-600 mb-4">2023</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <FaTrophy className="text-yellow-500 mt-1 mr-3" />
                                <span>Top 10 Thương hiệu thời trang được yêu thích nhất</span>
                            </li>
                            <li className="flex items-start">
                                <FaTrophy className="text-yellow-500 mt-1 mr-3" />
                                <span>Giải thưởng Thương hiệu xanh vì môi trường</span>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:-translate-y-1 transition-all duration-300">
                        <h3 className="text-2xl font-bold text-indigo-600 mb-4">2022</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <FaTrophy className="text-yellow-500 mt-1 mr-3" />
                                <span>Best Fashion Retailer of the Year</span>
                            </li>
                            <li className="flex items-start">
                                <FaTrophy className="text-yellow-500 mt-1 mr-3" />
                                <span>Digital Transformation Award</span>
                            </li>
                        </ul>
                    </div>
                </SlideGridWhenVisible>
            </div>
        </section>
    );

    return (
        <div className="min-h-screen">
            {/* Hero Section với animation */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative h-[60vh] bg-cover bg-center"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")' }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50">
                    <div className="h-full flex items-center justify-center">
                        <div className="text-center text-white px-4">
                            <h1 className="text-6xl font-bold mb-4 animate-fade-in">VỀ CHÚNG TÔI</h1>
                            <p className="text-2xl max-w-2xl mx-auto animate-fade-in-up">Hành trình kiến tạo phong cách và định hình xu hướng thời trang Việt Nam</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Stats Section */}
                <SlideGridWhenVisible
                    direction="up"
                    className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-20"
                    stagger={0.1}
                >
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:scale-105 transition-all duration-300">
                            <div className="text-3xl text-indigo-600 mb-3 flex justify-center">{stat.icon}</div>
                            <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
                            <div className="text-sm text-gray-600">{stat.label}</div>
                            <div className="text-xs text-gray-500 mt-2">{stat.description}</div>
                        </div>
                    ))}
                </SlideGridWhenVisible>

                {/* Values Section */}
                {renderValues()}

                {/* Brand Story Section */}
                <section className="mb-20">
                    <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Câu Chuyện Của Chúng Tôi</h2>
                    <SlideGridWhenVisible
                        direction="left"
                        className="grid grid-cols-1 md:grid-cols-2 gap-12"
                        stagger={0.2}
                    >
                        <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:-translate-y-2 transition-all duration-500">
                            <p className="text-gray-700 leading-relaxed text-lg">
                                JUMRK ra đời với sứ mệnh mang đến nguồn cảm hứng thời trang cho mọi người...
                            </p>
                        </div>
                        <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:-translate-y-2 transition-all duration-500">
                            <p className="text-gray-700 leading-relaxed text-lg">
                                Chúng tôi cam kết cung cấp nội dung chất lượng cao...
                            </p>
                        </div>
                    </SlideGridWhenVisible>
                </section>

                {/* Timeline Section */}
                <section className="mb-20">
                    <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Hành Trình Phát Triển</h2>
                    <div className="relative">
                        <SlideGridWhenVisible
                            direction="up"
                            stagger={0.2}
                            className="space-y-8"
                        >
                            {timeline.map((item, index) => (
                                <div key={index} className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}>
                                    <div className="w-1/2 px-8">
                                        <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:-translate-y-2 transition-all duration-500">
                                            <h3 className="text-2xl font-bold text-indigo-600 mb-2">{item.year}</h3>
                                            <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                                            <p className="text-gray-700">{item.description}</p>
                                        </div>
                                    </div>
                                    <div className="w-8 h-8 absolute left-1/2 transform -translate-x-1/2 bg-indigo-600 rounded-full"></div>
                                </div>
                            ))}
                        </SlideGridWhenVisible>
                        <div className="absolute h-full w-1 bg-indigo-200 left-1/2 transform -translate-x-1/2 top-0"></div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="mb-20">
                    <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Đội Ngũ Của Chúng Tôi</h2>
                    <SlideGridWhenVisible
                        direction="up"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12"
                        stagger={0.15}
                    >
                        {teamMembers.map((member, index) => (
                            <div key={index} className="group">
                                <div className="relative overflow-hidden rounded-2xl shadow-xl transform hover:-translate-y-2 transition-all duration-500">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-64 object-cover transform group-hover:scale-110 transition-all duration-500"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent text-white">
                                        <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                                        <p className="text-lg font-medium mb-2">{member.role}</p>
                                        <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">{member.bio}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </SlideGridWhenVisible>
                </section>

                {/* Achievements Section */}
                {renderAchievements()}

                {/* Contact Section */}
                <section className="mb-16">
                    <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Liên Hệ Với Chúng Tôi</h2>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-2xl shadow-xl p-8"
                    >
                        <SlideGridWhenVisible
                            direction="up"
                            className="grid grid-cols-1 md:grid-cols-2 gap-12"
                            stagger={0.2}
                        >
                            <div className="space-y-6">
                                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300">
                                    <FaMapMarkerAlt className="text-indigo-600" size={24} />
                                    <p className="text-gray-700">123 Đường Lớn, Quận 1, TP.HCM, Việt Nam</p>
                                </div>
                                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300">
                                    <FaEnvelope className="text-indigo-600" size={24} />
                                    <p className="text-gray-700">contact@fashionblog.com</p>
                                </div>
                                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300">
                                    <FaPhone className="text-indigo-600" size={24} />
                                    <p className="text-gray-700">+84 123 456 789</p>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center">
                                <div className="flex justify-center space-x-8">
                                    <a href="#" className="p-4 bg-gray-50 rounded-full hover:bg-indigo-100 transition-colors duration-300">
                                        <FaFacebook size={30} className="text-indigo-600" />
                                    </a>
                                    <a href="#" className="p-4 bg-gray-50 rounded-full hover:bg-indigo-100 transition-colors duration-300">
                                        <FaTwitter size={30} className="text-indigo-600" />
                                    </a>
                                    <a href="#" className="p-4 bg-gray-50 rounded-full hover:bg-indigo-100 transition-colors duration-300">
                                        <FaInstagram size={30} className="text-indigo-600" />
                                    </a>
                                </div>
                                <button
                                    onClick={handleShare}
                                    className="mt-8 flex items-center justify-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors duration-300"
                                >
                                    <FaShare size={20} />
                                    <span>Chia sẻ trang này</span>
                                </button>
                            </div>
                        </SlideGridWhenVisible>
                    </motion.div>
                </section>

                {/* Back Button */}
                <motion.button
                    whileHover={{ x: -10 }}
                    onClick={() => navigate('/')}
                    className="group flex items-center space-x-2 text-indigo-600 font-semibold hover:text-indigo-800 transition-colors duration-300"
                >
                    <FaArrowLeft />
                    <span>Quay lại trang chủ</span>
                </motion.button>
            </div>
        </div>
    );
};

export default AboutUsPage;