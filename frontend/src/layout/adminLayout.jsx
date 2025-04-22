import React, { useEffect, useState } from 'react';
import HeaderAdmin from '../component/header/HeaderAdmin';
import SidebarAdmin from '../component/Sidebar/AdminSidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import { getToken } from '../utils/storage';
import Notification from '../component/notification/Notification';
import { getInforUser } from '../api/user/getInforUserAPI';
const AdminLayout = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [notification, setNotification] = useState();

    const token = getToken();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const checkUser = await getInforUser()
            if (!token) {
                navigate('/login');
            }
            if (checkUser.role === 'customer') {
                navigate('/login')
            }
        }
        fetchData()
    }, [])
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
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(undefined)}
                />
            )}
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