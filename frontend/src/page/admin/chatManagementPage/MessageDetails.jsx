import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiSend, FiPaperclip, FiImage, FiUser } from 'react-icons/fi';
import Loading from '../../../component/loading/loading';
import { getMessagesByUserId, replyToUser } from '../../../api/message/messageService';
import { Helmet } from 'react-helmet';

const MessageDetails = () => {
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
        fetchMessages();
    }, [id]);

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const response = await getMessagesByUserId(id);
            setCustomer({
                id: response.data.userId,
                name: response.data.userInfo.fullName,
                email: response.data.userInfo.email,
                status: 'offline' // Implement real-time status if needed
            });
            setMessages(response.data.messages.map(msg => ({
                id: msg._id,
                content: msg.content,
                timestamp: msg.createdAt,
                sender: msg.sender // 'customer' or 'support'
            })));
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const formatTime = (dateString) => {
        return new Intl.DateTimeFormat('vi-VN', {
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(dateString));
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        try {
            const response = await replyToUser(id, newMessage);
            const newMsg = {
                id: response.data._id,
                content: response.data.content,
                timestamp: response.data.createdAt,
                sender: 'support'
            };
            setMessages(prev => [...prev, newMsg]);
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    if (loading) return <Loading />;
    if (!customer) return <div>Không tìm thấy thông tin khách hàng</div>;

    return (
        <div className="h-screen bg-gray-50 flex flex-col">
            <Helmet>
                <title>Chi tiết hộp thư</title>
            </Helmet>
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
                            className={`flex ${message.sender === 'support' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[70%] ${message.sender === 'support'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-900'
                                } rounded-lg px-4 py-2`}>
                                <div className="text-sm">{message.content}</div>
                                <div className={`text-xs mt-1 ${message.sender === 'support' ? 'text-blue-100' : 'text-gray-500'
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

export default MessageDetails;