import React, { useEffect, useState } from 'react';
import { FaClipboardList, FaMoneyBillWave, FaShoppingBag, FaUsers, FaFileExcel } from 'react-icons/fa';
import StatCard from '../../../component/admin/dashboard/StatCard';
import OrdersList from '../../../component/admin/dashboard/OrdersList';
import TopProducts from '../../../component/admin/dashboard/TopProducts';
import RecentOrders from '../../../component/admin/dashboard/RecentOrders';
import Customer from '../../../component/admin/dashboard/Customer';
import BlogList from '../../../component/admin/dashboard/BlogList';
import Loading from '../../../component/loading/loading';
import { Helmet } from 'react-helmet';
import { getAdminStats } from '../../../api/dashboard/dashboardSevice';
import { getAllOrder } from '../../../api/order/orderService';
import { getProducts } from '../../../api/product/productService';
import { getAllUsers } from '../../../api/user/userManagerAPI';
import { getBlogs } from '../../../api/blog/blogSevice';
import { exportDashboardToExcel } from '../../../utils/excel/excelUtils';

const DashboardPage = () => {
    const [statsData, setStatsData] = useState([]);
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch admin stats
                const stats = await getAdminStats();
                const { totalUsers, totalProducts, totalOrders, totalRevenue } = stats;

                setStatsData([
                    {
                        icon: FaShoppingBag,
                        title: "Tổng sản phẩm",
                        value: totalProducts,
                        color: "bg-blue-500",
                    },
                    {
                        icon: FaUsers,
                        title: "Tổng người dùng",
                        value: totalUsers,
                        color: "bg-green-500",
                    },
                    {
                        icon: FaClipboardList,
                        title: "Tổng đơn hàng",
                        value: totalOrders,
                        color: "bg-yellow-500",
                    },
                    {
                        icon: FaMoneyBillWave,
                        title: "Tổng doanh thu",
                        value: totalRevenue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
                        color: "bg-red-500",
                    },
                ]);

                // Fetch orders, products, and users
                const [orderData, productData, userData, blogData] = await Promise.all([
                    getAllOrder(),
                    getProducts(),
                    getAllUsers(),
                    getBlogs()
                ]);
                setBlogs(blogData);
                setOrders(orderData);
                setProducts(productData);
                setUsers(userData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleExportExcel = async () => {
        try {
            await exportDashboardToExcel(statsData, orders, products, users, blogs);
        } catch (error) {
            console.error('Error exporting to Excel:', error);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="space-y-4 p-4 md:p-6">
            <Helmet>
                <title>Dash Board</title>
            </Helmet>

            <div className="flex justify-end mb-4">
                <button
                    onClick={handleExportExcel}
                    className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm md:text-base"
                >
                    <FaFileExcel className="text-lg md:text-xl" />
                    <span className="hidden sm:inline">Xuất Excel</span>
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statsData.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            {/* Orders & Products */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
                    <OrdersList orders={orders} />
                </div>
                <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
                    <TopProducts products={products} />
                </div>
            </div>

            {/* Recent Orders & Other Components */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
                    <RecentOrders />
                </div>
                <div className="grid grid-rows-1 lg:grid-rows-2 gap-4">
                    <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
                        <Customer users={users} />
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
                        <BlogList blogs={blogs} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;