import React, { useState } from 'react';
import { FiDollarSign, FiCreditCard, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { Line, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Đăng ký các components cần thiết cho Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const DashboardPage = () => {
    const [timeRange, setTimeRange] = useState('today'); // today, week, month

    // Data mẫu cho biểu đồ doanh thu
    const revenueData = {
        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
        datasets: [
            {
                label: 'Doanh thu',
                data: [150, 230, 380, 420, 560, 650],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    };

    // Data mẫu cho biểu đồ phương thức thanh toán
    const paymentMethodData = {
        labels: ['MoMo', 'VNPay', 'COD', 'Bank Transfer'],
        datasets: [
            {
                data: [300, 250, 200, 150],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 206, 86)',
                    'rgb(75, 192, 192)',
                ],
            },
        ],
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Tổng quan thanh toán</h1>
                </div>

                {/* Thời gian */}
                <div className="mb-6">
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="today">Hôm nay</option>
                        <option value="week">Tuần này</option>
                        <option value="month">Tháng này</option>
                    </select>
                </div>

                {/* Thống kê tổng quan */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Tổng doanh thu</p>
                                <p className="text-2xl font-bold text-gray-800">₫15,000,000</p>
                            </div>
                            <FiDollarSign className="w-10 h-10 text-blue-500" />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Tổng giao dịch</p>
                                <p className="text-2xl font-bold text-gray-800">150</p>
                            </div>
                            <FiCreditCard className="w-10 h-10 text-green-500" />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Giao dịch thành công</p>
                                <p className="text-2xl font-bold text-gray-800">142</p>
                            </div>
                            <FiCheckCircle className="w-10 h-10 text-green-500" />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Giao dịch thất bại</p>
                                <p className="text-2xl font-bold text-gray-800">8</p>
                            </div>
                            <FiXCircle className="w-10 h-10 text-red-500" />
                        </div>
                    </div>
                </div>

                {/* Biểu đồ */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Biểu đồ doanh thu
                        </h2>
                        <Line data={revenueData} />
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Phương thức thanh toán
                        </h2>
                        <Pie data={paymentMethodData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;