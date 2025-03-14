import React from 'react'
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

function CardCart({ id, image, name, price, color, size, discount, quantity, handleDecrease, handleIncrease, handleRemove }) {

    return (
        <div className="flex gap-4">
            {/* Ảnh sản phẩm */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content container */}
            <div className="flex flex-col flex-grow">
                {/* Thông tin sản phẩm */}
                <div className="flex-grow">
                    <h3 className="text-base sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2">
                        {name}
                    </h3>
                    <div className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
                        <p>Màu sắc: <span className="font-medium">{color}</span></p>
                        <p>Kích cỡ: <span className="font-medium">{size}</span></p>
                    </div>
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                        <span className="text-lg sm:text-2xl font-bold text-primary-600">
                            {(price * (1 - discount)).toLocaleString('vi-VN')}đ
                        </span>
                        {discount > 0 && (
                            <span className="text-xs sm:text-sm text-gray-500 line-through">
                                {price.toLocaleString('vi-VN')}đ
                            </span>
                        )}
                    </div>
                </div>

                {/* Số lượng và nút xóa */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center border border-gray-200 rounded-lg bg-white">
                        <button
                            onClick={() => handleDecrease(id)}
                            className="p-1.5 sm:p-2 hover:bg-gray-50 text-gray-600 rounded-l-lg"
                        >
                            <FaMinus size={10} className="sm:w-3 sm:h-3" />
                        </button>
                        <span className="px-3 sm:px-6 py-1 sm:py-2 font-medium text-gray-800">
                            {quantity}
                        </span>
                        <button
                            onClick={() => handleIncrease(id)}
                            className="p-1.5 sm:p-2 hover:bg-gray-50 text-gray-600 rounded-r-lg"
                        >
                            <FaPlus size={10} className="sm:w-3 sm:h-3" />
                        </button>
                    </div>
                    <button
                        onClick={() => handleRemove(id)}
                        className="text-red-500 hover:text-red-600 transition duration-300 p-1.5 sm:p-2"
                    >
                        <FaTrash size={12} className="sm:w-4 sm:h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CardCart