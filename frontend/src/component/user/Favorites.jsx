import React, { useEffect, useState } from 'react';
import { FiHeart } from 'react-icons/fi';
import CardProduct from '../card/CardProduct';
import { getFavoritesByIdUser } from '../../api/favorite/favoriteService';
const Favorites = () => {
    getFavoritesByIdUser()
    const [favorite, setFavorite] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        const fetchFavorite = async () => {
            const response = await getFavoritesByIdUser();
            setFavorite(response.favorite)
            setLoading(false)
        }
        fetchFavorite()
    }, [])

    return (
        <div className="space-y-6">
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <span className="ml-4 text-gray-600">Đang tải...</span>
                </div>
            ) : (

                <div>
                    <div className="flex items-center justify-between pb-6 border-b">
                        <h2 className="text-2xl font-bold text-gray-800">Sản phẩm yêu thích</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favorite.map((product) => (
                            <CardProduct
                                key={product.productId._id}
                                _id={product.productId._id}
                                name={product.productId.name}
                                price={product.productId.price}
                                images={product.productId.images}
                                discount={product.productId.discount}
                            />
                        ))}
                    </div>

                    {favorite.length === 0 && (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                <FiHeart className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-gray-500">Chưa có sản phẩm yêu thích</h3>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Favorites;