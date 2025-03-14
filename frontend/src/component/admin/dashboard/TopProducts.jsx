const TopProducts = () => {
    const products = [
        {
            name: "Patimax Fragrance Long...",
            items: "100 Items",
            code: "Sflat",
            discount: "-15%",
            price: "$27.00",
            flag: "🇪🇸",
            image: "/path-to-image.jpg"
        },
        // ... more products
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">Top Products</h2>
                <button className="text-sm text-gray-500">View all</button>
            </div>
            <div className="space-y-4">
                {products.map((product, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                                <p className="font-medium">{product.name}</p>
                                <p className="text-sm text-gray-500">{product.items}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center space-x-2">
                                <span>Coupon Code</span>
                                <span>{product.flag}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span>{product.code}</span>
                                <span className="text-red-500">{product.discount}</span>
                                <span>{product.price}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopProducts;