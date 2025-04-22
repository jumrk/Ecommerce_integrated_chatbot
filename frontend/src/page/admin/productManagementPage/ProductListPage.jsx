import React, { useEffect, useState, useMemo } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';
import Loading from '../../../component/loading/loading';
import './productManagement.css';
import StatusBadge from '../../../component/condition/ConditionCustom';
import { getProducts, deleteProduct, updateProduct } from '../../../api/product/productService';
import { getCategories } from '../../../api/category/categoryProduct';
import ButtonEdit from '../../../component/button/ButtonEdit';
import ButtonDelete from '../../../component/button/ButtonDelete';
import Pagination from '../../../component/pagination/Pagination';
import { Search } from '../../../utils/search/search';
import ConfirmDialog from '../../../component/common/ConfirmDialog';
import Notification from '../../../component/notification/Notification';
import EditProductModal from '../../../component/admin/productManagement/EditProductModal';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const ProductListPage = () => {
    const [filterOpen, setFilterOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [originalProducts, setOriginalProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 10;
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [onConfirmAction, setOnConfirmAction] = useState(null);
    const [notification, setNotification] = useState(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [selectedStatus, setSelectedStatus] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const fetchedProducts = await getProducts();
                setOriginalProducts(fetchedProducts);
                setProducts(fetchedProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
                setNotification({
                    type: 'error',
                    message: 'Không thể tải danh sách danh mục'
                });
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        let filteredProducts = [...originalProducts];

        // Lọc theo search term
        if (searchTerm) {
            filteredProducts = Search(filteredProducts, searchTerm);
        }

        // Lọc theo danh mục
        if (selectedCategory) {
            filteredProducts = filteredProducts.filter(
                product => product.category?._id === selectedCategory
            );
        }

        // Lọc theo khoảng giá
        if (priceRange.min !== '' || priceRange.max !== '') {
            filteredProducts = filteredProducts.filter(product => {
                const price = Number(product.price);
                const min = priceRange.min === '' ? Number.MIN_SAFE_INTEGER : Number(priceRange.min);
                const max = priceRange.max === '' ? Number.MAX_SAFE_INTEGER : Number(priceRange.max);
                return price >= min && price <= max;
            });
        }

        // Lọc theo trạng thái
        if (selectedStatus) {
            filteredProducts = filteredProducts.filter(
                product => product.status === selectedStatus
            );
        }

        setProducts(filteredProducts);
        setCurrentPage(1);
    }, [searchTerm, selectedCategory, priceRange, selectedStatus, originalProducts]);

    const currentProducts = useMemo(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return products.slice(indexOfFirstItem, indexOfLastItem);
    }, [products, currentPage]);

    const getTotalStock = (stock) => {
        return Object.values(stock).reduce((total, current) => total + current, 0);
    };

    // Hàm tính trạng thái dựa trên stock
    const getStatus = (stock) => {
        const totalStock = getTotalStock(stock);
        if (totalStock === 0) return 'Hết hàng';
        if (totalStock <= 5) return 'Sắp hết';
        return 'Còn hàng';
    };

    const handleEdit = (id) => {
        const productToEdit = products.find((product) => product._id === id);
        setSelectedProduct(productToEdit);
        setIsEditOpen(true);
    };

    const handleViewDetail = (id) => {
        navigate(`/admin/products/product-detail/${id}`);
    };

    const handleSave = async (updatedProduct) => {
        try {
            setLoading(true);
            const response = await updateProduct(updatedProduct._id, updatedProduct);

            if (!response.success) {
                throw new Error(response.message || 'Cập nhật thất bại');
            }

            const updatedProductWithStatus = {
                ...response.product,
                status: getStatus(response.product.stock)
            };

            // Cập nhật cả hai state với sản phẩm mới
            setProducts(prevProducts =>
                prevProducts.map(product =>
                    product._id === updatedProduct._id ? updatedProductWithStatus : product
                )
            );

            setOriginalProducts(prevProducts =>
                prevProducts.map(product =>
                    product._id === updatedProduct._id ? updatedProductWithStatus : product
                )
            );

            setNotification({
                message: 'Cập nhật sản phẩm thành công!',
                type: 'success'
            });
        } catch (error) {
            console.error('Lỗi cập nhật:', error);
            setNotification({
                message: error.message || 'Đã xảy ra lỗi khi cập nhật sản phẩm.',
                type: 'error'
            });
        } finally {
            setLoading(false);
            setIsEditOpen(false);
        }
    };

    const handleDelete = (id) => {
        setIsConfirmOpen(true);
        setOnConfirmAction(() => async () => {
            try {
                setLoading(true);
                const response = await deleteProduct(id);
                if (response) {
                    setProducts(products.filter((product) => product._id !== id));
                    setOriginalProducts(originalProducts.filter((product) => product._id !== id));
                    setNotification({
                        message: response.message,
                        type: !response.success ? 'error' : 'success',
                    });
                }
            } catch (error) {
                setNotification({
                    message: 'Đã xảy ra lỗi khi xóa sản phẩm. Vui lòng thử lại.',
                    type: 'error',
                });
            } finally {
                setLoading(false);
                setIsConfirmOpen(false);
            }
        });
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handlePriceChange = (type, value) => {
        setPriceRange(prev => ({
            ...prev,
            [type]: value
        }));
    };

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    const resetFilters = () => {
        setSelectedCategory('');
        setPriceRange({ min: '', max: '' });
        setSelectedStatus('');
        setSearchTerm('');
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
            <Helmet>
                <title>Danh sách sản phẩm</title>
            </Helmet>
            <ConfirmDialog
                isOpen={isConfirmOpen}
                title={"Xóa sản phẩm ❗"}
                message={"Bạn có muốn xóa sản phẩm này không ?"}
                onConfirm={() => {
                    setIsConfirmOpen(false);
                    if (onConfirmAction) onConfirmAction();
                }}
                onClose={() => setIsConfirmOpen(false)}
            />
            {notification && (
                <Notification
                    onClose={() => setNotification(null)}
                    type={notification.type}
                    message={notification.message}
                />
            )}
            <EditProductModal
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                product={selectedProduct}
                onSave={handleSave}
            />
            {/* Header Section */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
                    Quản Lý Sản Phẩm
                </h1>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div className="flex items-center space-x-4 w-full lg:w-2/3">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Tìm kiếm sản phẩm..."
                                value={searchTerm}
                                onChange={handleSearch}
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                            />
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
                        </div>
                        <button
                            onClick={() => setFilterOpen(!filterOpen)}
                            className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors shadow-sm"
                        >
                            <FiFilter className="text-gray-700 text-xl" />
                        </button>
                    </div>
                </div>

                {filterOpen && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Danh mục
                                </label>
                                <select
                                    value={selectedCategory}
                                    onChange={handleCategoryChange}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                                >
                                    <option value="">Tất cả danh mục</option>
                                    {categories.map((category) => (
                                        <option key={category._id} value={category._id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Khoảng giá
                                </label>
                                <div className="flex items-center space-x-3">
                                    <input
                                        type="number"
                                        placeholder="Từ"
                                        value={priceRange.min}
                                        onChange={(e) => handlePriceChange('min', e.target.value)}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 shadow-sm"
                                    />
                                    <span className="text-gray-500">-</span>
                                    <input
                                        type="number"
                                        placeholder="Đến"
                                        value={priceRange.max}
                                        onChange={(e) => handlePriceChange('max', e.target.value)}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 shadow-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Trạng thái
                                </label>
                                <select
                                    value={selectedStatus}
                                    onChange={handleStatusChange}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                                >
                                    <option value="">Tất cả</option>
                                    <option value="Còn hàng">Còn hàng</option>
                                    <option value="Sắp hết">Sắp hết</option>
                                    <option value="Hết hàng">Hết hàng</option>
                                </select>
                            </div>
                            <div className="flex items-end space-x-3">
                                <button
                                    onClick={resetFilters}
                                    className="w-1/3 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors shadow-md"
                                >
                                    Đặt lại
                                </button>
                                <button
                                    onClick={() => setFilterOpen(false)}
                                    className="w-2/3 bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-md"
                                >
                                    Áp dụng bộ lọc
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="custom-scrollbar overflow-x-auto">
                    <table className="w-full min-w-[900px]">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="py-4 px-6 text-left font-semibold">Sản phẩm</th>
                                <th className="py-4 px-6 text-left font-semibold">Danh mục</th>
                                <th className="py-4 px-6 text-left font-semibold">Giá</th>
                                <th className="py-4 px-6 text-left font-semibold">Kho</th>
                                <th className="py-4 px-6 text-left font-semibold">Trạng thái</th>
                                <th className="py-4 px-6 text-left font-semibold">Đã bán</th>
                                <th className="py-4 px-6 text-left font-semibold">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {currentProducts.map((product) => (
                                <tr key={product._id} className="hover:bg-gray-50 transition-all duration-200" >
                                    <td className="py-4 px-6 min-w-[250px]">
                                        <div className="flex items-center space-x-4">
                                            <img
                                                src={`http://localhost:5000/${product.images[0]}`}
                                                alt={product.name}
                                                className="w-14 h-14 rounded-lg object-cover border border-gray-200 shadow-sm flex-shrink-0"
                                            />
                                            <span onClick={() => handleViewDetail(product._id)} className="font-medium cursor-pointer text-gray-900 truncate max-w-[180px]" title={product.name}>
                                                {product.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6  text-gray-600">{product.category?.name}</td>
                                    <td className="py-4 px-6 text-gray-900 font-semibold">{formatPrice(product.price)}</td>
                                    <td className="py-4 px-6 text-gray-600">{getTotalStock(product.stock)}</td>
                                    <td className="py-4 px-6">
                                        {product.status === 'Còn hàng' ? (
                                            <StatusBadge type="success" text="Còn hàng" />
                                        ) : product.status === 'Sắp hết' ? (
                                            <StatusBadge type="warning" text="Sắp hết" />
                                        ) : (
                                            <StatusBadge type="danger" text={product.status || 'Hết hàng'} />
                                        )}
                                    </td>
                                    <td className="py-4 px-6 text-gray-600">{product.sold}</td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center space-x-4">
                                            <ButtonEdit onClick={() => handleEdit(product._id)} />
                                            <ButtonDelete onClick={() => handleDelete(product._id)} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalItems={products.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default ProductListPage;