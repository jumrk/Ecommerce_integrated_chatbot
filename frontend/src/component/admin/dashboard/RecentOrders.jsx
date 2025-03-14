import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const RecentOrders = () => {
    // Data mẫu cho biểu đồ
    const chartData = Array(12).fill().map((_, i) => ({
        name: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
        value: Math.floor(Math.random() * (100 - 30) + 30)
    }));

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">Recent Order</h2>
                <button className="text-gray-400">•••</button>
            </div>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#3B82F6"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default RecentOrders;