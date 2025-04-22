import { Routes, Route } from 'react-router-dom';
import MainLayout from '../../layout/mainLayout';
import HomePage from '../../page/user/homePage/HomePage';
import AllProductsPage from '../../page/user/allProductPage/AllProductsPage';
import DiscountedProductsPage from '../../page/user/discountedProductPage/DiscountedProductsPage';
import FashionBlogPage from '../../page/user/blogPage/FashionBlogPage';
import BlogPostDetail from '../../page/user/blogPage/BlogPostDetail';
import CreateBlogPost from '../../page/user/blogPage/CreateBlogPost';
import AboutUsPage from '../../page/user/aboutUsPage/AboutUsPage';
import ContactPage from '../../page/user/contactPage/ContactPage';
import ProductDetailPage from '../../page/user/productDetailPage/ProductDetailPage';
import CartPage from '../../page/user/cartPage/CartPage';
import UserPage from '../../page/user/userPage/UserPage';
import UserInfo from '../../component/user/UserInfo';
import OrderList from '../../component/user/OrderList';
import AddressList from '../../component/user/AddressList';
import Favorites from '../../component/user/Favorites';
import LoginPage from '../../page/authPage/LoginPage';
import RegisterPage from '../../page/authPage/RegisterPage';
import ForgotPasswordPage from '../../page/authPage/ForgotPassPage';
import CheckoutPage from '../../page/user/checkoutPage/CheckoutPage';
import { AuthSuccess, LogoutSuccess, LoginAdmin } from '../../utils/AuthSuccess';
import BlogUser from '../../component/user/BlogUser';
const UserRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/directory/all-products" element={<AllProductsPage />} />
                <Route path="/directory/all-products/:categoryParam?" element={<AllProductsPage />} />
                <Route path="/directory/discounted-products" element={<DiscountedProductsPage />} />
                <Route path="/directory/product-detail/:id" element={<ProductDetailPage />} />
                <Route path="/directory/fashion-blog" element={<FashionBlogPage />} />
                <Route path="/directory/fashion-blog/:id" element={<BlogPostDetail />} />
                <Route path="/directory/fashion-blog/create" element={<CreateBlogPost />} />
                <Route path="/directory/about-us" element={<AboutUsPage />} />
                <Route path="/directory/contact" element={<ContactPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/user" element={<UserPage />}>
                    <Route path="info" element={<UserInfo />} />
                    <Route path="orders" element={<OrderList />} />
                    <Route path="addresses" element={<AddressList />} />
                    <Route path="blogUser" element={<BlogUser />} />
                    <Route path="favorites" element={<Favorites />} />
                </Route>
                <Route path="/checkout" element={<CheckoutPage />} />
            </Route>
            {/* Authentication Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path='/auth-success' element={<AuthSuccess />} />
            <Route path='/logout-success' element={<LogoutSuccess />} />
            <Route path='/loginAdmin' element={<LoginAdmin />} />

        </Routes>
    );
};

export default UserRoutes;
