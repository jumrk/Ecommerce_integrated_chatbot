import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TopProducts = ({ products }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white p-6 overflow-y-auto scrollbar-thin 
        scrollbar-thumb-gray-300 scrollbar-track-gray-100 max-h-[450px] rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">Sản phẩm</h2>
                <button className="text-sm text-gray-500" onClick={() => navigate('/admin/products/list-product')}>Tất cả</button>
            </div>
            <div className="space-y-4">
                {products.map((product) => (
                    <div key={product._id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <img
                                src={import.meta.env.VITE_API_URL + product.images[0]}
                                alt={product.name}
                                className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                                <p className="font-medium">{product.name}</p>
                                <p className="text-sm text-gray-500">{product.category.name}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center space-x-2">
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