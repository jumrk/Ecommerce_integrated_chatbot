import React, { useEffect, useState } from 'react';
import { getRecentOrders } from '../../../api/dashboard/dashboardSevice';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const RecentOrders = () => {
    const [orders, setOrders] = useState({ dailyOrders: [], weeklyOrders: [], monthlyOrders: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const data = await getRecentOrders();
                setOrders(data);
            } catch (error) {
                console.error("Error fetching recent orders:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const chartConfig = [
        {
            title: "Hôm nay",
            dataKey: "dailyOrders",
            color: "#3B82F6",
            formatLabel: (order) => {
                const date = new Date(order.createdAt);
                return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
            }
        },
        {
            title: "Tuần này",
            dataKey: "weeklyOrders",
            color: "#22C55E",
            formatLabel: (order) => {
                const date = new Date(order.createdAt);
                return `${date.getDate()}/${date.getMonth() + 1}`;
            }
        },
        {
            title: "Tháng này",
            dataKey: "monthlyOrders",
            color: "#FBBF24",
            formatLabel: (order) => {
                const date = new Date(order.createdAt);
                return `${date.getDate()}/${date.getMonth() + 1}`;
            }
        }
    ];

    const formatData = (ordersList, config) =>
        ordersList.map(order => ({
            name: config.formatLabel(order),
            total: order.total,
            date: new Date(order.createdAt).toLocaleString()
        }));

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-gray-800 text-white p-2 rounded shadow">
                    <p className="text-sm">Date: {payload[0].payload.date}</p>
                    <p className="text-sm">Total: ${payload[0].value.toLocaleString()}</p>
                </div>
            );
        }
        return null;
    };

    if (loading) {
        return <div>Loading recent orders...</div>; // Loading indicator
    }

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Tổng quan về các đơn hàng gần đây</h2>

            {chartConfig.map((config, index) => (
                <div key={config.title} className="mb-8">
                    <h3 className="text-md font-semibold text-gray-700 mb-3">{config.title}</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart
                            data={formatData(orders[config.dataKey], config)}
                            margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis
                                dataKey="name"
                                tick={{ fill: '#6b7280', fontSize: 12 }}
                                interval={0}
                                angle={-45}
                                textAnchor="end"
                                height={60}
                            />
                            <YAxis
                                tick={{ fill: '#6b7280', fontSize: 12 }}
                                tickFormatter={(value) => `$${value.toLocaleString()}`}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar
                                dataKey="total"
                                fill={config.color}
                                radius={[4, 4, 0, 0]}
                                maxBarSize={50}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            ))}
        </div>
    );
};

export default RecentOrders;