import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { HiArrowsPointingOut } from "react-icons/hi2";
import { SlideInWhenVisible } from '../animation/SlideInWhenVisible';
import { checkFavorite, addToFavorites, removeFromFavorites } from '../../api/favorite/favoriteService';
import { getToken } from '../../utils/storage';

const CardProduct = ({ _id, name, price, images, discount }) => {
    const [mainImage] = useState(images[0]);
    const secondImage = images[1] || images[0];
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const userId = getToken();

    // Kiểm tra sản phẩm đã được yêu thích chưa khi component mount
    useEffect(() => {
        const fetchFavoriteStatus = async () => {
            try {
                const data = await checkFavorite(_id);
                setIsFavorite(data.isFavorite);
            } catch (error) {
                console.error('Lỗi khi kiểm tra trạng thái yêu thích:', error);
            }
        };

        if (userId) {
            fetchFavoriteStatus();
        }
    }, [_id, userId]);

    // Hàm xử lý thêm/hủy yêu thích
    const handleToggleFavorite = async () => {
        if (!userId) {
            alert('Vui lòng đăng nhập để thêm sản phẩm vào yêu thích!');
            return;
        }

        setLoading(true);
        try {
            if (isFavorite) {
                await removeFromFavorites(_id);
                setIsFavorite(false);
            } else {
                await addToFavorites(_id);
                setIsFavorite(true);
            }
        } catch (error) {
            console.error('Lỗi khi xử lý yêu thích:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenImageModal = () => {
        setIsImageModalOpen(true);
        setCurrentImageIndex(0);
    };

    const handleCloseImageModal = () => {
        setIsImageModalOpen(false);
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const formatPrice = (price) => {
        return `${price.toLocaleString('vi-VN')} VND`;
    };

    return (
        <>
            <SlideInWhenVisible direction="down" delay={0.2}>
                <div className="bg-white overflow-hidden group relative w-full sm:max-w-[280px] md:max-w-[300px] lg:max-w-[320px]">
                    {/* Card Content */}
                    <div className="relative">
                        {/* Discount Badge */}
                        {discount !== 0 && (
                            <div className="absolute top-0 left-0 z-10 bg-red-500 text-white px-2 py-1 text-xs sm:text-sm sm:px-3">
                                -{discount}%
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="absolute right-1 sm:right-2 top-1 z-20 flex flex-col gap-1 sm:gap-2">
                            {/* Favorite Button */}
                            <button
                                onClick={handleToggleFavorite}
                                disabled={loading}
                                className={`p-1.5 sm:p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-all duration-300 transform translate-x-12 group-hover:translate-x-0 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isFavorite ? (
                                    <AiFillHeart className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                                ) : (
                                    <AiOutlineHeart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                                )}
                            </button>

                            <button
                                onClick={handleOpenImageModal}
                                className="p-1.5 sm:p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-all duration-300 transform translate-x-12 group-hover:translate-x-0 delay-75"
                            >
                                <HiArrowsPointingOut className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                            </button>
                        </div>

                        <div className="relative overflow-hidden p-2 sm:p-3 md:p-4">
                            <img
                                src={import.meta.env.VITE_API_URL + mainImage}
                                alt={name}
                                className="w-full aspect-square object-cover transition-opacity duration-300 group-hover:opacity-0"
                            />
                            <img
                                src={import.meta.env.VITE_API_URL + secondImage}
                                alt={name}
                                className="w-full aspect-square object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            />

                            <div className="absolute inset-x-0 bottom-0 group-hover:bottom-2 sm:group-hover:bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-300 px-2 sm:px-4">
                                <NavLink
                                    to={`/directory/product-detail/${_id}`}
                                    className="w-full bg-white shadow-md text-gray-700 py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base flex items-center justify-center hover:bg-gray-50"
                                >
                                    <span>Xem chi tiết</span>
                                </NavLink>
                            </div>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-2 sm:p-3 md:p-4 text-center">
                        <NavLink to={`/directory/product-detail/${_id}`}>
                            <h3 className="text-xs sm:text-sm font-medium text-gray-800 uppercase tracking-wider overflow-hidden whitespace-nowrap text-ellipsis">
                                {name}
                            </h3>
                        </NavLink>

                        {/* Price */}
                        <div className="mt-1 sm:mt-2 space-x-2 text-xs sm:text-sm">
                            {discount !== 0 && (
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

            {isImageModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="relative max-w-3xl w-full mx-4 bg-white rounded-lg p-4">
                        <button
                            onClick={handleCloseImageModal}
                            className="absolute top-2 right-2 p-2 text-gray-600 hover:text-gray-800"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Hình ảnh chính */}
                        <div className="flex justify-center items-center">
                            <button
                                onClick={handlePrevImage}
                                className="absolute left-4 p-2 text-white bg-gray-800 bg-opacity-50 rounded-full hover:bg-opacity-75"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            <img
                                src={import.meta.env.VITE_API_URL + images[currentImageIndex]}
                                alt={`${name} - ${currentImageIndex + 1}`}
                                className="max-h-[70vh] w-auto object-contain"
                            />

                            <button
                                onClick={handleNextImage}
                                className="absolute right-4 p-2 text-white bg-gray-800 bg-opacity-50 rounded-full hover:bg-opacity-75"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>

                        {/* Thumbnail ảnh */}
                        <div className="flex justify-center gap-2 mt-4 overflow-x-auto">
                            {images.map((image, index) => (
                                <img
                                    key={index}
                                    src={import.meta.env.VITE_API_URL + image}
                                    alt={`${name} - ${index + 1}`}
                                    className={`w-16 h-16 object-cover cursor-pointer rounded-md ${index === currentImageIndex ? 'border-2 border-blue-500' : ''}`}
                                    onClick={() => setCurrentImageIndex(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CardProduct;