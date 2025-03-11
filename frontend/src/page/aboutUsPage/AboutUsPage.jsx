import React from 'react';
import { FaInstagram, FaFacebook, FaArrowLeft, FaTwitter, FaMapMarkerAlt, FaEnvelope, FaPhone, FaShare } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const AboutUsPage = () => {
    const navigate = useNavigate();

    const teamMembers = [
        {
            name: 'Nguyễn Minh Anh',
            role: 'CEO & Nhà Thiết Kế',
            image: 'https://i.pravatar.cc/150?img=1',
            bio: 'Minh Anh là người sáng lập, dẫn dắt thương hiệu thời trang với hơn 10 năm kinh nghiệm trong ngành.',
        },
        {
            name: 'Trần Thị Hồng',
            role: 'Giám đốc Marketing',
            image: 'https://i.pravatar.cc/150?img=2',
            bio: 'Hồng phụ trách chiến lược marketing, mang đến những chiến dịch sáng tạo và hiệu quả.',
        },
        {
            name: 'Lê Văn Nam',
            role: 'Chuyên gia Phong Cách',
            image: 'https://i.pravatar.cc/150?img=3',
            bio: 'Nam chuyên tư vấn phong cách, giúp khách hàng tìm thấy outfit hoàn hảo.',
        },
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

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-gray-800 mb-4 drop-shadow-md">VỀ CHÚNG TÔI</h1>
                    <p className="text-xl text-gray-600">Khám phá câu chuyện, sứ mệnh và đội ngũ của JUMRK</p>
                </div>

                {/* Câu chuyện thương hiệu */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Câu Chuyện Của Chúng Tôi</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                            <p className="text-gray-700 leading-relaxed">
                                JUMRK ra đời với sứ mệnh mang đến nguồn cảm hứng thời trang cho mọi người. Chúng tôi bắt đầu từ một nhóm nhỏ đam mê thời trang tại Đà Nẵng, với mong muốn tạo ra một không gian để chia sẻ xu hướng, mẹo phối đồ, và phong cách cá nhân. Hành trình 5 năm qua, chúng tôi đã phát triển thành một cộng đồng lớn, kết nối hàng ngàn người yêu thời trang trên cả nước.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                            <p className="text-gray-700 leading-relaxed">
                                Chúng tôi cam kết cung cấp nội dung chất lượng cao, từ các bài review sản phẩm, lookbook độc đáo, đến các xu hướng mới nhất. Mỗi bài viết là một câu chuyện, một cảm hứng, và một hành trình thời trang mà chúng tôi muốn bạn đồng hành cùng.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Sứ mệnh và Giá trị */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Sứ Mệnh & Giá Trị</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Sứ Mệnh</h3>
                            <p className="text-gray-700">Trở thành nguồn cảm hứng thời trang hàng đầu, giúp mọi người thể hiện phong cách cá nhân và sống theo cách của riêng mình.</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Giá Trị</h3>
                            <p className="text-gray-700">Sáng tạo, bền vững, và kết nối – đó là những giá trị cốt lõi mà chúng tôi hướng đến trong mọi hoạt động.</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Tầm Nhìn</h3>
                            <p className="text-gray-700">Trở thành thương hiệu thời trang số 1 tại Việt Nam, lan tỏa phong cách toàn cầu vào năm 2030.</p>
                        </div>
                    </div>
                </section>

                {/* Đội ngũ */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Đội Ngũ Của Chúng Tôi</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
                            >
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-48 object-cover rounded-xl mb-4 transition-all duration-500 hover:brightness-110"
                                />
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                                <p className="text-gray-600 mb-2">{member.role}</p>
                                <p className="text-gray-700">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Thông tin liên hệ */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Liên Hệ Với Chúng Tôi</h2>
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <p className="text-gray-700 mb-4 flex items-center">
                                    <FaMapMarkerAlt className="mr-2 text-indigo-600" size={20} /> 123 Đường Lớn, Quận 1, TP.HCM, Việt Nam
                                </p>
                                <p className="text-gray-700 mb-4 flex items-center">
                                    <FaEnvelope className="mr-2 text-indigo-600" size={20} /> contact@fashionblog.com
                                </p>
                                <p className="text-gray-700 mb-4 flex items-center">
                                    <FaPhone className="mr-2 text-indigo-600" size={20} /> +84 123 456 789
                                </p>
                            </div>
                            <div className="flex items-center justify-center md:justify-end space-x-6">
                                <a href="#" className="text-gray-700 hover:text-indigo-600 transition-colors duration-300">
                                    <FaFacebook size={24} />
                                </a>
                                <a href="#" className="text-gray-700 hover:text-indigo-600 transition-colors duration-300">
                                    <FaTwitter size={24} />
                                </a>
                                <a href="#" className="text-gray-700 hover:text-indigo-600 transition-colors duration-300">
                                    <FaInstagram size={24} />
                                </a>
                                <button
                                    onClick={handleShare}
                                    className="text-gray-700 hover:text-indigo-600 transition-colors duration-300 flex items-center"
                                >
                                    <FaShare size={24} /> <span className="ml-2 hidden md:inline">Chia sẻ</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Nút quay lại */}
                <button
                    onClick={() => navigate('/')}
                    className="mt-8 flex items-center text-indigo-600 font-semibold hover:text-indigo-800 transition-colors duration-300"
                >
                    <FaArrowLeft className="mr-2" size={16} /> Quay lại trang chủ
                </button>
            </div>
        </div>
    );
};

export default AboutUsPage;