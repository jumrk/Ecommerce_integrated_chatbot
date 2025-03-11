import React from 'react';
import CardProduct from '../card/CardProduct';
const ProductSuggestions = ({ products, currentProductId }) => {
    const suggestedProducts = products
        .filter(product => product.id !== currentProductId)
        .slice(0, 4);
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
                                    key={product.id}
                                    {...product}
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