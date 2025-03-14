import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai'
import { SlideInWhenVisible } from '../animation/SlideInWhenVisible';
const CardProduct = ({ id, name, price, images, discount }) => {
    const [mainImage] = useState(images[0]);
    const secondImage = images[1] || images[0];

    const formatPrice = (price) => {
        return `${price.toLocaleString('vi-VN')} VND`;
    };

    return (
        <SlideInWhenVisible direction="down" delay={0.2}>
            <div className="bg-white overflow-hidden group relative w-full sm:max-w-[280px] md:max-w-[300px] lg:max-w-[320px]">
                {/* Card Content */}
                <div className="relative">
                    {/* Discount Badge */}
                    {discount && (
                        <div className="absolute top-0 left-0 z-10 bg-red-500 text-white px-2 py-1 text-xs sm:text-sm sm:px-3">
                            -{discount}%
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="absolute right-1 sm:right-2 top-1 z-20 flex flex-col gap-1 sm:gap-2">
                        {/* Favorite Button */}
                        <button className="p-1.5 sm:p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-all duration-300 transform translate-x-12 group-hover:translate-x-0">
                            <AiOutlineHeart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                        </button>

                        {/* Add to Cart Button */}
                        <button className="p-1.5 sm:p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-all duration-300 transform translate-x-12 group-hover:translate-x-0 delay-75">
                            <AiOutlineShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                        </button>
                    </div>

                    {/* Main Image with Hover Effect */}
                    <div className="relative overflow-hidden p-2 sm:p-3 md:p-4">
                        <img
                            src={mainImage}
                            alt={name}
                            className="w-full aspect-square object-cover transition-opacity duration-300 group-hover:opacity-0"
                        />
                        <img
                            src={secondImage}
                            alt={name}
                            className="w-full aspect-square object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        />

                        {/* Select Options Button - Overlay on image */}
                        <div className="absolute inset-x-0 bottom-0 group-hover:bottom-2 sm:group-hover:bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-300 px-2 sm:px-4">
                            <NavLink
                                to={`/directory/product-detail/${id}`}
                                className="w-full bg-white shadow-md text-gray-700 py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base flex items-center justify-center hover:bg-gray-50"
                            >
                                <span>Xem chi tiết</span>
                            </NavLink>
                        </div>
                    </div>
                </div>

                {/* Product Info */}
                <div className="p-2 sm:p-3 md:p-4 text-center">
                    <NavLink to={`/directory/product-detail/${id}`}>
                        <h3 className="text-xs sm:text-sm font-medium text-gray-800 uppercase tracking-wider">
                            {name}
                        </h3>
                    </NavLink>

                    {/* Price */}
                    <div className="mt-1 sm:mt-2 space-x-2 text-xs sm:text-sm">
                        {discount && (
                            <span className="text-gray-500 line-through">
                                {formatPrice(price)}
                            </span>
                        )}
                        <span className="text-gray-900 font-medium">
                            {formatPrice(discount ? price * (1 - discount / 100) : price)}
                        </span>
                    </div>
                </div>
            </div>
        </SlideInWhenVisible>
    );
};

export default CardProduct;