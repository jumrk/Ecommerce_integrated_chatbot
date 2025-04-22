import { Route, Routes } from 'react-router-dom';
import AdminLayout from '../../layout/adminLayout';
import AdminDashboard from '../../page/admin/dashboardPage/DashboardPage';
import ProductListPage from '../../page/admin/productManagementPage/ProductListPage';
import AddProductPage from '../../page/admin/productManagementPage/AddProductPage';
import CategoryListPage from '../../page/admin/categoryManagementPage/CategoryListPage';
import AddCategoryPage from '../../page/admin/categoryManagementPage/AddCategoryPage';
import OrderListPage from '../../page/admin/orderManagementPage/OrderListPage';
import OrderDetailPage from '../../page/admin/orderManagementPage/OrderDetailPage';
import OrderHistoryPage from '../../page/admin/orderManagementPage/OrderHistoryPage';
import CustomerListPage from '../../page/admin/customerManagementPage/CustomerListPage';
import CustomerDetailPage from '../../page/admin/customerManagementPage/CustomerDetailPage';
import CustomerRolesPage from '../../page/admin/customerManagementPage/CustomerRolesPage';
import MessageListPage from '../../page/admin/chatManagementPage/MessageListPage';
import VoucherListPage from '../../page/admin/voucherManagemenPage/VoucherListPage';
import AddVoucherPage from '../../page/admin/voucherManagemenPage/AddVoucherPage';
import BlogListPage from '../../page/admin/blogManagementPage/BlogListPage';
import BlogDetailPage from '../../page/admin/blogManagementPage/BlogDetail';
import AddBlogPage from '../../page/admin/blogManagementPage/AddBlogPage';
import BlogCategoryPage from '../../page/admin/blogManagementPage/BlogCategoryPage';
import ShipperManagementPage from '../../page/admin/shippingManagementPage/ShipperManagementPage';
import ShippingConfigPage from '../../page/admin/shippingManagementPage/ShippingConfigPage';
import MessageDetails from '../../page/admin/chatManagementPage/MessageDetails';
import AdminProductDetailPage from '../../page/admin/productManagementPage/AdminProductDetailPage';

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />

                {/* product management */}
                <Route path="products">
                    <Route path="list-product" element={<ProductListPage />} />
                    <Route path='product-detail/:id' element={<AdminProductDetailPage />} />
                    <Route path="add-product" element={<AddProductPage />} />
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
                    <Route path='chat/:id' element={<MessageDetails />} />
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
                    <Route path='categories' element={<BlogCategoryPage />} />
                </Route>

                {/* shipping management */}
                <Route path='shipping' >
                    <Route path='shipper-management' element={<ShipperManagementPage />} />
                    <Route path='shipping-config' element={<ShippingConfigPage />} />
                </Route>


            </Route>
        </Routes>
    )
}

export default AdminRoutes;
