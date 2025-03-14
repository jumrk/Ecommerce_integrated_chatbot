import React, { useState } from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaInstagram, FaFacebook, FaTwitter, FaShare, FaArrowLeft, FaCheck, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { SlideGridWhenVisible } from '../../../component/animation/SlideGridWhenVisible';
import { ScaleUpWhenVisible } from '../../../component/animation/ScaleUpWhenVisible';
import { FlipInWhenVisible } from '../../../component/animation/FlipInWhenVisible';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
            setError('Vui lòng điền đầy đủ thông tin.');
            return;
        }

        setIsSubmitting(true);
        setError('');

        setTimeout(() => {
            console.log('Thông tin liên hệ đã được gửi:', formData);
            setSuccess(true);
            setFormData({
                name: '',
                email: '',
                message: '',
            });

            // Reset sau 3 giây
            setTimeout(() => {
                setSuccess(false);
                setIsSubmitting(false);
            }, 3000);
        }, 1000);
    };

    // Xử lý chia sẻ
    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Liên Hệ - JUMRK',
                text: 'Hãy liên hệ với JUMRK để nhận tư vấn thời trang!',
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
                <FlipInWhenVisible>
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold text-gray-800 mb-4 drop-shadow-md">LIÊN HỆ VỚI CHÚNG TÔI</h1>
                        <p className="text-xl text-gray-600">Hãy gửi tin nhắn để nhận tư vấn hoặc hợp tác cùng JUMRK</p>
                    </div>
                </FlipInWhenVisible>

                {/* Layout grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Form liên hệ */}
                    <SlideGridWhenVisible direction="left">
                        <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                            <FlipInWhenVisible>
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Gửi tin nhắn</h2>
                            </FlipInWhenVisible>

                            {success && (
                                <ScaleUpWhenVisible>
                                    <div className="mb-4 text-green-500 text-sm flex items-center">
                                        <FaCheck className="mr-2" /> Tin nhắn của bạn đã được gửi thành công!
                                    </div>
                                </ScaleUpWhenVisible>
                            )}

                            {error && (
                                <ScaleUpWhenVisible>
                                    <div className="mb-4 text-red-500 text-sm flex items-center">
                                        <FaTimes className="mr-2" /> {error}
                                    </div>
                                </ScaleUpWhenVisible>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <SlideGridWhenVisible direction="right">
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Họ và tên</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                                            placeholder="Nhập họ và tên..."
                                        />
                                    </div>
                                </SlideGridWhenVisible>

                                <SlideGridWhenVisible direction="left">
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                                            placeholder="Nhập email của bạn..."
                                        />
                                    </div>
                                </SlideGridWhenVisible>

                                <SlideGridWhenVisible direction="right">
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Tin nhắn</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 h-32 resize-none"
                                            placeholder="Viết tin nhắn của bạn..."
                                        />
                                    </div>
                                </SlideGridWhenVisible>

                                <ScaleUpWhenVisible>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full py-3 rounded-md font-semibold transition-all duration-300 flex items-center justify-center ${isSubmitting
                                            ? 'bg-gray-400 text-white cursor-not-allowed'
                                            : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg'
                                            }`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <FaCheck className="mr-2 animate-spin" size={16} /> Đang gửi...
                                            </>
                                        ) : (
                                            'Gửi tin nhắn'
                                        )}
                                    </button>
                                </ScaleUpWhenVisible>
                            </form>
                        </div>
                    </SlideGridWhenVisible>

                    {/* Thông tin liên lạc và bản đồ */}
                    <div className="space-y-8">
                        {/* Thông tin liên lạc */}
                        <SlideGridWhenVisible direction="right">
                            <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                                <FlipInWhenVisible>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Thông tin liên hệ</h2>
                                </FlipInWhenVisible>

                                <SlideGridWhenVisible direction="left">
                                    <div className="space-y-4">
                                        <p className="text-gray-700 flex items-center">
                                            <FaMapMarkerAlt className="mr-2 text-indigo-600" size={20} /> 123 Đường Lớn, Quận 1, TP.HCM, Việt Nam
                                        </p>
                                        <p className="text-gray-700 flex items-center">
                                            <FaEnvelope className="mr-2 text-indigo-600" size={20} /> contact@fashionblog.com
                                        </p>
                                        <p className="text-gray-700 flex items-center">
                                            <FaPhone className="mr-2 text-indigo-600" size={20} /> +84 123 456 789
                                        </p>
                                    </div>
                                </SlideGridWhenVisible>

                                <ScaleUpWhenVisible>
                                    <div className="mt-6 flex justify-center space-x-6">
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
                                </ScaleUpWhenVisible>
                            </div>
                        </SlideGridWhenVisible>

                        {/* Bản đồ */}
                        <SlideGridWhenVisible direction="up">
                            <div className="bg-white rounded-xl shadow-lg p-4 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.174398784321!2d108.1479789!3d16.0639885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142192f3155799f%3A0x76b42052e733d464!2s109+%C4%90.+Ph%E1%BA%A1m+Nh%C6%B0+X%C6%B0%C6%A1ng%2C+Ho%C3%A0+Kh%C3%A1nh+Nam%2C+Li%C3%AAn+Chi%E1%BB%83u%2C+%C4%90%C3%A0+N%E1%BA%B5ng+550000%2C+Vi%E1%BB%87t+Nam!5e0!3m2!1sen!2sus!4v1677654321"
                                    width="100%"
                                    height="300"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    className="rounded-xl"
                                ></iframe>
                            </div>
                        </SlideGridWhenVisible>
                    </div>
                </div>

                {/* Nút quay lại */}
                <SlideGridWhenVisible direction="up">
                    <button
                        onClick={() => navigate('/')}
                        className="mt-12 flex items-center text-indigo-600 font-semibold hover:text-indigo-800 transition-colors duration-300"
                    >
                        <FaArrowLeft className="mr-2" size={16} /> Quay lại trang chủ
                    </button>
                </SlideGridWhenVisible>
            </div>
        </div>
    );
};

export default ContactPage;