const Order = require('../../model/Order');
const User = require('../../model/User');
const Product = require('../../model/Product');

const getAdminStats = async (req, res) => {
    try {
        // Total counts
        const totalUsers = await User.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalOrders = await Order.countDocuments();

        // Total revenue
        const totalRevenueData = await Order.aggregate([
            { $match: { status: 'completed' } },
            { $group: { _id: null, total: { $sum: '$total' } } }
        ]);
        const totalRevenue = totalRevenueData[0]?.total || 0;

        res.json({
            totalUsers,
            totalProducts,
            totalOrders,
            totalRevenue
        });
    } catch (error) {
        console.error('Error getting admin stats:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getRecentOrders = async (req, res) => {
    try {
        const today = new Date();
        const startOfToday = new Date(today.setHours(0, 0, 0, 0));
        const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
        const startOfMonth = new Date(today.setDate(1));

        const dailyOrders = await Order.find({ createdAt: { $gte: startOfToday } });
        const weeklyOrders = await Order.find({ createdAt: { $gte: startOfWeek } });
        const monthlyOrders = await Order.find({ createdAt: { $gte: startOfMonth } });

        res.json({
            dailyOrders,
            weeklyOrders,
            monthlyOrders,
        });
    } catch (error) {
        console.error('Error getting recent orders:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getAdminStats, getRecentOrders };
