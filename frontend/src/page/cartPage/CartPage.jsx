// Cart.jsx
import React, { useState } from 'react';
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaTruck } from 'react-icons/fa';

const CartPage = () => {
    // Dữ liệu mẫu cho giỏ hàng (có thể thay bằng API hoặc state quản lý)
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Áo Hoodie Đen Essential',
            price: 499000,
            image: 'https://i.pinimg.com/736x/fe/8f/ce/fe8fceb06d3132d5f578427d5e2294b5.jpg',
            quantity: 1,
            discount: 0.1,
            size: 'L',
            color: 'Đen'
        },
        {
            id: 2,
            name: 'Quần Jeans Slim Fit',
            price: 799000,
            image: 'https://i.pinimg.com/736x/fe/8f/ce/fe8fceb06d3132d5f578427d5e2294b5.jpg',
            quantity: 2,
            discount: 0.05,
            size: '32',
            color: 'Xanh đậm'
        },
    ]);

    // Hàm tăng số lượng
    const handleIncrease = (id) => {
        setCartItems(
            cartItems.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    // Hàm giảm số lượng
    const handleDecrease = (id) => {
        setCartItems(
            cartItems.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    // Hàm xóa sản phẩm
    const handleRemove = (id) => {
        setCartItems(cartItems.filter((item) => item.id !== id));
    };

    // Hàm xóa tất cả
    const handleClearCart = () => {
        setCartItems([]);
    };

    // Tính tổng tiền
    const getSubtotal = (item) => item.price * item.quantity * (1 - item.discount);
    const getTotal = () => cartItems.reduce((total, item) => total + getSubtotal(item), 0);
    const shippingFee = 30000; // Phí vận chuyển cố định
    const totalWithShipping = getTotal() + shippingFee;

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-6 sm:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <FaShoppingBag className="text-primary-600" />
                        Giỏ Hàng Của Bạn
                    </h2>
                    <span className="text-gray-600 font-medium">{cartItems.length} sản phẩm</span>
                </div>

                {cartItems.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-12 text-center">
                        <FaShoppingBag className="mx-auto text-gray-300 text-4xl sm:text-6xl mb-4 sm:mb-6" />
                        <p className="text-gray-500 text-lg sm:text-xl mb-6 sm:mb-8">Giỏ hàng của bạn đang trống</p>
                        <button className="bg-primary-600 text-white px-6 sm:px-8 py-3 rounded-xl hover:bg-primary-700 transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                            Tiếp Tục Mua Sắm
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                        {/* Danh sách sản phẩm */}
                        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-2xl shadow-md p-4 sm:p-6 hover:shadow-lg transition duration-300"
                                >
                                    <div className="flex gap-4">
                                        {/* Ảnh sản phẩm */}
                                        <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Content container */}
                                        <div className="flex flex-col flex-grow">
                                            {/* Thông tin sản phẩm */}
                                            <div className="flex-grow">
                                                <h3 className="text-base sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2">
                                                    {item.name}
                                                </h3>
                                                <div className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
                                                    <p>Màu sắc: <span className="font-medium">{item.color}</span></p>
                                                    <p>Kích cỡ: <span className="font-medium">{item.size}</span></p>
                                                </div>
                                                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                                                    <span className="text-lg sm:text-2xl font-bold text-primary-600">
                                                        {(item.price * (1 - item.discount)).toLocaleString('vi-VN')}đ
                                                    </span>
                                                    {item.discount > 0 && (
                                                        <span className="text-xs sm:text-sm text-gray-500 line-through">
                                                            {item.price.toLocaleString('vi-VN')}đ
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Số lượng và nút xóa */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center border border-gray-200 rounded-lg bg-white">
                                                    <button
                                                        onClick={() => handleDecrease(item.id)}
                                                        className="p-1.5 sm:p-2 hover:bg-gray-50 text-gray-600 rounded-l-lg"
                                                    >
                                                        <FaMinus size={10} className="sm:w-3 sm:h-3" />
                                                    </button>
                                                    <span className="px-3 sm:px-6 py-1 sm:py-2 font-medium text-gray-800">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => handleIncrease(item.id)}
                                                        className="p-1.5 sm:p-2 hover:bg-gray-50 text-gray-600 rounded-r-lg"
                                                    >
                                                        <FaPlus size={10} className="sm:w-3 sm:h-3" />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => handleRemove(item.id)}
                                                    className="text-red-500 hover:text-red-600 transition duration-300 p-1.5 sm:p-2"
                                                >
                                                    <FaTrash size={12} className="sm:w-4 sm:h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Tổng đơn hàng */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 sticky top-8">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">
                                    Tổng Đơn Hàng
                                </h3>

                                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Tạm tính</span>
                                        <span className="font-medium">
                                            {getTotal().toLocaleString('vi-VN')}đ
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Phí vận chuyển</span>
                                        <span className="font-medium">
                                            {shippingFee.toLocaleString('vi-VN')}đ
                                        </span>
                                    </div>
                                    <div className="bg-primary-50 p-3 sm:p-4 rounded-xl flex items-center gap-2 sm:gap-3 text-primary-700">
                                        <FaTruck className="flex-shrink-0" />
                                        <span className="text-xs sm:text-sm">
                                            Miễn phí vận chuyển cho đơn hàng trên 500.000đ
                                        </span>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 pt-4 mb-4 sm:mb-6">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-800 font-medium">Tổng cộng</span>
                                        <span className="text-xl sm:text-2xl font-bold text-primary-600">
                                            {totalWithShipping.toLocaleString('vi-VN')}đ
                                        </span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-gray-500">Đã bao gồm VAT</p>
                                </div>

                                <button className="w-full bg-primary-600 text-white py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-primary-700 transition duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-0.5">
                                    Tiến Hành Thanh Toán
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;