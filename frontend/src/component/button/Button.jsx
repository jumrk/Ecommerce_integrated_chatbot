import React, { useState } from 'react'
import { LiaCartPlusSolid } from "react-icons/lia";
import { BsCartCheck } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
export const ButtonOrange = ({ text, onClick }) => {
    return (
        <button
            className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-full 
          hover:from-orange-600 hover:to-pink-600 transition-all duration-300 ease-in-out shadow-lg 
          hover:shadow-xl hover:scale-105 uppercase tracking-wide font-semibold relative overflow-hidden 
          before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent 
          before:via-white/20 before:to-transparent before:transform before:-translate-x-full 
          hover:before:translate-x-full before:transition-transform before:duration-500"
            onClick={onClick}
        >
            {text}
        </button>
    );
}
export const ButtonBlack = ({ text }) => {
    return (
        <button
            className="bg-gradient-to-r from-gray-900 to-black text-white px-4 md:px-6 py-2 md:py-3 rounded-full 
          hover:from-gray-800 hover:to-gray-900 transition-all duration-300 ease-in-out shadow-lg 
          hover:shadow-xl hover:scale-105 uppercase tracking-wide font-semibold relative overflow-hidden 
          before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent 
          before:via-white/20 before:to-transparent before:transform before:-translate-x-full 
          hover:before:translate-x-full before:transition-transform before:duration-500"
        >
            {text}
        </button>
    );
};
export const ButtonBlue = ({ text }) => {
    return (
        <button
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-full 
        hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 ease-in-out shadow-lg 
        hover:shadow-xl hover:scale-105 font-semibold uppercase tracking-wide"
        >
            {text}
        </button>
    );
};
export const ButtonBasic = ({ text }) => {
    return (
        <button
            className="bg-white text-black px-4 py-2 rounded-full mb-4 font-semibold 
transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 
hover:bg-gray-100"
        >
            {text}
        </button>
    );
};
export const ButtonEye = ({ onClick }) => {
    return (
        <div className='bg-white p-3 rounded-s-md mb-2 backdrop-blur-sm shadow-lg hover:bg-black hover:text-white transform
         hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer'>
            <FaRegEye
                size={25}
                onClick={onClick}
            />
        </div>
    )
}
export const ButtonAddCart = ({ onClick }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

    const handleClick = async () => {
        setIsLoading(true);
        try {
            await onClick();
            setTimeout(() => {
                setIsLoading(false);
                setIsAdded(true);
                // Reset về icon ban đầu sau 2 giây (tùy chọn)
                setTimeout(() => setIsAdded(false), 2000);
            }, 1000);
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        }
    };

    return (
        <div
            className='bg-white p-3 mb-2  rounded-e-md hover:bg-black hover:text-white backdrop-blur-sm shadow-lg transform transition-all duration-300 ease-in-out cursor-pointer flex items-center justify-center'
            onClick={handleClick}
        >
            {isLoading ? (
                <AiOutlineLoading3Quarters
                    size={25}
                    className='animate-spin'
                />
            ) : isAdded ? (
                <BsCartCheck
                    size={25}
                    className='text-green-500 transition-all duration-300'
                />
            ) : (
                <LiaCartPlusSolid
                    size={25}
                />
            )}
        </div>
    );
};

export const AddToCartButton = ({ isAdding, quantity, getStockForVariant, handleAddToCart, selectedSize, selectedColor }) => {
    const stock = getStockForVariant(selectedSize, selectedColor); // Lấy stock dựa trên size và color

    return (
        <button
            onClick={(e) => {
                // Ripple effect
                const button = e.currentTarget;
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.width = ripple.style.height = `${size}px`;
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                ripple.classList.add('ripple');

                button.appendChild(ripple);
                ripple.addEventListener('animationend', () => {
                    ripple.remove();
                });

                handleAddToCart();
            }}
            disabled={isAdding || stock < quantity}
            className={`flex-1 relative overflow-hidden rounded-lg font-semibold text-white transition-all duration-300
                ${isAdding
                    ? 'bg-green-500 hover:bg-green-600 cursor-wait'
                    : stock < quantity
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0'
                }`}
        >
            <style>
                {`
                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    background-color: rgba(255, 255, 255, 0.7);
                    pointer-events: none;
                }

                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }

                .spinner {
                    border: 2px solid transparent;
                    border-top: 2px solid white;
                    border-radius: 50%;
                    width: 18px;
                    height: 18px;
                    animation: spin 0.8s linear infinite;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                `}
            </style>

            <div className="relative flex items-center justify-center py-3 px-6">
                {isAdding ? (
                    <div className="spinner"></div>
                ) : (
                    <span className="flex items-center gap-2 transition-all duration-300">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 animate-bounce"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        </svg>
                        Thêm vào giỏ hàng
                    </span>
                )}
            </div>
        </button>
    );
};