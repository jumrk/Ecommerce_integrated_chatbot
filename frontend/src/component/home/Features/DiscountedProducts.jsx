import React, { useState, useEffect } from 'react';
import CardProduct from '../../card/CardProduct';
import useShowMore from '../../../hooks/useShowMore';
import { ButtonOrange } from '../../button/Button';
import { FaPercent } from 'react-icons/fa';
import { FadeInWhenVisible } from '../../animation/FadeInWhenVisible';
import { SlideInWhenVisible } from '../../animation/SlideInWhenVisible';
import { RotateInWhenVisible } from '../../animation/RotateInWhenVisible';
import { getProductSale } from '../../../api/product/productService';

const DiscountedProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDiscountedProducts = async () => {
            try {
                const data = await getProductSale();
                const product = data.filter(product => product.category.status)
                setProducts(product);
            } catch (error) {
                console.error("Lỗi khi lấy sản phẩm giảm giá:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDiscountedProducts();
    }, []);

    const { showMore, toggleShowMore, visibleItems } = useShowMore(products, 8);

    return (
        <section className="py-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `-${Math.random() * 100}%`
                        }}
                    >
                        <FaPercent className="text-red-500/20 text-4xl" />
                    </div>
                ))}
            </div>
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `-${Math.random() * 100}%`
                        }}
                    >
                        <FaPercent className="text-red-500/20 text-4xl" />
                    </div>
                ))}
            </div>

            {/* Content */}
            <div className="relative">
                <div className="text-center mb-12">
                    <RotateInWhenVisible delay={0.2}>
                        <div className="inline-block bg-red-600 text-white px-6 py-2 rounded-full mb-4 transform hover:scale-105 transition-all duration-200">
                            HOT DEALS 🔥
                        </div>
                    </RotateInWhenVisible>

                    <SlideInWhenVisible direction="down" delay={0.2}>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            SẢN PHẨM GIẢM GIÁ
                        </h2>
                    </SlideInWhenVisible>

                    <FadeInWhenVisible delay={0.2}>
                        <p className="text-gray-300 text-lg">
                            Săn các ưu đãi hấp dẫn ngay hôm nay!
                        </p>
                    </FadeInWhenVisible>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {visibleItems.map((product) => (
                            <div
                                key={product._id}
                                className="h-full"
                            >
                                <CardProduct
                                    {...product}
                                    discountedPrice={
                                        product.discount
                                            ? product.price * (1 - product.discount / 100)
                                            : product.price
                                    }
                                />
                            </div>
                        ))}
                    </div>

                    {showMore && (
                        <div className="text-center mt-12">
                            <ButtonOrange text="Xem thêm" onClick={toggleShowMore} />
                        </div>
                    )}

                    {products.length === 0 && (
                        <div className="text-center text-gray-300 mt-8">
                            Hiện tại không có sản phẩm giảm giá nào.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default DiscountedProducts;