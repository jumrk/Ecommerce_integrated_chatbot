const OrdersList = () => {
    const orders = [
        {
            id: 1,
            product: {
                name: "Prodotti per il tuo cane",
                image: "/path-to-image.jpg"
            },
            price: "20 Nov 2023",
            deliveryDate: "20 Nov 2023"
        },
        // ... more orders
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Orders</h2>
                <button className="text-gray-400">•••</button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-left text-gray-500">
                            <th className="pb-4">Product</th>
                            <th className="pb-4">Price</th>
                            <th className="pb-4">Delivery date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50">
                                <td className="py-4">
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src={order.product.image}
                                            alt={order.product.name}
                                            className="w-12 h-12 rounded-lg object-cover"
                                        />
                                        <span className="font-medium truncate max-w-[200px]">
                                            {order.product.name}
                                        </span>
                                    </div>
                                </td>
                                <td className="py-4">{order.price}</td>
                                <td className="py-4">{order.deliveryDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrdersList;