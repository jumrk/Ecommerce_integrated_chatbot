import React, { useState, useEffect, useRef } from 'react';
import { FiX, FiSend, FiBox, FiSearch, FiGift, FiRefreshCw, FiImage, FiSmile, FiPaperclip, FiMic } from 'react-icons/fi';
import './Chatbot.css';
const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatContentRef = useRef(null);

    const menuOptions = [
        {
            id: 1,
            icon: <FiBox className="text-blue-500" />,
            title: 'Gợi ý sản phẩm',
            subOptions: [
                { text: 'Gợi ý sản phẩm cho mùa đông', icon: '❄️' },
                { text: 'Gợi ý sản phẩm cho mùa hè', icon: '☀️' }
            ]
        },
        {
            id: 2,
            icon: <FiSearch className="text-purple-500" />,
            title: 'Tìm sản phẩm',
            subOptions: [
                { text: 'Những sản phẩm bán nhiều nhất', icon: '🔥' },
                { text: 'Những sản phẩm đánh giá tốt nhất', icon: '⭐' }
            ]
        }
    ];

    useEffect(() => {
        if (chatContentRef.current) {
            chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
        }
    }, [isTyping]);

    const handleOptionClick = (text) => {
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            // Xử lý phản hồi tại đây
        }, 1500);
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {/* Chat Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce"
                >
                    <img
                        src="/images/Chatbot.png"
                        alt="Chatbot"
                        className="w-8 h-8 sm:w-10 sm:h-10"
                    />
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="bg-white rounded-3xl shadow-2xl w-[95vw] sm:w-[400px] max-w-[400px] overflow-hidden animate-slideUp absolute bottom-0 right-0">
                    {/* Header */}
                    <div className="p-3 sm:p-4 bg-gradient-to-r from-blue-500 to-cyan-500">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="relative">
                                    <img
                                        src="/images/Chatbot.png"
                                        alt="Chatbot"
                                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white"
                                    />
                                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-400 rounded-full border-2 border-white"></div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-sm sm:text-base">AI Assistant</h3>
                                    <p className="text-cyan-100 text-xs sm:text-sm">Online - Luôn sẵn sàng hỗ trợ</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1.5 sm:p-2 hover:bg-white/10 rounded-full transition-all text-white"
                            >
                                <FiX className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Chat Content */}
                    <div
                        ref={chatContentRef}
                        className="p-3 sm:p-4 bg-gray-50 h-[60vh] sm:h-[500px] overflow-y-auto custom-scrollbar"
                    >
                        {/* Welcome Message */}
                        <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-6">
                            <img
                                src="/images/Chatbot.png"
                                alt="Chatbot"
                                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                            />
                            <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm max-w-[80%] relative chat-bubble">
                                <p className="text-gray-700 font-medium text-sm sm:text-base">Xin chào! 👋</p>
                                <p className="text-gray-600 mt-1 text-sm">Mình có thể giúp gì cho bạn?</p>
                            </div>
                        </div>

                        {/* Menu Options */}
                        <div className="space-y-3 sm:space-y-4">
                            {menuOptions.map(option => (
                                <div key={option.id} className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-all">
                                    <div className="flex items-center gap-2 sm:gap-3 mb-2 pb-2 sm:mb-3 sm:pb-3 border-b">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-50 flex items-center justify-center">
                                            {option.icon}
                                        </div>
                                        <span className="font-medium text-gray-800 text-sm sm:text-base">{option.title}</span>
                                    </div>
                                    <div className="space-y-2">
                                        {option.subOptions.map((subOption, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleOptionClick(subOption.text)}
                                                className="w-full p-2.5 sm:p-3 bg-gray-50 rounded-xl text-gray-700 hover:bg-gray-100 transition-all text-left flex items-center gap-2 text-sm sm:text-base"
                                            >
                                                <span>{subOption.icon}</span>
                                                {subOption.text}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Typing Indicator */}
                        {isTyping && (
                            <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4">
                                <img
                                    src="/images/Chatbot.png"
                                    alt="Chatbot"
                                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                                />
                                <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-3 sm:p-4 bg-white border-t">
                        <div className="flex items-center gap-2">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Nhập tin nhắn..."
                                    className="w-full px-3 sm:px-4 py-2 bg-gray-100 rounded-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 sm:pr-12"
                                />
                                <div className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2">
                                    <button className="p-1.5 sm:p-2 text-blue-500 hover:text-blue-600">
                                        <FiSend className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;