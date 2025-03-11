import React from 'react';
import { StarIcon, HeartIcon as HeartOutline } from '@heroicons/react/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/solid';
import AddToCartButton from '../../component/button/Button';

const ProductInfo = ({
    product,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    quantity,
    setQuantity,
    isAdding,
    handleAddToCart,
    getStockForVariant,
    isFavorite,
    handleToggleFavorite,
    discountedPrice
}) => {
    return (
        <div className="md:w-4/5 lg:w-5/6">
            <div className="p-4 md:p-8">
                <div className="flex justify-between items-center mb-4 md:mb-6">
                    <h1 className="text-2xl md:text-4xl font-bold text-gray-800">{product.name}</h1>
                    <button onClick={handleToggleFavorite} className="relative">
                        {isFavorite ? (
                            <HeartSolid className="h-8 w-8 md:h-10 md:w-10 text-red-500 transform transition-transform duration-300 hover:scale-110" />
                        ) : (
                            <HeartOutline className="h-8 w-8 md:h-10 md:w-10 text-gray-400 hover:text-red-500 transform transition-all duration-300 hover:scale-110" />
                        )}
                        <span className={`absolute top-0 left-0 h-full w-full ${isFavorite ? 'animate-ping' : ''}`}>
                            <HeartSolid className="h-8 w-8 md:h-10 md:w-10 text-red-500 opacity-75" />
                        </span>
                    </button>
                </div>

                <div className="flex items-center mb-3 md:mb-4">
                    <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, index) => (
                            <StarIcon
                                key={index}
                                className={`h-4 w-4 md:h-5 md:w-5 ${index < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                            />
                        ))}
                    </div>
                    <span className="ml-2 text-sm md:text-base text-gray-600">
                        ({product.rating}/5 - {product.reviews} đánh giá)
                    </span>
                </div>

                <div className="mb-4 md:mb-6">
                    <span className="text-2xl md:text-4xl font-bold text-red-600">
                        {discountedPrice.toLocaleString()}₫
                    </span>
                    {product.discount && (
                        <>
                            <span className="ml-2 md:ml-3 text-lg md:text-xl line-through text-gray-400">
                                {product.price.toLocaleString()}₫
                            </span>
                            <span className="ml-2 md:ml-3 bg-red-100 text-red-600 px-2 md:px-3 py-1 rounded-full text-sm md:text-base">
                                -{product.discount}%
                            </span>
                        </>
                    )}
                </div>

                <div className="mb-4 md:mb-6">
                    <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3">Mô tả sản phẩm</h2>
                    <p className="text-gray-600 text-base md:text-lg leading-relaxed">{product.description}</p>
                </div>

                <div className="mb-4 md:mb-6">
                    <h2 className="text-lg md:text-xl font-semibold mb-2">Màu sắc</h2>
                    <div className="flex flex-wrap gap-2 md:gap-4">
                        {product.colors.map((color) => (
                            <button
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                className={`w-7 h-7 md:w-8 md:h-8 rounded-full focus:outline-none focus:ring-2 ring-offset-2 ${selectedColor === color ? 'ring-2 ring-blue-500' : ''}`}
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                </div>

                <div className="mb-4 md:mb-6">
                    <h2 className="text-lg md:text-xl font-semibold mb-2">Kích thước</h2>
                    <div className="flex flex-wrap gap-2 md:gap-4">
                        {product.sizes.map((size) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`px-3 md:px-4 py-1.5 md:py-2 border rounded-md hover:bg-gray-100 ${selectedSize === size ? 'bg-gray-100 border-blue-500' : ''}`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mb-4 md:mb-6">
                    <p className="text-sm md:text-base text-gray-600">Số lượng còn lại: {getStockForVariant()}</p>
                </div>

                <div className="relative">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="max-w-[180px] w-full">
                            <div className="flex items-center border rounded-md w-full">
                                <button
                                    onClick={() => quantity > 1 && setQuantity(q => q - 1)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="w-full text-center border-x"
                                    min="1"
                                />
                                <button
                                    onClick={() => setQuantity(q => q + 1)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="w-full md:w-auto">
                            <AddToCartButton
                                isAdding={isAdding}
                                quantity={quantity}
                                getStockForVariant={getStockForVariant}
                                handleAddToCart={handleAddToCart}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;