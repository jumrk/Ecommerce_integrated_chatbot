import React from 'react';

const NewComments = () => {
    const comments = [
        {
            user: {
                name: "John Doe",
                avatar: "/path-to-avatar.jpg",
                time: "2 hours ago"
            },
            product: {
                name: "Soft Fluffy Cats",
                id: "#327",
                price: "$11.70",
                quantity: 28,
                status: "On sale",
                revenue: "$328.85"
            }
        },
        // Thêm các comments khác
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">Product overview</h2>
                <button className="text-sm text-gray-500">View all</button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-left text-gray-500 text-sm">
                            <th className="pb-4">Name</th>
                            <th className="pb-4">Product ID</th>
                            <th className="pb-4">Price</th>
                            <th className="pb-4">Quantity</th>
                            <th className="pb-4">Sale</th>
                            <th className="pb-4">Revenue</th>
                            <th className="pb-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {comments.map((comment, index) => (
                            <tr key={index}>
                                <td className="py-4">
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src={comment.user.avatar}
                                            alt={comment.user.name}
                                            className="w-10 h-10 rounded-lg"
                                        />
                                        <span className="font-medium">{comment.product.name}</span>
                                    </div>
                                </td>
                                <td className="py-4">{comment.product.id}</td>
                                <td className="py-4">{comment.product.price}</td>
                                <td className="py-4">{comment.product.quantity}</td>
                                <td className="py-4">{comment.product.status}</td>
                                <td className="py-4">{comment.product.revenue}</td>
                                <td className="py-4">
                                    <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs">
                                        Not Available
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default NewComments;