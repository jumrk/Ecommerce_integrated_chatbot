import React, { useState } from 'react';
import HeaderAdmin from '../component/header/HeaderAdmin';
import SidebarAdmin from '../component/Sidebar/AdminSidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    React.useEffect(() => {
        const handleResize = () => {
            const isMobileView = window.innerWidth < 1024;
            setIsMobile(isMobileView);
            if (!isMobileView) {
                setIsSidebarCollapsed(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <div className="relative min-h-screen bg-gray-100">
            {/* Header - Fixed */}
            <HeaderAdmin
                toggleSidebar={toggleSidebar}
                isSidebarCollapsed={isSidebarCollapsed}
            />

            <div className="flex pt-14"> {/* Wrapper cho sidebar và content */}
                {/* Sidebar */}
                <aside className={`fixed left-0 top-0 bottom-0 z-40
                    transition-all duration-300 ease-in-out
                    ${isSidebarCollapsed ? '-translate-x-full' : 'translate-x-0'}`}
                >
                    <div className="h-full">
                        <SidebarAdmin
                            isCollapsed={isSidebarCollapsed}
                            toggleSidebar={toggleSidebar}
                            isMobile={isMobile}
                        />
                    </div>
                </aside>

                {/* Main Content */}
                <main className={`flex-1 min-h-[calc(100vh-3.5rem)] transition-all duration-300 ease-in-out
                    ${!isSidebarCollapsed ? 'pt-12 md:ml-64' : 'pt-0 ml-0'}
                    p-6`}
                >
                    <div className="container mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* Overlay */}
            {isMobile && !isSidebarCollapsed && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={toggleSidebar}
                />
            )}
        </div>
    );
};

export default AdminLayout;