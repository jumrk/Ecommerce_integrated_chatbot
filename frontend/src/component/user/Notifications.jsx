import React, { useState } from 'react';
import { FiPackage, FiPercent, FiInfo, FiTrash2 } from 'react-icons/fi';

const Notifications = () => {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'order',
            title: 'Đơn hàng đã được giao thành công',
            message: 'Đơn hàng #DH123 đã được giao thành công. Cảm ơn bạn đã mua sắm!',
            time: '2 giờ trước',
            isRead: false
        },
        {
            id: 2,
            type: 'promotion',
            title: 'Ưu đãi mới trong tháng',
            message: 'Giảm giá 20% cho tất cả các sản phẩm thời trang từ 01/04 - 15/04',
            time: '1 ngày trước',
            isRead: true
        },
        {
            id: 3,
            type: 'info',
            title: 'Cập nhật thông tin tài khoản',
            message: 'Vui lòng cập nhật thông tin địa chỉ để không bỏ lỡ các ưu đãi.',
            time: '2 ngày trước',
            isRead: false
        }
    ]);

    const getIcon = (type) => {
        switch (type) {
            case 'order':
                return <FiPackage className="w-6 h-6" />;
            case 'promotion':
                return <FiPercent className="w-6 h-6" />;
            case 'info':
                return <FiInfo className="w-6 h-6" />;
            default:
                return <FiInfo className="w-6 h-6" />;
        }
    };

    const getIconBackground = (type) => {
        switch (type) {
            case 'order':
                return 'bg-blue-100 text-blue-600';
            case 'promotion':
                return 'bg-green-100 text-green-600';
            case 'info':
                return 'bg-yellow-100 text-yellow-600';
            default:
                return 'bg-gray-100 text-gray-600';
        }
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
    };

    const deleteNotification = (id) => {
        setNotifications(notifications.filter(notif => notif.id !== id));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between pb-6 border-b">
                <h2 className="text-2xl font-bold text-gray-800">Thông báo</h2>
                <button
                    onClick={markAllAsRead}
                    className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                >
                    Đánh dấu tất cả đã đọc
                </button>
            </div>

            <div className="space-y-4">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className={`flex items-start gap-4 p-4 rounded-xl transition-all ${notification.isRead ? 'bg-white' : 'bg-blue-50'
                            }`}
                    >
                        <div className={`p-3 rounded-full ${getIconBackground(notification.type)}`}>
                            {getIcon(notification.type)}
                        </div>

                        <div className="flex-1">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h3 className="font-medium text-gray-800">{notification.title}</h3>
                                    <p className="text-gray-600 mt-1">{notification.message}</p>
                                    <span className="text-sm text-gray-500 mt-2 block">
                                        {notification.time}
                                    </span>
                                </div>
                                <button
                                    onClick={() => deleteNotification(notification.id)}
                                    className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-100"
                                >
                                    <FiTrash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {notifications.length === 0 && (
                <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <FiBell className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-gray-500">Không có thông báo nào</h3>
                </div>
            )}
        </div>
    );
};

export default Notifications;