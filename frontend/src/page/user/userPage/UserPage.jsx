import React, { useEffect, useState } from 'react';
import { Outlet, NavLink, useLocation, Navigate, Link } from 'react-router-dom';
import { FiUser, FiShoppingBag, FiMapPin, FiLogOut, FiBell, FiHeart, FiX } from 'react-icons/fi';
import { MdOutlineKeyboardDoubleArrowRight, MdOutlineArticle } from "react-icons/md";
import { SlideInWhenVisible } from '../../../component/animation/SlideInWhenVisible';
import { getFavoritesByIdUser } from '../../../api/favorite/favoriteService';
import Loading from '../../../component/loading/loading';
import { Helmet } from 'react-helmet';

const UserPage = () => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [favoriteCount, setFavoriteCount] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchFavorite = async () => {
            const response = await getFavoritesByIdUser();
            setFavoriteCount(response.favorite.length)
        }
        fetchFavorite()
    }, [])
    setTimeout(() => {
        setLoading(false)
    }, 2000);
    if (location.pathname === '/user') {
        return <Navigate to="/user/info" />;
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
    if (loading) {
        return <Loading />
    }
    return (
        <div className="min-h-screen relative bg-gradient-to-b from-gray-50 to-white">
            <Helmet>
                <title>Trang cá nhân</title>
            </Helmet>
            {/* Mobile Menu Button */}
            <div className="fixed left-0 top-1/2 transform -translate-y-1/2 lg:hidden z-50">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="py-3 bg-slate-500 rounded-tr-lg rounded-br-lg text-white"
                >
                    <MdOutlineKeyboardDoubleArrowRight className="w-6 h-6 " />
                </button>
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
                            to="/user/blogUser"
                            icon={MdOutlineArticle}
                            count="3"
                            countColor="bg-red-500 text-white"
                        >
                            Bài viết
                        </NavItem>

                        <NavItem
                            to="/user/favorites"
                            icon={FiHeart}
                            count={favoriteCount}
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
                                    <Link to="/user/blogUser">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                    <MdOutlineArticle className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <span className="font-medium">Bài viết</span>
                                            </div>
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
                                            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">{favoriteCount}</span>
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
