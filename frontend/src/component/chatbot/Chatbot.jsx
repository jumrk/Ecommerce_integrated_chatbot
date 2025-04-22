import React, { useState, useEffect, useRef } from 'react';
import { FiX, FiSend, FiBox, FiSearch } from 'react-icons/fi';
import './Chatbot.css';
import { sendMessage } from '../../api/chatbot/chatService';
import { useNavigate } from 'react-router-dom';
const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [showMenuOptions, setShowMenuOptions] = useState(true);
    const chatContentRef = useRef(null);
    const navigate = useNavigate();
    const menuOptions = [
        {
            id: 1,
            icon: <FiBox className="text-indigo-500" />,
            title: 'Gợi ý sản phẩm',
            subOptions: [
                { text: 'Gợi ý sản phẩm cho mùa đông', icon: '❄️' },
                { text: 'Gợi ý sản phẩm cho mùa hè', icon: '☀️' },
            ],
        },
        {
            id: 2,
            icon: <FiSearch className="text-purple-500" />,
            title: 'Tìm bài viết',
            subOptions: [
                { text: 'Những bài viết xu hướng', icon: '🔥' },
                { text: 'Bài viết về mẹo phối đồ', icon: '⭐' },
            ],
        },
    ];

    useEffect(() => {
        if (chatContentRef.current) {
            chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleMessage = async (messageText) => {
        if (messageText.trim() === '') return;

        // Thêm tin nhắn người dùng
        const userMessage = {
            id: Date.now(),
            sender: 'user',
            text: messageText
        };
        setMessages(prev => [...prev, userMessage]);
        setIsTyping(true);
        setShowMenuOptions(false);

        try {
            const response = await sendMessage({ message: messageText });

            if (response.success) {
                // Xử lý sản phẩm
                if (response.products && response.products.length > 0) {
                    // Thêm tin nhắn summary trước khi hiển thị sản phẩm
                    if (response.summary) {
                        const summaryMessage = {
                            id: Date.now() + 1,
                            sender: 'bot',
                            text: response.summary
                        };
                        setMessages(prev => [...prev, summaryMessage]);
                    }

                    const productMessages = response.products.map((product) => ({
                        id: Date.now() + Math.random(),
                        sender: 'bot',
                        type: 'product',
                        content: (
                            <div key={product.id} className="flex gap-3 mb-4 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                <img
                                    src={`http://localhost:5000${product.images}`}
                                    alt={product.name}
                                    className="w-16 h-16 object-cover rounded-lg"
                                />
                                <div className="flex flex-col">
                                    <span className="font-semibold text-gray-800">{product.name}</span>
                                    <span className="text-gray-600 text-sm">{product.price.toLocaleString()} VND</span>
                                    <button
                                        onClick={() => navigate(`/directory/product-detail/${product.id}`)}
                                        className="text-indigo-500 hover:underline mt-1 text-sm text-left"
                                    >
                                        Xem chi tiết
                                    </button>
                                </div>
                            </div>
                        )
                    }));
                    setMessages(prev => [...prev, ...productMessages]);
                }
                // Xử lý blog
                else if (response.blogs && response.blogs.length > 0) {
                    if (response.summary) {
                        const summaryMessage = {
                            id: Date.now() + 1,
                            sender: 'bot',
                            text: response.summary
                        };
                        setMessages(prev => [...prev, summaryMessage]);
                    }

                    const blogMessages = response.blogs.map((blog) => ({
                        id: Date.now() + Math.random(),
                        sender: 'bot',
                        type: 'blog',
                        content: (
                            <div key={blog.id} className="flex gap-3 mb-4 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                <img
                                    src={`http://localhost:5000${blog.images}`}
                                    alt={blog.title}
                                    className="w-16 h-16 object-cover rounded-lg"
                                />
                                <div className="flex flex-col">
                                    <span className="font-semibold text-gray-800">{blog.title}</span>
                                    <button
                                        onClick={() => navigate(`/directory/fashion-blog/${blog.id}`)}
                                        className="text-indigo-500 hover:underline mt-1 text-sm text-l_eft"
                                    >
                                        Xem chi tiết
                                    </button>
                                </div>
                            </div>
                        )
                    }));
                    setMessages(prev => [...prev, ...blogMessages]);
                }
                else if (response.greeting || response.thank || response.feedback || response.orther || response.supportMessage) {
                    const message = {
                        id: Date.now() + 2,
                        sender: 'bot',
                        text: response.greeting || response.thank || response.feedback || response.orther || response.supportMessage
                    }
                    setMessages(prev => [...prev, message]);
                }
            } else {
                const noResultMessage = {
                    id: Date.now() + 2,
                    sender: 'bot',
                    text: response.message
                };
                setMessages(prev => [...prev, noResultMessage]);
            }
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage = {
                id: Date.now() + 3,
                sender: 'bot',
                text: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.'
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    // Sử dụng hàm chung cho cả hai trường hợp
    const handleSendMessage = () => {
        handleMessage(message);
        setMessage('');
    };

    const handleOptionClick = (text) => {
        handleMessage(text);
    };

    return (
        <div className="fixed bottom-5 right-5 z-50">
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-gradient-to-r from-indigo-500 to-cyan-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all animate-pulse"
                >
                    <img src="/images/Chatbot.png" alt="Chatbot" className="w-8 h-8" />
                </button>
            )}

            {isOpen && (
                <div className="bg-white rounded-2xl shadow-xl w-[90vw] max-w-[420px] h-[80vh] max-h-[600px] flex flex-col overflow-hidden transition-all duration-300">
                    {/* Header */}
                    <div className="p-4 bg-gradient-to-r from-indigo-600 to-cyan-500 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <img
                                src="/images/Chatbot.png"
                                alt="Chatbot"
                                className="w-10 h-10 rounded-full border-2 border-white"
                            />
                            <div>
                                <h3 className="font-semibold text-white text-lg">AI Assistant</h3>
                                <p className="text-cyan-100 text-xs">Online - Sẵn sàng hỗ trợ</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:bg-white/20 p-1 rounded-full transition-colors"
                        >
                            <FiX className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Chat Content */}
                    <div
                        ref={chatContentRef}
                        className="flex-1 p-4 bg-gray-50 overflow-y-auto custom-scrollbar space-y-4"
                    >
                        <div className="flex gap-3">
                            <img src="/images/Chatbot.png" alt="Chatbot" className="w-8 h-8 rounded-full" />
                            <div className="bg-white rounded-xl p-3 shadow-sm max-w-[75%]">
                                <p className="text-gray-700 font-medium">Xin chào! 👋</p>
                                <p className="text-gray-600 text-sm">Mình có thể giúp gì cho bạn?</p>
                            </div>
                        </div>

                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                {msg.sender === 'bot' && (
                                    <img src="/images/Chatbot.png" alt="Bot" className="w-8 h-8 rounded-full" />
                                )}
                                <div
                                    className={`rounded-xl p-3 shadow-sm max-w-[75%] ${msg.sender === 'user'
                                        ? 'bg-indigo-100 text-indigo-900'
                                        : 'bg-white text-gray-800'
                                        }`}
                                >
                                    {msg.type === 'product' || msg.type === 'blog' ? msg.content : msg.text}
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex gap-3">
                                <img src="/images/Chatbot.png" alt="Chatbot" className="w-8 h-8 rounded-full" />
                                <div className="bg-white rounded-xl p-3 shadow-sm flex gap-1">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                                </div>
                            </div>
                        )}

                        {showMenuOptions && (
                            <div className="space-y-4">
                                {menuOptions.map((option) => (
                                    <div key={option.id} className="bg-white rounded-xl p-4 shadow-sm">
                                        <div className="flex items-center gap-3 mb-3 border-b pb-2">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                                {option.icon}
                                            </div>
                                            <span className="font-medium text-gray-800">{option.title}</span>
                                        </div>
                                        <div className="space-y-2">
                                            {option.subOptions.map((sub, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => handleOptionClick(sub.text)}
                                                    className="w-full p-2 bg-gray-50 rounded-lg text-gray-700 hover:bg-gray-100 text-left flex items-center gap-2 transition-colors"
                                                >
                                                    <span>{sub.icon}</span>
                                                    <span className="text-sm">{sub.text}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t flex items-center gap-2">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Nhập tin nhắn..."
                            className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <button
                            onClick={handleSendMessage}
                            className="text-indigo-500 hover:text-indigo-600 p-2 rounded-full hover:bg-indigo-50 transition-colors"
                        >
                            <FiSend className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;