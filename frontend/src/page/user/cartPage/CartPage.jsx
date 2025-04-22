import React, { useEffect, useState } from 'react';
import { FaShoppingBag } from 'react-icons/fa';
import CardCart from '../../../component/card/CardCart';
import { SlideGridWhenVisible } from '../../../component/animation/SlideGridWhenVisible';
import { NavLink } from 'react-router-dom';
import { getToken } from '../../../utils/storage';
import { getCart, updateCart, deleteCart } from '../../../api/cart/cartSevice';
import Notification from '../../../component/notification/Notification';
import ConfirmDialog from '../../../component/common/ConfirmDialog';
import EmptyState from '../../../component/EmptyState/EmptyState';
import Loading from '../../../component/loading/loading';
import { Helmet } from 'react-helmet';
import { useCart } from '../../../context/cartContext';
const CartPage = () => {
    const token = getToken();
    const [cartItems, setCartItems] = useState({ items: [], totalPrice: 0 });
    const [loading, setLoading] = useState(true);
    const { setCartCount } = useCart()
    const [notification, setNotification] = useState({
        message: '',
        type: 'success',
        show: false
    });
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const cartData = await getCart();
                if (cartData && cartData.cart && Array.isArray(cartData.cart.items)) {
                    setCartItems(cartData.cart);
                } else {
                    setCartItems({ items: [], totalPrice: 0 });
                }
            } catch (error) {
                console.error("Lỗi khi lấy giỏ hàng:", error);
                setCartItems({ items: [], totalPrice: 0 });
            } finally {
                setLoading(false);
            }
        };

        if (token) fetchCart();
    }, [token]);

    const calculateTotalPrice = (items) => {
        return items.reduce((total, item) => {
            const discount = item.productId.discount > 1 ? item.productId.discount / 100 : item.productId.discount;
            const discountedPrice = item.productId.price * (1 - discount);
            return total + discountedPrice * item.quantity;
        }, 0);
    };

    const handleUpdateQuantity = async (id, newQuantity, oldQuantity) => {
        try {
            const response = await updateCart(id, newQuantity);

            if (!response.success) {
                setNotification({
                    message: response.message || 'Cập nhật số lượng thất bại ❌',
                    type: 'error',
                    show: true
                });
                setCartItems((prevCart) => {
                    const updatedItems = prevCart.items.map((item) =>
                        item._id === id
                            ? { ...item, quantity: oldQuantity }
                            : item
                    );
                    return {
                        ...prevCart,
                        items: updatedItems,
                        totalPrice: calculateTotalPrice(updatedItems),
                    };
                });

                return;
            }

            setCartItems((prevCart) => {
                const updatedItems = prevCart.items.map((item) =>
                    item._id === id ? { ...item, quantity: newQuantity } : item
                );
                return {
                    ...prevCart,
                    items: updatedItems,
                    totalPrice: calculateTotalPrice(updatedItems),
                };
            });
        } catch (error) {
            console.error("Lỗi khi cập nhật số lượng:", error);
            notify("Lỗi hệ thống", "error");
        }
    };

    const handleRemove = (id) => {
        setItemToDelete(id);
        setIsDialogOpen(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await deleteCart(itemToDelete);
            if (response.success) {
                setCartItems((prevCart) => ({
                    ...prevCart,
                    items: prevCart.items.filter((item) => item._id !== itemToDelete),
                    totalPrice: calculateTotalPrice(prevCart.items.filter((item) => item._id !== itemToDelete)),
                }));
                setCartCount(prev => prev - 1);
                setNotification({
                    message: 'Xóa sản phẩm thành công ✅',
                    type: 'success',
                    show: true,
                });
            } else {
                setNotification({
                    message: response.message || 'Xóa sản phẩm thất bại ❌',
                    type: 'error',
                    show: true,
                });
            }
        } catch (error) {
            console.error("Lỗi khi xóa sản phẩm:", error);
            setNotification({
                message: 'Lỗi hệ thống ❌',
                type: 'error',
                show: true,
            });
        } finally {
            setIsDialogOpen(false);
            setItemToDelete(null);
        }
    };

    const total = calculateTotalPrice(cartItems.items);
    if (loading) {
        return <Loading />
    }
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-6 sm:py-12">
            <Helmet>
                <title>Giỏ hàng</title>
            </Helmet>
            {notification.show && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification({ ...notification, show: false })}
                />
            )}

            <ConfirmDialog
                isOpen={isDialogOpen}
                title="Xác Nhận Xóa"
                message="Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?"
                onConfirm={confirmDelete}
                onClose={() => setIsDialogOpen(false)}
            />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <FaShoppingBag className="text-primary-600" />
                        Giỏ Hàng Của Bạn
                    </h2>
                    <span className="text-gray-600 font-medium">{cartItems.items.length} sản phẩm</span>
                </div>

                {!token ? (
                    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-12 text-center">
                        <FaShoppingBag className="mx-auto text-gray-300 text-4xl sm:text-6xl mb-4 sm:mb-6" />
                        <p className="text-gray-500 text-lg sm:text-xl mb-6 sm:mb-8">Bạn cần đăng nhập để xem giỏ hàng</p>
                        <NavLink to="/login">
                            <button className="bg-primary-600 text-white px-6 sm:px-8 py-3 rounded-xl hover:bg-primary-700 transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                                Đăng Nhập Ngay
                            </button>
                        </NavLink>
                    </div>
                ) : cartItems.items.length === 0 ? (
                    <EmptyState
                        image='empty-box.png'
                        subtitle='Giỏ hàng của bạn đang trống hãy tiếp tục mua hàng nào 🫶'
                        title='Giỏ hàng trống'
                    />
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                            {cartItems.items.map((item) => (
                                <SlideGridWhenVisible key={item._id} direction="up" delay={0.1}>
                                    <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 hover:shadow-lg transition duration-300">
                                        <CardCart
                                            id={item._id}
                                            productId={item.productId}
                                            color={item.color}
                                            size={item.size}
                                            quantity={item.quantity}
                                            onQuantityChange={handleUpdateQuantity}
                                            onRemove={handleRemove}
                                        />
                                    </div>
                                </SlideGridWhenVisible>
                            ))}
                        </div>

                        <SlideGridWhenVisible direction="up" delay={0.1}>
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 sticky top-8">
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">
                                        Tổng Đơn Hàng
                                    </h3>
                                    <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                                        <div className="flex justify-between text-gray-600">
                                            <span>Tạm tính</span>
                                            <span className="font-medium">{total.toLocaleString('vi-VN')}đ</span>
                                        </div>
                                    </div>
                                    <div className="border-t border-gray-100 pt-4 mb-4 sm:mb-6">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-gray-800 font-medium">Tổng cộng</span>
                                            <span className="text-xl sm:text-2xl font-bold text-primary-600">
                                                {total.toLocaleString('vi-VN')}đ
                                            </span>
                                        </div>
                                    </div>
                                    <NavLink to="/checkout">
                                        <button className="w-full bg-primary-600 text-white py-3 sm:py-4 rounded-xl font-bold hover:bg-primary-700 transition duration-300">
                                            Tiến Hành Thanh Toán
                                        </button>
                                    </NavLink>
                                </div>
                            </div>
                        </SlideGridWhenVisible>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;
