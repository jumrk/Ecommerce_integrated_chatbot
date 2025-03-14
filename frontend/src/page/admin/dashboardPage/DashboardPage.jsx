import React from 'react';
import { FaShoppingBag } from 'react-icons/fa';
import StatCard from '../../../component/admin/dashboard/StatCard';
import OrdersList from '../../../component/admin/dashboard/OrdersList';
import TopProducts from '../../../component/admin/dashboard/TopProducts';
import RecentOrders from '../../../component/admin/dashboard/RecentOrders';
import BestSellers from '../../../component/admin/dashboard/BestSellers';
import NewComments from '../../../component/admin/dashboard/NewComments';


const DashboardPage = () => {
    const statsData = [
        {
            icon: FaShoppingBag,
            title: "Total Sales",
            value: "34,945",
            percent: 1.56,
            color: "bg-green-500",
            chartColor: "#22C55E"
        },
        {
            icon: FaShoppingBag,
            title: "Total Sales",
            value: "34,945",
            percent: 1.56,
            color: "bg-green-500",
            chartColor: "#22C55E"
        },
        {
            icon: FaShoppingBag,
            title: "Total Sales",
            value: "34,945",
            percent: 1.56,
            color: "bg-green-500",
            chartColor: "#22C55E"
        },
        {
            icon: FaShoppingBag,
            title: "Total Sales",
            value: "34,945",
            percent: 1.56,
            color: "bg-green-500",
            chartColor: "#22C55E"
        },
        // ... other stats
    ];

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsData.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            {/* Recent Orders & Top Products */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <OrdersList />
                <TopProducts />
            </div>
            {/* Recent Orders & Top Products */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RecentOrders />
                <TopProducts />
            </div>

            {/* Best Sellers & Product Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <BestSellers />
                <NewComments />
            </div>
        </div>
    );
};

export default DashboardPage;