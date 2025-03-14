import React from 'react';
import { FaArrowUp } from 'react-icons/fa';

const BestSellers = () => {
    const sellers = [
        {
            name: "Robert",
            avatar: "/path-to-avatar.jpg",
            purchases: "73 Purchases",
            categories: "Kitchen, Pets",
            total: "$1,000",
            status: "100%",
            statusColor: "bg-green-500"
        },
        // Thêm các sellers khác
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">Best Shop Sellers</h2>
                <button className="text-sm text-gray-500">View all</button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-left text-gray-500 text-sm">
                            <th className="pb-4">Shop</th>
                            <th className="pb-4">Categories</th>
                            <th className="pb-4">Total</th>
                            <th className="pb-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {sellers.map((seller, index) => (
                            <tr key={index}>
                                <td className="py-4">
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src={seller.avatar}
                                            alt={seller.name}
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <div>
                                            <p className="font-medium">{seller.name}</p>
                                            <p className="text-sm text-gray-500">{seller.purchases}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 text-gray-500">{seller.categories}</td>
                                <td className="py-4 font-medium">{seller.total}</td>
                                <td className="py-4">
                                    <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${seller.statusColor} text-white`}>
                                        {seller.status}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BestSellers;