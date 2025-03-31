import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    FaTachometerAlt, FaBox, FaPlus,
    FaFolder, FaShoppingBag, FaUser, FaBan, FaTicketAlt,
    FaNewspaper, FaStar, FaComment, FaCog, FaCreditCard, FaBoxOpen, FaKey, FaSignOutAlt,
    FaHistory,
    FaRobot, FaClipboardList
} from 'react-icons/fa';
import { TbCreditCardRefund } from "react-icons/tb";
import { IoArrowUndoOutline, IoChatbox, IoChatboxOutline } from "react-icons/io5";
import './Sidebar.css';

const SidebarAdmin = ({ isCollapsed, toggleSidebar, isMobile }) => {
    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    const [activeMenu, setActiveMenu] = useState(null);
    const location = useLocation();

    useEffect(() => {
        navItems.forEach((item, index) => {
            if (item.subItems) {
                const hasMatchingSubItem = item.subItems.some(
                    subItem => subItem.route && location.pathname === subItem.route
                );
                if (hasMatchingSubItem) {
                    setOpenMenuIndex(index);
                    setActiveMenu(index);
                }
            }
        });
    }, [location.pathname]);

    const handleMenuClick = (index, hasSubItems) => {
        if (hasSubItems) {
            setOpenMenuIndex(openMenuIndex === index ? null : index);
        }
        setActiveMenu(index);

        if (isMobile && !hasSubItems) {
            toggleSidebar();
        }
    };

    const renderMenuItem = (item, index, sectionOffset = 0) => {
        const menuIndex = index + sectionOffset;
        const isOpen = openMenuIndex === menuIndex;
        const isActive = activeMenu === menuIndex;
        const hasSubItems = item.subItems && item.subItems.length > 0;

        return (
            <div key={menuIndex} className="relative">
                {item.route ? (
                    <NavLink
                        to={item.route}
                        className={({ isActive: isNavActive }) =>
                            `flex items-start px-3 py-4 rounded-2xl cursor-pointer
                            transition-all duration-300 ease-in-out w-full
                            ${isNavActive ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`
                        }
                        onClick={() => handleMenuClick(menuIndex, hasSubItems)}
                    >
                        {renderMenuContent(item, isOpen, isActive)}
                    </NavLink>
                ) : (
                    <div
                        className={`flex items-start px-3 py-4 rounded-2xl cursor-pointer
                            transition-all duration-300 ease-in-out w-full
                            ${isActive ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
                        onClick={() => handleMenuClick(menuIndex, hasSubItems)}
                    >
                        {renderMenuContent(item, isOpen, isActive)}
                    </div>
                )}

                {!isCollapsed && hasSubItems && (
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out
                        ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className={`ml-9 mt-2 space-y-1 transition-all duration-300
                            ${isOpen ? 'translate-y-0' : '-translate-y-2'}`}>
                            {item.subItems.map((subItem, subIndex) => (
                                <NavLink
                                    key={subIndex}
                                    to={subItem.route || '#'}
                                    className={({ isActive: isSubActive }) =>
                                        `flex items-center px-1 py-3 rounded-lg cursor-pointer
                                        transition-all duration-200 
                                        ${isSubActive ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-blue-50 hover:text-blue-600'}
                                        ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`
                                    }
                                    style={{
                                        transitionDelay: `${subIndex * 50}ms`
                                    }}
                                >
                                    <span className="text-sm">{subItem.icon}</span>
                                    <span className="ml-3 text-sm">{subItem.title}</span>
                                </NavLink>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const renderMenuContent = (item, isOpen, isActive) => (
        <>
            <span className={`text-lg transition-all duration-300 shrink-0 mt-0.5
                ${isActive ? 'text-blue-600' : 'text-gray-600'}`}>
                {item.icon}
            </span>
            {!isCollapsed && (
                <div className="flex-1 min-w-0 relative">
                    <div className="flex items-start pr-6">
                        <span className="ml-3 text-sm font-medium break-words leading-5 flex-1">
                            {item.title}
                        </span>
                    </div>
                    {item.subItems && (
                        <span className={`absolute top-1 right-0 transform transition-transform duration-300
                            ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </span>
                    )}
                </div>
            )}
        </>
    );

    const navItems = [
        {
            title: 'Dashboard',
            icon: <FaTachometerAlt />,
            route: '/admin/dashboard',
        },
        {
            title: 'Quản lý sản phẩm',
            icon: <FaBox />,
            subItems: [
                { title: 'Danh sách sản phẩm', icon: <FaBox />, route: '/admin/products/list-product' },
                { title: 'Thêm sản phẩm mới', icon: <FaPlus />, route: '/admin/products/add-product' },
                { title: 'Đánh giá sản phẩm', icon: <FaStar />, route: '/admin/products/reviews' },
            ],
        },
        {
            title: 'Quản lý danh mục',
            icon: <FaFolder />,
            subItems: [
                { title: 'Danh sách danh mục', icon: <FaFolder />, route: '/admin/categories/list-category' },
                { title: 'Thêm danh mục mới', icon: <FaPlus />, route: '/admin/categories/add-category' },
            ],
        },
        {
            title: 'Quản lý đơn hàng',
            icon: <FaShoppingBag />,
            subItems: [
                { title: 'Danh sách đơn hàng', icon: <FaShoppingBag />, route: '/admin/orders/list-order' },
                { title: 'Lịch sử đơn hàng', icon: <FaHistory />, route: '/admin/orders/order-history' },
            ],
        },
        {
            title: 'Quản lý khách hàng',
            icon: <FaUser />,
            subItems: [
                { title: 'Danh sách khách hàng', icon: <FaUser />, route: '/admin/customer/list-customer' },
                { title: 'Phân quyền khách hàng', icon: <FaBan />, route: '/admin/customer/roles-customer' },
            ],
        },
        {
            title: 'Quản lý tin nhắn',
            icon: <IoChatbox />,
            subItems: [
                { title: 'Hộp thư khách hàng', icon: <IoChatboxOutline />, route: '/admin/messages/list-message' },
                { title: 'Hệ thống Chatbot', icon: <FaRobot />, route: '/admin/messages/chatbot' },
            ],
        },
        {
            title: 'Quản lý mã giảm giá',
            icon: <FaTicketAlt />,
            subItems: [
                { title: 'Danh sách mã giảm giá', icon: <FaTicketAlt />, route: '/admin/vouchers/list-voucher' },
                { title: 'Thêm mã giảm giá', icon: <FaPlus />, route: '/admin/vouchers/add-voucher' },
            ],
        },
        {
            title: 'Quản lý blog & tin tức',
            icon: <FaNewspaper />,
            subItems: [
                { title: 'Danh sách bài viết', icon: <FaNewspaper />, route: '/admin/blogs/list-blog' },
                { title: 'Thêm bài viết mới', icon: <FaPlus />, route: '/admin/blogs/add-blog' },
                { title: 'Bình luận bài viết', icon: <FaComment />, route: '/admin/blogs/comments' },
                { title: 'Danh mục bài viết', icon: <FaFolder />, route: '/admin/blogs/categories' },
            ],
        },
        {
            title: 'Quản lý phương thức thanh toán',
            icon: <FaCreditCard />,
            subItems: [
                { title: 'Tổng quan', icon: <FaTachometerAlt />, route: '/admin/payment/dashboard' },
                { title: 'Danh sách giao dịch', icon: <FaClipboardList />, route: '/admin/payment/transaction-list' },
                { title: 'Hoàn tiền', icon: <TbCreditCardRefund />, route: '/admin/payment/refund' },
                { title: 'Cấu hình phương thức thanh toán', icon: <FaCog />, route: '/admin/payment/config' },
                { title: 'Nhật kí hoạt động', icon: <FaHistory />, route: '/admin/payment/activity-log' },
            ],
        },
        {
            title: 'Quản lý vận chuyển',
            icon: <FaBoxOpen />,
            subItems: [
                { title: 'Danh sách vận chuyển', icon: <FaClipboardList />, route: '/admin/shipping/list-shipping' },
                { title: 'Quản lý shipper', icon: <FaUser />, route: '/admin/shipping/shipper-management' },
                { title: 'Cấu hình vận chuyển', icon: <FaCog />, route: '/admin/shipping/shipping-config' },
                { title: 'Lịch sử vận chuyển', icon: <FaHistory />, route: '/admin/shipping/shipping-history' },
            ],
        },
        {
            title: 'Tài khoản & Đăng xuất',
            icon: <FaKey />,
            subItems: [
                { title: 'Đổi mật khẩu', icon: <FaKey /> },
                { title: 'Đăng xuất', icon: <FaSignOutAlt /> },
            ],
        },
    ];

    return (
        <div className={`h-full bg-white text-gray-600 shadow-lg
            transition-all duration-300 ease-in-out
            ${isCollapsed ? 'w-0 overflow-hidden' : 'w-64'}`}>
            <div className={`h-16 flex items-center px-4 
                transition-all duration-300 ease-in-out`}>
                <div className='flex w-full justify-between items-center'>
                    <div className="ml-3 transition-all duration-300 ease-in-out transform origin-left">
                        <img
                            src="/images/Logo.png"
                            alt="Logo"
                            className="h-24 w-auto"
                        />
                    </div>
                    <button
                        onClick={toggleSidebar}
                        className="hover:bg-gray-100 rounded-full"
                    >
                        <IoArrowUndoOutline size={25} />
                    </button>
                </div>
            </div>

            <nav className="h-[calc(100%-3.5rem)] overflow-y-auto no-scrollbar p-4">
                <div className="space-y-8">
                    <div>
                        <div className="text-gray-400 text-xs font-semibold mb-4 px-3">
                            TRANG CHỦ
                        </div>
                        <div className="space-y-1">
                            {navItems.slice(0, 1).map((item, index) => renderMenuItem(item, index))}
                        </div>
                    </div>

                    <div>
                        <div className="text-gray-400 text-xs font-semibold mb-4 px-3">
                            QUẢN LÝ
                                    </div>
                        <div className="space-y-1">
                            {navItems.slice(1, 11).map((item, index) => renderMenuItem(item, index, 1))}
                            </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default SidebarAdmin;