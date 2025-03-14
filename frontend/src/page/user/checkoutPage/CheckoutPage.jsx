import React, { useState } from 'react';
import { FaCreditCard, FaMoneyBillWave, FaWallet, FaTruck, FaShieldAlt, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { SlideGridWhenVisible } from '../../../component/animation/SlideGridWhenVisible';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const [orderItems] = useState([
        {
            id: 1,
            name: 'Áo Thun Đen',
            price: 150000,
            quantity: 2,
            image: 'https://i.pinimg.com/736x/9e/41/8f/9e418f03e1da0adfa19f254a1f37d3c4.jpg',
            size: 'L',
            color: 'Đen'
        },
        {
            id: 2,
            name: 'Quần Jeans Xanh',
            price: 450000,
            quantity: 1,
            image: 'https://i.pinimg.com/736x/9e/41/8f/9e418f03e1da0adfa19f254a1f37d3c4.jpg',
            size: '32',
            color: 'Xanh đậm'
        },
    ]);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        district: '',
        ward: '',
        note: ''
    });

    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [shippingMethod, setShippingMethod] = useState('standard');

    const shippingCost = shippingMethod === 'express' ? 50000 : 30000;
    const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subtotal + shippingCost;

    const [savedAddresses] = useState([
        {
            id: 1,
            fullName: 'Nguyễn Văn A',
            phone: '0901234567',
            address: '123 Đường ABC',
            ward: 'Phường 1',
            district: 'Quận 1',
            city: 'TP.HCM',
            isDefault: true
        },
        {
            id: 2,
            fullName: 'Nguyễn Văn A',
            phone: '0901234567',
            address: '456 Đường XYZ',
            ward: 'Phường 2',
            district: 'Quận 2',
            city: 'TP.HCM',
            isDefault: false
        }
    ]);

    const [selectedAddressId, setSelectedAddressId] = useState(
        savedAddresses.find(addr => addr.isDefault)?.id || null
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý đặt hàng
        console.log({ formData, paymentMethod, shippingMethod, orderItems });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <SlideGridWhenVisible direction="down">
                    <div className="text-center mb-8">
                        <button
                            onClick={() => navigate(-1)}
                            className="absolute left-8 top-8 flex items-center text-gray-600 hover:text-indigo-600 transition-colors"
                        >
                            <FaArrowLeft className="mr-2" /> Quay lại
                        </button>
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                            Thanh Toán Đơn Hàng
                        </h1>
                    </div>
                </SlideGridWhenVisible>

                {/* Thông tin bảo mật */}
                <SlideGridWhenVisible direction="up">
                    <div className="bg-blue-50 p-4 rounded-lg mb-8">
                        <div className="flex items-center justify-center space-x-8">
                            <div className="flex items-center">
                                <FaShieldAlt className="text-blue-600 mr-2" />
                                <span className="text-sm text-gray-600">Thanh toán bảo mật</span>
                            </div>
                            <div className="flex items-center">
                                <FaTruck className="text-blue-600 mr-2" />
                                <span className="text-sm text-gray-600">Giao hàng nhanh chóng</span>
                            </div>
                        </div>
                    </div>
                </SlideGridWhenVisible>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Form thông tin */}
                    <SlideGridWhenVisible direction="left">
                        <div className="space-y-6">
                            {/* Thông tin khách hàng */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                    Thông Tin Khách Hàng
                                </h2>
                                <form className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Họ và Tên *
                                            </label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Số Điện Thoại *
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                </form>
                            </div>

                            {/* Địa chỉ giao hàng */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        Địa Chỉ Giao Hàng
                                    </h2>
                                    {savedAddresses.length > 0 && (
                                        <button
                                            onClick={() => navigate('/account/addresses')}
                                            className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                                        >
                                            Quản lý địa chỉ
                                        </button>
                                    )}
                                </div>

                                {savedAddresses.length > 0 ? (
                                    <div className="space-y-4">
                                        {savedAddresses.map((address) => (
                                            <label
                                                key={address.id}
                                                className={`block p-4 border rounded-lg cursor-pointer transition-all
                                                    ${selectedAddressId === address.id
                                                        ? 'border-indigo-500 bg-indigo-50'
                                                        : 'hover:border-gray-400'
                                                    }`}
                                            >
                                                <div className="flex items-start">
                                                    <input
                                                        type="radio"
                                                        name="deliveryAddress"
                                                        value={address.id}
                                                        checked={selectedAddressId === address.id}
                                                        onChange={() => setSelectedAddressId(address.id)}
                                                        className="mt-1 h-4 w-4 text-indigo-600"
                                                    />
                                                    <div className="ml-4 flex-1">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-medium text-gray-800">
                                                                    {address.fullName}
                                                                </span>
                                                                <span className="text-gray-600">|</span>
                                                                <span className="text-gray-600">
                                                                    {address.phone}
                                                                </span>
                                                            </div>
                                                            {address.isDefault && (
                                                                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                                                                    Mặc định
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-gray-600 mt-1">
                                                            {address.address}, {address.ward}, {address.district}, {address.city}
                                                        </p>
                                                    </div>
                                                </div>
                                            </label>
                                        ))}

                                        <button
                                            onClick={() => navigate('/account/addresses/new')}
                                            className="w-full mt-4 p-4 border-2 border-dashed border-gray-300 rounded-lg
                                                text-gray-600 hover:text-indigo-600 hover:border-indigo-500
                                                flex items-center justify-center gap-2 transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                            </svg>
                                            Thêm địa chỉ mới
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <h3 className="mt-2 text-sm font-medium text-gray-900">
                                            Chưa có địa chỉ giao hàng
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Vui lòng thêm địa chỉ giao hàng để tiếp tục đặt hàng.
                                        </p>
                                        <div className="mt-6">
                                            <button
                                                onClick={() => navigate('/account/addresses/new')}
                                                className="inline-flex items-center px-4 py-2 border border-transparent 
                                                    shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 
                                                    hover:bg-indigo-700 focus:outline-none focus:ring-2 
                                                    focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                                </svg>
                                                Thêm địa chỉ mới
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </SlideGridWhenVisible>

                    {/* Đơn hàng và thanh toán */}
                    <SlideGridWhenVisible direction="right">
                        <div className="space-y-6">
                            {/* Chi tiết đơn hàng */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                    Chi Tiết Đơn Hàng
                                </h2>
                                <div className="space-y-4">
                                    {orderItems.map((item) => (
                                        <div key={item.id} className="flex gap-4 border-b pb-4">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-20 h-20 object-cover rounded-lg"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-medium text-gray-800">{item.name}</h3>
                                                <p className="text-sm text-gray-500">
                                                    Size: {item.size} | Màu: {item.color}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Số lượng: {item.quantity}
                                                </p>
                                                <p className="font-medium text-indigo-600">
                                                    {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Phương thức vận chuyển */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                    Phương Thức Vận Chuyển
                                </h2>
                                <div className="space-y-3">
                                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-indigo-500 transition-colors">
                                        <input
                                            type="radio"
                                            name="shipping"
                                            value="standard"
                                            checked={shippingMethod === 'standard'}
                                            onChange={(e) => setShippingMethod(e.target.value)}
                                            className="h-4 w-4 text-indigo-600"
                                        />
                                        <div className="ml-4">
                                            <p className="font-medium text-gray-800">Giao hàng tiêu chuẩn</p>
                                            <p className="text-sm text-gray-500">3-5 ngày - 30.000₫</p>
                                        </div>
                                    </label>
                                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-indigo-500 transition-colors">
                                        <input
                                            type="radio"
                                            name="shipping"
                                            value="express"
                                            checked={shippingMethod === 'express'}
                                            onChange={(e) => setShippingMethod(e.target.value)}
                                            className="h-4 w-4 text-indigo-600"
                                        />
                                        <div className="ml-4">
                                            <p className="font-medium text-gray-800">Giao hàng nhanh</p>
                                            <p className="text-sm text-gray-500">1-2 ngày - 50.000₫</p>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Phương thức thanh toán */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                    Phương Thức Thanh Toán
                                </h2>
                                <div className="space-y-3">
                                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-indigo-500 transition-colors">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="cod"
                                            checked={paymentMethod === 'cod'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="h-4 w-4 text-indigo-600"
                                        />
                                        <FaMoneyBillWave className="ml-4 text-gray-400" />
                                        <span className="ml-2 text-gray-700">Thanh toán khi nhận hàng (COD)</span>
                                    </label>
                                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-indigo-500 transition-colors">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="card"
                                            checked={paymentMethod === 'card'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="h-4 w-4 text-indigo-600"
                                        />
                                        <FaCreditCard className="ml-4 text-gray-400" />
                                        <span className="ml-2 text-gray-700">Thẻ tín dụng/ghi nợ</span>
                                    </label>
                                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-indigo-500 transition-colors">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="momo"
                                            checked={paymentMethod === 'momo'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="h-4 w-4 text-indigo-600"
                                        />
                                        <FaWallet className="ml-4 text-gray-400" />
                                        <span className="ml-2 text-gray-700">Ví MoMo</span>
                                    </label>
                                </div>
                            </div>

                            {/* Tổng cộng và nút thanh toán */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Tạm tính:</span>
                                        <span>{subtotal.toLocaleString('vi-VN')}₫</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Phí vận chuyển:</span>
                                        <span>{shippingCost.toLocaleString('vi-VN')}₫</span>
                                    </div>
                                    <div className="border-t pt-2 mt-2">
                                        <div className="flex justify-between text-lg font-semibold">
                                            <span>Tổng cộng:</span>
                                            <span className="text-indigo-600">{total.toLocaleString('vi-VN')}₫</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={handleSubmit}
                                    className="mt-6 w-full bg-indigo-600 text-white py-4 rounded-lg font-semibold 
                                    hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
                                >
                                    Đặt Hàng ({total.toLocaleString('vi-VN')}₫)
                                </button>
                            </div>
                        </div>
                    </SlideGridWhenVisible>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;