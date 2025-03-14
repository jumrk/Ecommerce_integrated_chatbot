import React, { useState } from 'react';
import { FiHeart } from 'react-icons/fi';
import products from '../../data/Product';
import CardProduct from '../card/CardProduct';

const Favorites = () => {
    const [favoriteIds, setFavoriteIds] = useState([1, 2, 3]);

    // Lọc sản phẩm yêu thích từ danh sách Products
    const favoriteProducts = products.filter(product => favoriteIds.includes(product.id));

    const removeFromFavorites = (productId) => {
        setFavoriteIds(favoriteIds.filter(id => id !== productId));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between pb-6 border-b">
                <h2 className="text-2xl font-bold text-gray-800">Sản phẩm yêu thích</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteProducts.map((product) => (
                    <CardProduct
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        images={product.images}
                        discount={product.discount}
                    />
                ))}
            </div>

            {favoriteProducts.length === 0 && (
                <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <FiHeart className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-gray-500">Chưa có sản phẩm yêu thích</h3>
                </div>
            )}
        </div>
    );
};

export default Favorites;