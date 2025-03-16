import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiFilter, FiUser, FiClock, FiMessageCircle } from 'react-icons/fi';
import LoadingSpinner from '../../../component/common/LoadingSpinner';

const MessageListPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState([]);
    const [filterOpen, setFilterOpen] = useState(false);

    useEffect(() => {
        // Giả lập API call
        setTimeout(() => {
            setMessages([
                {
                    id: 1,
                    customerId: 101,
                    customerName: "Nguyễn Văn A",
                    customerAvatar: null,
                    lastMessage: "Xin chào, tôi cần hỗ trợ về đơn hàng DH001",
                    unreadCount: 3,
                    lastMessageTime: "2024-03-21T10:30:00Z",
                    status: "unread",
                    isOnline: true
                },
                {
                    id: 2,
                    customerId: 102,
                    customerName: "Trần Thị B",
                    customerAvatar: null,
                    lastMessage: "Cảm ơn bạn đã hỗ trợ",
                    unreadCount: 0,
                    lastMessageTime: "2024-03-21T09:15:00Z",
                    status: "read",
                    isOnline: false
                },
                // Thêm dữ liệu mẫu khác...
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now - date;

        // Nếu trong vòng 24h
        if (diff < 24 * 60 * 60 * 1000) {
            return new Intl.DateTimeFormat('vi-VN', {
                hour: '2-digit',
                minute: '2-digit'
            }).format(date);
        }

        // Nếu trong tuần này
        if (diff < 7 * 24 * 60 * 60 * 1000) {
            return new Intl.DateTimeFormat('vi-VN', {
                weekday: 'short'
            }).format(date);
        }

        // Các trường hợp khác
        return new Intl.DateTimeFormat('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).format(date);
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Hộp thư khách hàng</h1>
                </div>

                {/* Search and Filter */}
                <div className="bg-white rounded-lg shadow p-4 mb-6">
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Tìm kiếm tin nhắn..."
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                        <button
                            onClick={() => setFilterOpen(!filterOpen)}
                            className="p-2 border rounded-lg hover:bg-gray-50"
                        >
                            <FiFilter className="text-gray-600" />
                        </button>
                    </div>

                    {filterOpen && (
                        <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Trạng thái
                                </label>
                                <select className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Tất cả</option>
                                    <option value="unread">Chưa đọc</option>
                                    <option value="read">Đã đọc</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Sắp xếp theo
                                </label>
                                <select className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="newest">Mới nhất</option>
                                    <option value="oldest">Cũ nhất</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>

                {/* Messages List */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="divide-y divide-gray-200">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`p-4 hover:bg-gray-50 cursor-pointer ${message.status === 'unread' ? 'bg-blue-50' : ''
                                    }`}
                                onClick={() => navigate(`/admin/messages/chat/${message.customerId}`)}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                                            {message.customerAvatar ? (
                                                <img
                                                    src={message.customerAvatar}
                                                    alt={message.customerName}
                                                    className="h-12 w-12 rounded-full object-cover"
                                                />
                                            ) : (
                                                <FiUser className="h-6 w-6 text-gray-500" />
                                            )}
                                        </div>
                                        {message.isOnline && (
                                            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-medium text-gray-900">
                                                {message.customerName}
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-gray-500">
                                                    {formatTime(message.lastMessageTime)}
                                                </span>
                                                {message.unreadCount > 0 && (
                                                    <span className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                                        {message.unreadCount}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-500 truncate">
                                            {message.lastMessage}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageListPage;