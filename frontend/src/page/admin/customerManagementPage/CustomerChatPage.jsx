import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiSend, FiPaperclip, FiImage, FiUser } from 'react-icons/fi';
import LoadingSpinner from '../../../component/common/LoadingSpinner';

const CustomerChatPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [customer, setCustomer] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        // Giả lập API call
        setTimeout(() => {
            setCustomer({
                id: 1,
                name: "Nguyễn Văn A",
                email: "nguyenvana@example.com",
                status: "online"
            });
            setMessages([
                {
                    id: 1,
                    content: "Xin chào, tôi cần hỗ trợ về đơn hàng",
                    timestamp: "2024-03-14T10:00:00Z",
                    sender: "customer"
                },
                {
                    id: 2,
                    content: "Chào anh/chị, tôi có thể giúp gì được ạ?",
                    timestamp: "2024-03-14T10:01:00Z",
                    sender: "admin"
                },
                // Thêm tin nhắn khác...
            ]);
            setLoading(false);
        }, 1000);
    }, [id]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const formatTime = (dateString) => {
        return new Intl.DateTimeFormat('vi-VN', {
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(dateString));
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const message = {
            id: messages.length + 1,
            content: newMessage,
            timestamp: new Date().toISOString(),
            sender: 'admin'
        };

        setMessages([...messages, message]);
        setNewMessage('');
    };

    if (loading) return <LoadingSpinner />;
    if (!customer) return <div>Không tìm thấy thông tin khách hàng</div>;

    return (
        <div className="h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center">
                        <button
                            onClick={() => navigate(-1)}
                            className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <FiArrowLeft className="w-6 h-6" />
                        </button>
                        <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                <FiUser className="h-6 w-6 text-gray-500" />
                            </div>
                            <div className="ml-3">
                                <div className="font-medium">{customer.name}</div>
                                <div className="text-sm text-gray-500 flex items-center">
                                    <span className={`w-2 h-2 rounded-full mr-2 ${customer.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
                                        }`}></span>
                                    {customer.status === 'online' ? 'Đang hoạt động' : 'Không hoạt động'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4">
                <div className="max-w-3xl mx-auto space-y-4">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[70%] ${message.sender === 'admin'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-900'
                                } rounded-lg px-4 py-2`}>
                                <div className="text-sm">{message.content}</div>
                                <div className={`text-xs mt-1 ${message.sender === 'admin' ? 'text-blue-100' : 'text-gray-500'
                                    }`}>
                                    {formatTime(message.timestamp)}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Message Input */}
            <div className="bg-white border-t">
                <div className="max-w-3xl mx-auto p-4">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-4">
                        <button
                            type="button"
                            className="p-2 text-gray-500 hover:text-gray-700"
                        >
                            <FiPaperclip className="w-5 h-5" />
                        </button>
                        <button
                            type="button"
                            className="p-2 text-gray-500 hover:text-gray-700"
                        >
                            <FiImage className="w-5 h-5" />
                        </button>
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Nhập tin nhắn..."
                            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            disabled={!newMessage.trim()}
                        >
                            <FiSend className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CustomerChatPage;