import React, { useState } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { BsMoon, BsBell } from 'react-icons/bs';
import { BiSearch } from 'react-icons/bi';
import { IoArrowRedoOutline } from "react-icons/io5";
import './HeaderAdmin.css';

const HeaderAdmin = ({ toggleSidebar, isSidebarCollapsed }) => {
    const [showMobileSearch, setShowMobileSearch] = useState(false);

    return (
        <>
            <header className={` ${!isSidebarCollapsed && ("md:fixed")} top-0 right-0 p-1 bg-white text-gray-700 shadow-sm z-40
                transition-all duration-300
                ${isSidebarCollapsed ? 'left-16' : 'left-64'}`}>
                <div className="flex justify-around md:justify-between items-center h-14 px-4">
                    {/* Toggle Button */}
                    {isSidebarCollapsed && (
                        <div className='flex items-center mr-2'>
                            <button className='p-2 hover:bg-gray-100 rounded-full' onClick={toggleSidebar}>
                                <IoArrowRedoOutline size={25} />
                            </button>
                        </div>
                    )}

                    {/* Desktop Search */}
                    <div className="hidden md:flex-1 md:block max-w-xl relative">
                        <input
                            type="text"
                            placeholder="Search here..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-300"
                        />
                        <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                    </div>

                    {/* Mobile Search Icon */}
                    <div className="md:hidden">
                        <button
                            className="p-2 hover:bg-gray-100 rounded-full"
                            onClick={() => setShowMobileSearch(!showMobileSearch)}
                        >
                            <BiSearch className="text-xl" />
                        </button>
                    </div>

                    {/* Right side icons */}
                    <div className="flex items-center space-x-4 ml-4">
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                            <BsMoon className="text-xl" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-full relative">
                            <BsBell className="text-xl" />
                            <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center notification-badge">
                                1
                            </span>
                        </button>

                        {/* Admin profile */}
                        <div className="flex items-center space-x-2 ml-2">
                            <img
                                src="/path-to-admin-avatar.jpg"
                                alt="Admin"
                                className="w-8 h-8 rounded-full"
                            />
                            <div className="hidden md:block">
                                <div className="text-sm font-semibold">Kristin Watson</div>
                                <div className="text-xs text-gray-500">Admin</div>
                            </div>
                        </div>

                        <button className="p-2 hover:bg-gray-100 rounded-full">
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
        </>
    );
};

export default HeaderAdmin;