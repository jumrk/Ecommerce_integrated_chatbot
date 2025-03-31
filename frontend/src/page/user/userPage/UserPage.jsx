import React, { useState } from 'react';
import { Outlet, NavLink, useLocation, Navigate, Link } from 'react-router-dom';
import { FiUser, FiShoppingBag, FiMapPin, FiLogOut, FiSettings, FiBell, FiHeart, FiMenu, FiX } from 'react-icons/fi';
import { SlideInWhenVisible } from '../../../component/animation/SlideInWhenVisible';
const UserPage = () => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Redirect to /user/info if accessing /user directly
    if (location.pathname === '/user') {
        return <Navigate to="/user/info" replace />;
    }

    const NavItem = ({ to, icon: Icon, children, count, countColor = "bg-gray-100 text-gray-600" }) => (
        <NavLink
            to={to}
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 rounded-xl transition-all ${isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`
            }
        >
            <div className="flex items-center gap-3">
                <Icon className="w-5 h-5" />
                <span className="font-medium">{children}</span>
            </div>
            {count && (
                <span className={`text-xs px-2 py-1 rounded-full ${countColor}`}>
                    {count}
                </span>
            )}
        </NavLink>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 h-48 relative">
                <div className="max-w-7xl mx-auto px-4 h-full">
                    {/* Mobile Menu Button */}
                    <div className="absolute top-4 right-4 lg:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 bg-white/10 rounded-lg text-white"
                        >
                            <FiMenu className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="flex items-end h-full pb-5">
                        <div className="flex items-end gap-6">
                            <div className="relative">
                                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white overflow-hidden bg-white">
                                    <img
                                        src="https://via.placeholder.com/150"
                                        alt="User avatar"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <button className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-50">
                                    <FiSettings className="w-4 h-4 text-gray-600" />
                                </button>
                            </div>
                            <div className="mb-4 text-white">
                                <h1 className="text-xl md:text-2xl font-bold">Nguyễn Văn A</h1>
                                <p className="text-blue-100">example@email.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
            )}

            {/* Mobile Menu Sidebar */}
            <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                <div className="p-4 border-b flex justify-between items-center">
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                        <FiX className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-4">
                    <div className="space-y-1">
                        <NavItem to="/user/info" icon={FiUser}>Thông tin cá nhân</NavItem>
                        <NavItem to="/user/orders" icon={FiShoppingBag}>Đơn hàng của tôi</NavItem>
                        <NavItem to="/user/addresses" icon={FiMapPin}>Sổ địa chỉ</NavItem>
                        <NavItem to="/logout-success" icon={FiLogOut}>Đăng xuất</NavItem>
                    </div>

                    <div className="mt-4 pt-4 border-t space-y-1">
                        <NavItem
                            to="/user/notifications"
                            icon={FiBell}
                            count="3"
                            countColor="bg-red-500 text-white"
                        >
                            Thông báo
                        </NavItem>

                        <NavItem
                            to="/user/favorites"
                            icon={FiHeart}
                            count="12"
                        >
                            Yêu thích
                        </NavItem>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Desktop Sidebar - ẩn trên mobile */}
                    <div className="hidden lg:block w-1/4">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                            <div className="p-4">
                                <SlideInWhenVisible direction="up" delay={0.1}>
                                    <Link to="/user/notifications">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                    <FiBell className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <span className="font-medium">Thông báo</span>
                                            </div>
                                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">3</span>
                                        </div>
                                    </Link>
                                </SlideInWhenVisible>


                                <SlideInWhenVisible direction="up" delay={0.2}>
                                    <Link to="/user/favorites">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                                                    <FiHeart className="w-5 h-5 text-pink-600" />
                                                </div>
                                                <span className="font-medium">Yêu thích</span>
                                            </div>
                                            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">12</span>
                                        </div>
                                    </Link>
                                </SlideInWhenVisible>
                            </div>

                            <nav className="border-t border-gray-100 mt-4 p-4 space-y-1">
                                <SlideInWhenVisible direction="down" delay={0.1}>
                                    <NavItem to="/user/info" icon={FiUser}>Thông tin cá nhân</NavItem>
                                </SlideInWhenVisible>

                                <SlideInWhenVisible direction="down" delay={0.2}>
                                    <NavItem to="/user/orders" icon={FiShoppingBag}>Đơn hàng của tôi</NavItem>
                                </SlideInWhenVisible>

                                <SlideInWhenVisible direction="down" delay={0.3}>
                                    <NavItem to="/user/addresses" icon={FiMapPin}>Sổ địa chỉ</NavItem>
                                </SlideInWhenVisible>

                                <SlideInWhenVisible direction="down" delay={0.4}  >
                                    <NavItem to="/logout-success" icon={FiLogOut}>Đăng xuất</NavItem>
                                </SlideInWhenVisible>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default UserPage;
