import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiFilter, FiUser } from 'react-icons/fi';
import Loading from '../../../component/loading/loading';
import { getAllMailboxes } from '../../../api/message/messageService';
import { Helmet } from 'react-helmet';

const MessageListPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState([]);
    const [filterOpen, setFilterOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [sortOrder, setSortOrder] = useState('newest');

    useEffect(() => {
        fetchMailboxes();
    }, []);

    const fetchMailboxes = async () => {
        try {
            setLoading(true);
            const response = await getAllMailboxes();
            const formattedMessages = response.data.map(mailbox => ({
                id: mailbox._id,
                customerId: mailbox.userId,
                customerName: mailbox.userInfo.fullName || 'Người dùng',
                customerAvatar: mailbox.userInfo.avatar,
                lastMessage: mailbox.lastMessage.content,
                unreadCount: mailbox.unreadCount,
                lastMessageTime: mailbox.lastMessage.createdAt,
                status: mailbox.unreadCount > 0 ? 'unread' : 'read',
                isOnline: false // You might want to implement real-time online status
            }));
            setMessages(formattedMessages);
        } catch (error) {
            console.error('Error fetching mailboxes:', error);
        } finally {
            setLoading(false);
        }
    };

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

    const filteredMessages = useMemo(() => {
        let result = [...messages];

        // Lọc theo trạng thái
        if (statusFilter) {
            result = result.filter(message => message.status === statusFilter);
        }

        // Tìm kiếm theo tên khách hàng hoặc nội dung tin nhắn cuối cùng
        if (searchTerm) {
            const lowerSearchTerm = searchTerm.toLowerCase();
            result = result.filter(message =>
                message.customerName.toLowerCase().includes(lowerSearchTerm) ||
                message.lastMessage.toLowerCase().includes(lowerSearchTerm)
            );
        }

        // Sắp xếp
        if (sortOrder === 'newest') {
            result.sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));
        } else {
            result.sort((a, b) => new Date(a.lastMessageTime) - new Date(b.lastMessageTime));
        }

        return result;
    }, [messages, statusFilter, searchTerm, sortOrder]);

    if (loading) return <Loading />;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <Helmet>
                <title>Hộp thư khách hàng</title>
            </Helmet>
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
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
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
                                <select
                                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <option value="">Tất cả</option>
                                    <option value="unread">Chưa đọc</option>
                                    <option value="read">Đã đọc</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Sắp xếp theo
                                </label>
                                <select
                                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                >
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
                        {filteredMessages.map((message) => (
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
                                                    src={import.meta.env.VITE_API_URL + message.customerAvatar}
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
