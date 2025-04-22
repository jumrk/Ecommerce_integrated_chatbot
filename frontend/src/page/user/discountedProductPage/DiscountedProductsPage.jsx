import React, { useState, useEffect } from 'react';
import ProductCard from '../../../component/card/CardProduct';
import { getProductSale } from '../../../api/product/productService';
import Loading from '../../../component/loading/loading';
import { Helmet } from 'react-helmet';

const DiscountedProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState(8);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDiscountedProducts = async () => {
            try {
                const data = await getProductSale();
                const products = data.filter(product => product.category.status)
                setProducts(products);
            } catch (error) {
                console.error("Lỗi khi lấy sản phẩm giảm giá:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDiscountedProducts();
    }, []);

    const discountedProducts = products.filter((product) => product.discount > 0);
    const currentProducts = discountedProducts.slice(0, visibleProducts);

    const loadMoreProducts = () => {
        setVisibleProducts((prev) => prev + 8);
    };

    if (loading) {
        return (
            <Loading />
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Helmet>
                <title>Đang giảm giá</title>
            </Helmet>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">SẢN PHẨM GIẢM GIÁ</h1>
                    <p className="text-gray-600 mt-2">Săn các ưu đãi hấp dẫn ngay hôm nay!</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {currentProducts.map((product) => (
                        <ProductCard
                            key={product._id} // Sử dụng _id thay vì id
                            {...product}
                            discountedPrice={
                                product.discount
                                    ? product.price * (1 - product.discount / 100)
                                    : product.price
                            }
                        />
                    ))}
                </div>

                {discountedProducts.length === 0 && (
                    <div className="text-center text-gray-600 mt-8">
                        Hiện tại không có sản phẩm giảm giá nào.
                    </div>
                )}

                {visibleProducts < discountedProducts.length && (
                    <div className="text-center mt-8">
                        <button
                            onClick={loadMoreProducts}
                            className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full 
              hover:from-red-600 hover:to-orange-600 transition-all duration-300 ease-in-out shadow-lg 
              hover:shadow-xl hover:scale-105 font-semibold uppercase tracking-wide"
                        >
                            Xem thêm
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DiscountedProductsPage;