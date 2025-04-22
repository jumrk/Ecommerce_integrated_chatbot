import React, { useEffect, useState } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { BiSearch } from 'react-icons/bi';
import { IoArrowRedoOutline } from "react-icons/io5";
import './HeaderAdmin.css';
import { getInforUser } from '../../api/user/getInforUserAPI';
import { removeToken } from '../../utils/storage';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from '../common/ConfirmDialog';
import Notification from '../notification/Notification';

const HeaderAdmin = ({ toggleSidebar, isSidebarCollapsed }) => {
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const [inforUser, setinforUser] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [notification, setNotification] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInforUser = async () => {
            const response = await getInforUser();
            setinforUser(response);
        }

        fetchInforUser();
    }, [])

    const handleLogout = () => {
        removeToken();
        setNotification("Đăng xuất thành công!");
        setTimeout(() => {
            navigate('/login');
        }, 2000);
    };

    return (
        <>
            <header className={` ${!isSidebarCollapsed && ("md:fixed")} top-0 right-0 p-1 bg-white text-gray-700 shadow-sm z-40
                transition-all duration-300
                ${isSidebarCollapsed ? 'left-16' : 'left-64'}`}>
                <div className={`flex ${isSidebarCollapsed ? 'justify-around md:justify-between' : 'justify-end'}  items-center h-14 px-4`}>
                    {/* Toggle Button */}
                    {isSidebarCollapsed && (
                        <div className='flex items-center mr-2'>
                            <button className='p-2 hover:bg-gray-100 rounded-full' onClick={toggleSidebar}>
                                <IoArrowRedoOutline size={25} />
                            </button>
                        </div>
                    )}
                    <div className="flex items-end space-x-4 ml-4">
                        {/* Admin profile */}
                        <div className="flex items-center space-x-2 ml-2">
                            <img
                                src={import.meta.env.VITE_API_URL + inforUser.avatar}
                                alt="Admin"
                                className="w-8 h-8 rounded-full"
                            />
                            <div className="hidden md:block">
                                <div className="text-sm font-semibold">{inforUser.fullName}</div>
                                <div className="text-xs text-gray-500">{inforUser.role}</div>
                            </div>
                        </div>

                        <button
                            className="p-2 hover:bg-gray-100 rounded-full"
                            onClick={() => setIsDialogOpen(true)}
                        >
                            <FaSignOutAlt className="text-xl" />
                        </button>
                    </div>
                </div>

                {/* Mobile Search Dropdown */}
                <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden
                    ${showMobileSearch ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-4 py-3 border-t border-gray-100">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search here..."
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 
                                    focus:outline-none focus:border-gray-300 bg-gray-50"
                            />
                            <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Overlay for mobile search */}
            {showMobileSearch && (
                <div
                    className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={() => setShowMobileSearch(false)}
                />
            )}

            {/* Confirm Dialog */}
            <ConfirmDialog
                isOpen={isDialogOpen}
                title="Xác nhận đăng xuất"
                message="Bạn có chắc chắn muốn đăng xuất không?"
                onConfirm={() => {
                    handleLogout();
                    setIsDialogOpen(false);
                }}
                onClose={() => setIsDialogOpen(false)}
            />

            {/* Notification */}
            {notification && (
                <Notification
                    message={notification}
                    type="success"
                    onClose={() => setNotification(null)}
                />
            )}
        </>
    );
};

export default HeaderAdmin;