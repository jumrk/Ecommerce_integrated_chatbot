import React, { useState, useEffect } from 'react';
import {
    FaMapMarkerAlt, FaEnvelope, FaPhone, FaInstagram, FaFacebook,
    FaTwitter, FaShare, FaArrowLeft, FaPaperPlane
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { SlideGridWhenVisible } from '../../../component/animation/SlideGridWhenVisible';
import { ScaleUpWhenVisible } from '../../../component/animation/ScaleUpWhenVisible';
import { FlipInWhenVisible } from '../../../component/animation/FlipInWhenVisible';
import { getUserMessages, sendMessage } from '../../../api/message/messageService';
import { getToken } from '../../../utils/storage';
import Loading from '../../../component/loading/loading';
import { Helmet } from 'react-helmet';
const ContactPage = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = getToken()
        setIsAuthenticated(!!token);
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchMessages();
        }
    }, [isAuthenticated]);

    const fetchMessages = async () => {
        try {
            const response = await getUserMessages();
            setMessages(response.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            navigate('/login', { state: { from: '/contact' } });
            return;
        }

        if (!newMessage.trim()) return;

        try {
            const response = await sendMessage(newMessage);
            setMessages(prev => [...prev, response.data]);
            setNewMessage('');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'JUMRK - Liên hệ với chúng tôi',
                    text: 'Trò chuyện trực tiếp với đội ngũ hỗ trợ của JUMRK',
                    url: window.location.href,
                });
            } else {
                await navigator.clipboard.writeText(window.location.href);
                alert('Đã sao chép liên kết vào clipboard!');
            }
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };
    if (loading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
            <Helmet>
                <title>Liên hệ</title>
            </Helmet>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <FlipInWhenVisible>
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold text-gray-800 mb-4 drop-shadow-md">LIÊN HỆ VỚI CHÚNG TÔI</h1>
                        <p className="text-xl text-gray-600">Trò chuyện trực tiếp với đội ngũ hỗ trợ của JUMRK</p>
                    </div>
                </FlipInWhenVisible>

                {/* Layout grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Khung chat */}
                    <SlideGridWhenVisible direction="left">
                        <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl h-[500px] flex flex-col">
                            <FlipInWhenVisible>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Chat với chúng tôi</h2>
                            </FlipInWhenVisible>

                            {/* Danh sách tin nhắn */}
                            <div className="flex-1 overflow-y-auto mb-4 p-2 border border-gray-200 rounded-md bg-gray-50">
                                {error ? (
                                    <div className="text-red-500 text-center">{error}</div>
                                ) : messages.length === 0 ? (
                                    <div className="text-gray-500 text-center">
                                        Bắt đầu cuộc trò chuyện với chúng tôi!
                                    </div>
                                ) : (
                                    messages.map((msg, index) => (
                                        <div
                                            key={msg._id || index}
                                            className={`mb-3 flex ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-xs p-3 rounded-lg shadow-sm ${msg.sender === 'customer'
                                                    ? 'bg-indigo-500 text-white'
                                                    : 'bg-gray-200 text-gray-800'
                                                    }`}
                                            >
                                                <p>{msg.content}</p>
                                                <span className={`text-xs block mt-1 ${msg.sender === 'customer' ? 'text-indigo-100' : 'text-gray-500'
                                                    }`}>
                                                    {new Date(msg.createdAt).toLocaleTimeString()}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Form gửi tin nhắn */}
                            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder={isAuthenticated ? "Nhập tin nhắn..." : "Đăng nhập để gửi tin nhắn"}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                                    disabled={!isAuthenticated}
                                />
                                <button
                                    type="submit"
                                    className={`p-2 rounded-full transition-colors duration-300 ${isAuthenticated
                                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                    disabled={!isAuthenticated || !newMessage.trim()}
                                >
                                    <FaPaperPlane size={16} />
                                </button>
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