
import React, { useEffect, useState } from 'react';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

function CardCart({ id, productId, color, size, quantity: initialQuantity, onQuantityChange, onRemove }) {
    const [quantity, setQuantity] = useState(initialQuantity);

    useEffect(() => {
        setQuantity(initialQuantity);
    }, [initialQuantity]);

    const discount = productId.discount > 1 ? productId.discount / 100 : productId.discount;
    const discountedPrice = productId.price * (1 - discount);

    const truncateName = (name, maxLength = 40) => {
        if (name.length <= maxLength) return name;
        return name.substring(0, maxLength) + '...';
    };

    const handleIncrease = () => {
        const newQuantity = quantity + 1;
        onQuantityChange(id, newQuantity, quantity);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            onQuantityChange(id, newQuantity, quantity);
        }
    };


    const handleRemoveItem = () => {
        onRemove(id);
    };

    return (
        <div className="grid grid-cols-12 gap-4 items-center p-4 bg-white hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100">
            <div className="col-span-3 sm:col-span-2">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-gray-100">
                    <img
                        src={productId.images ? import.meta.env.VITE_API_URL + productId.images[0] : '/placeholder.jpg'}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        alt={productId.name}
                    />
                </div>
            </div>
            <div className="col-span-9 sm:col-span-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-grow min-w-0">
                    <h3
                        className="text-base sm:text-lg font-medium text-gray-900 truncate hover:text-blue-600 transition-colors duration-200"
                        title={productId.name}
                    >
                        {truncateName(productId.name)}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-1 text-sm  text-gray-600">
                        <span
                            className="inline-flex border items-center w-5 h-5 rounded-full"
                            style={{ backgroundColor: color }}
                        ></span>/
                        <span className="inline-flex items-center px-2 py-0.5 bg-gray-100 rounded-full">{size}</span>
                    </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-8">
                    <div className="text-right">
                        <span className="text-lg sm:text-xl font-semibold text-blue-600">
                            {discountedPrice.toLocaleString('vi-VN')}đ
                        </span>
                        {discount > 0 && (
                            <span className="block text-xs text-gray-400 line-through">
                                {productId.price.toLocaleString('vi-VN')}đ
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-md">
                            <button
                                onClick={handleDecrease}
                                className="p-2 hover:bg-gray-100 text-gray-600 rounded-md transition-colors duration-200"
                                disabled={quantity <= 1}
                            >
                                <FaMinus size={10} />
                            </button>
                            <span className="px-3 py-1 text-gray-800 font-medium min-w-[2rem] text-center">
                                {quantity}
                            </span>
                            <button
                                onClick={handleIncrease}
                                className="p-2 hover:bg-gray-100 text-gray-600 rounded-md transition-colors duration-200"
                            >
                                <FaPlus size={10} />
                            </button>
                        </div>
                        <button
                            onClick={handleRemoveItem}
                            className="text-red-500 hover:text-red-600 transition-colors duration-200"
                        >
                            <FaTrash size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardCart;