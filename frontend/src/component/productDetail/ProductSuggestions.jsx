import React from 'react';
import CardProduct from '../card/CardProduct';

const ProductSuggestions = ({ products, currentProductId }) => {
    const currentProduct = products.find(product => product._id === currentProductId);
    const currentCategoryId = currentProduct ? currentProduct.category._id : null;

    // Lấy sản phẩm cùng danh mục (so sánh bằng category._id)
    let suggestedProducts = products
        .filter(product =>
            product._id !== currentProductId &&
            product.category._id === currentCategoryId
        );

    if (suggestedProducts.length < 4) {
        const additionalProducts = products
            .filter(product =>
                product._id !== currentProductId &&
                product.category._id !== currentCategoryId
            )
            .sort((a, b) => (b.sold || 0) - (a.sold || 0))
            .slice(0, 4 - suggestedProducts.length);
        suggestedProducts = [...suggestedProducts, ...additionalProducts];
    }

    suggestedProducts = suggestedProducts.slice(0, 4);

    return (
        <div className="mt-8 w-full">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h2 className="text-2xl font-semibold mb-6">Sản phẩm gợi ý</h2>
                {suggestedProducts.length === 0 ? (
                    <p className="text-gray-500 text-center">Không có sản phẩm gợi ý nào.</p>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {suggestedProducts.map((product) => {
                            const discountedPrice = product.discount
                                ? product.price * (1 - product.discount / 100)
                                : product.price;

                            return (
                                <CardProduct
                                    key={product._id}
                                    {...product}
                                    discountedPrice={discountedPrice}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductSuggestions;