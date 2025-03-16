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
            </Route>
        </Routes>
    )
}

export default AdminRoutes;
