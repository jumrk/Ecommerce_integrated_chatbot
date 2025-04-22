import React, { useState, useEffect } from 'react';
import './checkoutPage.css';
import { FaMoneyBillWave, FaWallet, FaTruck, FaShieldAlt, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { SlideGridWhenVisible } from '../../../component/animation/SlideGridWhenVisible';
import { getAddressesAPI } from '../../../api/address/addressAPI';
import { getShippingConfig } from '../../../api/shippingCofig/shippingConfigService';
import { getCart } from '../../../api/cart/cartSevice';
import { getListVoucher } from '../../../api/voucher/voucherService';
import { useNearestShipper } from '../../../hooks/useNearestShipper';
import { createrOrder } from '../../../api/order/orderService';
import { getAllShippers } from '../../../api/shipper/shipperSevice';
import Notification from '../../../component/notification/Notification';
import Loading from '../../../component/loading/loading';
import CountdownTimer from '../../../component/CountdownTimer/CountdownTimer';
import { useCart } from '../../../context/cartContext';

const CheckoutPage = () => {
    const navigate = useNavigate();

    // State
    const [orderItems, setOrderItems] = useState([]);
    const [savedAddresses, setSavedAddresses] = useState([]);
    const [shippingConfig, setShippingConfig] = useState(null);
    const [loading, setLoading] = useState(true);
    const [vouchers, setVouchers] = useState([]);
    const [selectedVoucherId, setSelectedVoucherId] = useState(null);
    const [voucherMessage, setVoucherMessage] = useState('');
    const [shippingMethod, setShippingMethod] = useState('standard');
    const [notification, setNotification] = useState({})
    const [shipperAddress, setShipperAddress] = useState([])
    const [noteData, setNoteData] = useState({
        note: ''
    });
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const { shipperId, loadingShiper } = useNearestShipper(selectedAddressId);
    const { setCartCount } = useCart();
    // Tính toán số tiền giảm giá dựa trên voucher được chọn
    const calculateDiscount = () => {
        const selectedVoucher = vouchers.find(voucher => voucher._id === selectedVoucherId);
        if (!selectedVoucher) return 0;

        const currentDate = new Date();
        const isValid = currentDate >= new Date(selectedVoucher.startDate) && currentDate <= new Date(selectedVoucher.endDate);
        const isEligible = subtotal >= selectedVoucher.minSpend;
        const isUsable = selectedVoucher.usageCount < selectedVoucher.usageLimit;

        if (!isValid || !isEligible || !isUsable) return 0;

        if (selectedVoucher.type === 'percentage') {
            const discount = (subtotal * selectedVoucher.value) / 100;
            return Math.min(discount, selectedVoucher.maxDiscount);
        } else if (selectedVoucher.type === 'fixed') {
            return selectedVoucher.value;
        }
        return 0;
    };

    // Xử lý khi người dùng chọn voucher
    const handleVoucherChange = (voucher) => {
        const isEligible = subtotal >= voucher.minSpend;
        const isUsable = voucher.usageCount < voucher.usageLimit;
        const isAvailable = voucher.status === 'Đang diễn ra' && isEligible && isUsable;

        if (isAvailable) {
            setSelectedVoucherId(voucher._id);
            setVoucherMessage('');
        } else {
            setSelectedVoucherId(null);
            setVoucherMessage(
                voucher.status !== 'Đang diễn ra' ? 'Voucher không khả dụng' :
                    !isEligible ? 'Đơn hàng chưa đủ điều kiện áp dụng voucher' :
                        'Voucher đã hết lượt sử dụng'
            );
        }
    };

    // Định dạng số tiền thành chuỗi có dấu phân cách theo kiểu VN
    const formatCurrency = (value) => {
        return typeof value === 'number' && !isNaN(value)
            ? value.toLocaleString('vi-VN')
            : '0';
    };

    // Xử lý thay đổi input trong form ghi chú
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNoteData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Lấy dữ liệu từ API khi component được mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const addresses = await getAddressesAPI();
                setSavedAddresses(addresses.data || []);

                const cartData = await getCart();
                setOrderItems(cartData.cart || []);

                const shipperRes = await getAllShippers();
                const shippers = shipperRes.shippers.map(ship => ship.district + ' - ' + ship.province)
                setShipperAddress(shippers)
                const shipping = await getShippingConfig();
                setShippingConfig(shipping.methods);

                const voucherData = await getListVoucher();
                setVouchers(voucherData || []);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching checkout data:', error);
            }
        };
        fetchData();
    }, []);

    // Tự động chọn địa chỉ mặc định khi có danh sách địa chỉ
    useEffect(() => {
        if (savedAddresses.length > 0 && !selectedAddressId) {
            const defaultAddress = savedAddresses.find(addr => addr.isDefault);
            setSelectedAddressId(defaultAddress?.id || savedAddresses[0].id);
        }
    }, [savedAddresses]);

    const subtotal = orderItems.totalPrice || 0;
    const total = subtotal - (selectedVoucherId ? calculateDiscount() : 0);
    const discount = selectedVoucherId ? calculateDiscount() : 0;
    const shippingFee = shippingMethod === 'Nhận hàng tại shop' ? 0 : (total >= 500000 ? 0 : 30000);
    const finalTotal = total + shippingFee;
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            if (!selectedAddressId || !shippingMethod || !finalTotal || !paymentMethod) {
                setNotification({
                    isOpen: true,
                    message: "Vui lòng chọn hoặc nhập đầy đủ thông tin",
                    type: 'error'
                })
            }
            const orderData = {
                addressId: selectedAddressId,
                shippingMethod: shippingMethod,
                finalTotal: finalTotal,
                note: noteData.note,
                paymentMethod: paymentMethod,
                discount: discount,
                shippingFee: shippingFee,
                idVoucher: selectedVoucherId,
                shipper: shippingMethod === "Vận chuyển nội bộ" ? shipperId : null
            };
            const response = await createrOrder(orderData)
            if (response.success) {
                setLoading(false)
                if (response.paymentUrl) {
                    window.open(response.paymentUrl, '_blank', 'noopener,noreferrer');
                }
                setNotification({
                    isOpen: true,
                    message: response.message,
                    type: response.success ? 'success' : 'error'
                })
                setCartCount(0)
                setTimeout(() => {
                    navigate('/user/orders')
                }, 2000);

            } else {
                setLoading(false)
                setNotification({
                    isOpen: true,
                    message: response.message,
                    type: response.success ? 'success' : 'error'
                })
            }
        } catch (error) {
            setLoading(false)
            setNotification({
                isOpen: true,
                message: "Lỗi trong quá trình thanh toán!",
                type: 'error'
            })
        }

    };
    const closeNotification = () => {
        setNotification({
            isOpen: false
        })
    }

    if (loading) {
        return (
            <Loading />
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            {notification.isOpen && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                    onClose={closeNotification}
                />
            )}
            <div className="max-w-6xl mx-auto">
                <SlideGridWhenVisible direction="down">
                    <div className="text-center mb-8">
                        <button
                            onClick={() => navigate(-1)}
                            className="absolute flex items-center text-gray-600 hover:text-indigo-600 transition-colors"
                        >
                            <FaArrowLeft className="mr-2" /> Quay lại
                        </button>
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                            Thanh Toán Đơn Hàng
                        </h1>
                    </div>
                </SlideGridWhenVisible>

                <SlideGridWhenVisible direction="up">
                    <div className="bg-blue-50 p-4 rounded-lg mb-2">
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

                {shipperAddress && (
                    <SlideGridWhenVisible direction="up">
                        <div className="flex justify-center items-center w-full">
                            <div className="bg-blue-50 p-4 rounded-lg mb-8 w-full max-w-3xl">
                                <div className="infinite-scroll-container">
                                    <div className="infinite-scroll">
                                        {shipperAddress.map((address, index) => (
                                            <span key={index} className="text-sm text-gray-600 mx-4">
                                                {address}
                                            </span>
                                        ))}
                                        {/* Duplicate content for seamless infinite scroll */}
                                        {shipperAddress.map((address, index) => (
                                            <span key={`duplicate-${index}`} className="text-sm text-gray-600 mx-4">
                                                {address}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SlideGridWhenVisible>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <SlideGridWhenVisible direction="left">
                        <div className="space-y-6">


                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        Địa Chỉ Giao Hàng
                                    </h2>
                                    {savedAddresses.length > 0 && (
                                        <button
                                            onClick={() => navigate('/user/addresses')}
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
                                                key={address._id}
                                                className={`block p-4 border rounded-lg cursor-pointer transition-all
                    ${selectedAddressId === address._id
                                                        ? 'border-indigo-500 bg-indigo-50'
                                                        : 'hover:border-gray-400'
                                                    }`}
                                            >
                                                <div className="flex items-start">
                                                    <input
                                                        type="radio"
                                                        name="deliveryAddress"
                                                        value={address._id}
                                                        checked={selectedAddressId === address._id}
                                                        onChange={() => setSelectedAddressId(address._id)}
                                                        className="mt-1 h-4 w-4 text-indigo-600"
                                                    />
                                                    <div className="ml-4 flex-1">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-medium text-gray-800">{address.receiver}</span>
                                                                <span className="text-gray-600">|</span>
                                                                <span className="text-gray-600">{address.phone}</span>
                                                            </div>
                                                            {address.isDefault && (
                                                                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                                                                    Mặc định
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-gray-600 mt-1">
                                                            {address.address}, {address.ward}, {address.district}, {address.province}
                                                        </p>
                                                    </div>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <h3 className="mt-2 text-sm font-medium text-gray-900">
                                            Chưa có địa chỉ giao hàng
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Vui lòng thêm địa chỉ giao hàng để tiếp tục đặt hàng.
                                        </p>
                                        <button
                                            onClick={() => navigate('/user/addresses')}
                                            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent 
                text-sm font-medium rounded-md text-white bg-indigo-600 
                hover:bg-indigo-700"
                                        >
                                            <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                            </svg>
                                            Thêm địa chỉ mới
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                    Ghi chú đơn hàng
                                </h2>
                                <form className="space-y-4">
                                    <textarea
                                        type="text"
                                        name="note"
                                        value={noteData.note}
                                        onChange={handleInputChange}
                                        className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    />
                                </form>
                            </div>

                            <SlideGridWhenVisible direction="up">
                                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Chọn Voucher</h2>
                                    <div className="max-h-60 overflow-y-auto">
                                        {vouchers.map((voucher) => {
                                            const isEligible = subtotal >= voucher.minSpend;
                                            const isUsable = voucher.usageCount < voucher.usageLimit;
                                            const isAvailable = voucher.status === 'Đang diễn ra' && isEligible && isUsable;

                                            return (
                                                <label
                                                    key={voucher._id}
                                                    className={`flex items-center p-4 mt-3 border rounded-lg cursor-pointer
                                                        ${!isAvailable ? 'opacity-50 cursor-not-allowed' : 'hover:border-indigo-500 transition-colors'}`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="voucher"
                                                        value={voucher._id}
                                                        checked={selectedVoucherId === voucher._id}
                                                        onChange={() => handleVoucherChange(voucher)}
                                                        className="h-4 w-4 text-indigo-600"
                                                        disabled={!isAvailable}
                                                    />
                                                    <div className="ml-4 flex-1">
                                                        <div className="flex items-center justify-between">
                                                            <span className="font-medium text-gray-800">{voucher.code}</span>
                                                            <span className="text-sm text-gray-500">
                                                                {voucher.value} {voucher.type === 'percentage' ? '%' : 'đ'}
                                                            </span>
                                                        </div>
                                                        <p className="text-gray-600 mt-1">
                                                            {voucher.description}
                                                        </p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className={`text-sm ${voucher.status === 'Đang diễn ra' ? 'text-green-600' :
                                                                voucher.status === 'Chưa bắt đầu' ? 'text-yellow-600' :
                                                                    'text-red-600'
                                                                }`}>
                                                                {voucher.status}
                                                            </span>
                                                            {voucher.status === 'Đang diễn ra' && (
                                                                <CountdownTimer endDate={voucher.endDate} />
                                                            )}
                                                        </div>
                                                        {voucher.type === 'percentage' && voucher.maxDiscount && (
                                                            <p className="text-sm text-gray-500 mt-1">
                                                                Giảm tối đa: {formatCurrency(voucher.maxDiscount)}đ
                                                            </p>
                                                        )}
                                                        <p className="text-sm text-gray-500 mt-1">
                                                            Đơn tối thiểu: {formatCurrency(voucher.minSpend)}đ
                                                        </p>
                                                    </div>
                                                </label>
                                            );
                                        })}
                                    </div>
                                    {voucherMessage && (
                                        <p className="text-red-500 text-sm mt-2">{voucherMessage}</p>
                                    )}
                                </div>
                            </SlideGridWhenVisible>
                        </div>
                    </SlideGridWhenVisible>

                    <SlideGridWhenVisible direction="right">
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                    Chi Tiết Đơn Hàng
                                </h2>
                                <div className="space-y-4">
                                    {orderItems.items?.length > 0 ? (
                                        orderItems.items.map((item) => (
                                            <div key={item._id} className="flex gap-4 border-b pb-4">
                                                <img
                                                    src={import.meta.env.VITE_API_URL + item.productId.images[0]}
                                                    alt={item.name}
                                                    className="w-20 h-20 object-cover rounded-lg"
                                                />
                                                <div className="flex-1">
                                                    <h3 className="font-medium text-gray-800">{item.productId.name}</h3>
                                                    <p className="flex text-sm gap-1 text-gray-500">
                                                        Size: {item.size} | Màu: <span
                                                            className="inline-flex border items-center w-5 h-5 rounded-full"
                                                            style={{ backgroundColor: item.color }}
                                                        ></span>
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        Số lượng: {item.quantity}
                                                    </p>
                                                    <p className="font-medium text-indigo-600">
                                                        {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center text-gray-500">Giỏ hàng trống</p>
                                    )}
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                    Phương Thức Vận Chuyển
                                </h2>
                                {loadingShiper ? (
                                    <div className="h-auto flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                                            <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
                                        </div>
                                    </div>
                                ) : (
                                    shippingConfig?.map((elm) => {
                                        const isInternalShipping = elm.name === 'Vận chuyển nội bộ';
                                        const isShipperAvailable = isInternalShipping && shipperId;

                                        return (
                                            <div className="mt-3" key={elm._id}>
                                                <label
                                                    className={`flex items-center p-4 border rounded-lg cursor-pointer hover:border-indigo-500 transition-colors ${!isShipperAvailable && isInternalShipping ? 'opacity-50 pointer-events-none' : ''}`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="shipping"
                                                        value={elm.name}
                                                        onChange={(e) => setShippingMethod(e.target.value)}
                                                        className="h-4 w-4 text-indigo-600"
                                                        disabled={!isShipperAvailable && isInternalShipping}
                                                    />
                                                    <div className="ml-4">
                                                        <p className="font-medium text-gray-800">{elm.name}</p>
                                                        <p className="text-sm text-gray-500">{elm.description}</p>
                                                    </div>
                                                </label>
                                            </div>
                                        );
                                    })
                                )}
                            </div>

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
                                            value="vnpay"
                                            checked={paymentMethod === 'vnpay'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="h-4 w-4 text-indigo-600"
                                        />
                                        <FaWallet className="ml-4 text-gray-400" />
                                        <span className="ml-2 text-gray-700">Ví VNPAY</span>
                                    </label>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Tạm tính:</span>
                                        <span>{formatCurrency(subtotal)}₫</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Giảm giá:</span>
                                        <span>{formatCurrency(selectedVoucherId ? calculateDiscount() : 0)}₫</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Phí vận chuyển:</span>
                                        <span>{formatCurrency(shippingFee)}₫</span>
                                    </div>
                                    <div className="border-t pt-2 mt-2">
                                        <div className="flex justify-between text-lg font-semibold">
                                            <span>Tổng cộng:</span>
                                            <span className="text-indigo-600">{formatCurrency(finalTotal)}₫</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={handleSubmit}
                                    disabled={orderItems.items?.length === 0}
                                    className={`mt-6 w-full py-4 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg
                                        ${orderItems.items?.length === 0
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                                >
                                    Đặt Hàng ({formatCurrency(finalTotal)}₫)
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