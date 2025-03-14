import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const StatCard = ({ icon: Icon, title, value, percent, color, chartColor }) => {
    // Tạo dữ liệu mẫu cho biểu đồ
    const chartData = Array(20).fill().map((_, i) => ({
        name: i.toString(),
        value: Math.floor(Math.random() * (100 - 50) + 50)
    }));

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
                        <Icon className="text-white text-xl" />
                    </div>
                    <h3 className="text-gray-500 text-sm mt-4">{title}</h3>
                    <p className="text-2xl font-bold mt-1">{value}</p>
                </div>
                <div className="flex items-center text-sm">
                    <span className={`${percent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {percent >= 0 ? '+' : ''}{percent}%
                    </span>
                </div>
            </div>
            <div className="h-16">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke={chartColor}
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default StatCard;