import { Route, Routes } from 'react-router-dom';
import AdminLayout from '../../layout/adminLayout';
import AdminDashboard from '../../page/admin/dashboardPage/DashboardPage';
import ProductListPage from '../../page/admin/productManagementPage/ProductListPage';
import AddProductPage from '../../page/admin/productManagementPage/AddProductPage';
import ReviewManagementPage from '../../page/admin/productManagementPage/ReviewManagementPage';
import CategoryListPage from '../../page/admin/categoryManagementPage/CategoryListPage';
import AddCategoryPage from '../../page/admin/categoryManagementPage/AddCategoryPage';
import OrderListPage from '../../page/admin/orderManagementPage/OrderListPage';
import OrderDetailPage from '../../page/admin/orderManagementPage/OrderDetailPage';
import OrderActivityLog from '../../component/admin/orderManagement/OrderActivityLog';
import OrderHistoryPage from '../../page/admin/orderManagementPage/OrderHistoryPage';
import CustomerListPage from '../../page/admin/customerManagementPage/CustomerListPage';
import CustomerDetailPage from '../../page/admin/customerManagementPage/CustomerDetailPage';
import CustomerChatPage from '../../page/admin/customerManagementPage/CustomerChatPage';
import CustomerRolesPage from '../../page/admin/customerManagementPage/CustomerRolesPage';
import MessageListPage from '../../page/admin/chatManagementPage/MessageListPage';
import ChatbotPage from '../../page/admin/chatManagementPage/ChatbotPage';
import VoucherListPage from '../../page/admin/voucherManagemenPage/VoucherListPage';
import AddVoucherPage from '../../page/admin/voucherManagemenPage/AddVoucherPage';
import BlogListPage from '../../page/admin/blogManagementPage/BlogListPage';
import BlogDetailPage from '../../page/admin/blogManagementPage/BlogDetail';
import AddBlogPage from '../../page/admin/blogManagementPage/AddBlogPage';
import BlogCommentsPage from '../../page/admin/blogManagementPage/BlogCommentsPage';
import BlogCategoryPage from '../../page/admin/blogManagementPage/BlogCategoryPage';
import PaymentMethodDashboardPage from '../../page/admin/paymentMethodManagementPage/DashboardPage';
import TransactionListPage from '../../page/admin/paymentMethodManagementPage/TransactionListPage';
import RefundPage from '../../page/admin/paymentMethodManagementPage/RefundPage';
import PaymentMethodConfigPage from '../../page/admin/paymentMethodManagementPage/PaymentMethodConfigPage';
import ActivityLogPage from '../../page/admin/paymentMethodManagementPage/ActivityLogPage';
import ShippingListPage from '../../page/admin/shippingManagementPage/ShippingListPage';
import ShipperManagementPage from '../../page/admin/shippingManagementPage/ShipperManagementPage';
import ShippingConfigPage from '../../page/admin/shippingManagementPage/ShippingConfigPage';
import ShippingHistoryPage from '../../page/admin/shippingManagementPage/ShippingHistoryPage';

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />

                {/* product management */}
                <Route path="products">
                    <Route path="list-product" element={<ProductListPage />} />
                    <Route path="add-product" element={<AddProductPage />} />
                    <Route path="reviews" element={<ReviewManagementPage />} />
                </Route>

                {/* category management */}
                <Route path="categories">
                    <Route path="list-category" element={<CategoryListPage />} />
                    <Route path="add-category" element={<AddCategoryPage />} />
                </Route>

                {/* order management */}
                <Route path="orders">
                    <Route path="list-order" element={<OrderListPage />} />
                    <Route path="order-detail/:id" element={<OrderDetailPage />} />
                    <Route path="order-activity-log/:id" element={<OrderActivityLog />} />
                    <Route path="order-history" element={<OrderHistoryPage />} />
                </Route>

                {/* customer management */}
                <Route path='customer' >
                    <Route path='list-customer' element={<CustomerListPage />} />
                    <Route path='detail-customer/:id' element={<CustomerDetailPage />} />
                    <Route path='roles-customer' element={<CustomerRolesPage />} />
                </Route>

                {/* chat management */}
                <Route path='messages' >
                    <Route path='list-message' element={<MessageListPage />} />
                    <Route path='chat/:id' element={<CustomerChatPage />} />
                    <Route path='chatbot' element={<ChatbotPage />} />
                </Route>

                {/* voucher management */}
                <Route path='vouchers' >
                    <Route path='list-voucher' element={<VoucherListPage />} />
                    <Route path='add-voucher' element={<AddVoucherPage />} />
                </Route>

                {/* blog management */}
                <Route path='blogs' >
                    <Route path='list-blog' element={<BlogListPage />} />
                    <Route path='blog-detail/:id' element={<BlogDetailPage />} />
                    <Route path='add-blog' element={<AddBlogPage />} />
                    <Route path='comments' element={<BlogCommentsPage />} />
                    <Route path='categories' element={<BlogCategoryPage />} />
                </Route>

                {/* payment method management */}
                <Route path='payment' >
                    <Route path='dashboard' element={<PaymentMethodDashboardPage />} />
                    <Route path='transaction-list' element={<TransactionListPage />} />
                    <Route path='refund' element={<RefundPage />} />
                    <Route path='config' element={<PaymentMethodConfigPage />} />
                    <Route path='activity-log' element={<ActivityLogPage />} />
                </Route>

                {/* shipping management */}
                <Route path='shipping' >
                    <Route path='list-shipping' element={<ShippingListPage />} />
                    <Route path='shipper-management' element={<ShipperManagementPage />} />
                    <Route path='shipping-config' element={<ShippingConfigPage />} />
                    <Route path='shipping-history' element={<ShippingHistoryPage />} />
                </Route>


            </Route>
        </Routes>
    )
}

export default AdminRoutes;
