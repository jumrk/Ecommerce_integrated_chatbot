import React, { useEffect, useState, useMemo } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';
import LoadingSpinner from '../../../component/common/LoadingSpinner';
import './productManagement.css';
import StatusBadge from '../../../component/condition/ConditionCustom';
import { getProducts } from '../../../api/productService';
import ButtonEdit from '../../../component/button/ButtonEdit';
import ButtonDelete from '../../../component/button/ButtonDelete';
import Pagination from '../../../component/pagination/Pagination';
import { Search } from '../../../utils/search/search';

const ProductListPage = () => {
    const [filterOpen, setFilterOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [originalProducts, setOriginalProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 10;

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

    // Lọc sản phẩm khi searchTerm thay đổi
    useEffect(() => {
        const filteredProducts = Search(originalProducts, searchTerm);
        setProducts(filteredProducts);
        setCurrentPage(1);
    }, [searchTerm, originalProducts]);

    // Tính toán sản phẩm cho trang hiện tại
    const currentProducts = useMemo(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return products.slice(indexOfFirstItem, indexOfLastItem);
    }, [products, currentPage]);


    const getTotalStock = (stock) => {
        return Object.values(stock).reduce((total, current) => total + current, 0);
    };



    const handleEdit = (id) => {
        console.log(`Editing product with id: ${id}`);
    };

    const handleDelete = (id) => {
        console.log(`Deleting product with id: ${id}`);
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

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
                    Quản Lý Sản Phẩm
                </h1>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all shadow-md">
                    + Thêm sản phẩm
                </button>
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

                {/* Filter Panel */}
                {filterOpen && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Danh mục</label>
                                <select className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm">
                                    <option>Tất cả danh mục</option>
                                    <option>Giày</option>
                                    <option>Quần áo</option>
                                    <option>Phụ kiện</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Khoảng giá</label>
                                <div className="flex items-center space-x-3">
                                    <input type="number" placeholder="Từ" className="w-full border border-gray-200 rounded-xl px-4 py-3 shadow-sm" />
                                    <span className="text-gray-500">-</span>
                                    <input type="number" placeholder="Đến" className="w-full border border-gray-200 rounded-xl px-4 py-3 shadow-sm" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Trạng thái</label>
                                <select className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm">
                                    <option>Tất cả</option>
                                    <option>Còn hàng</option>
                                    <option>Sắp hết</option>
                                    <option>Hết hàng</option>
                                </select>
                            </div>
                            <div className="flex items-end">
                                <button className="w-full bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-md">
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
                                <tr key={product._id} className="hover:bg-gray-50 transition-all duration-200">
                                    <td className="py-4 px-6 min-w-[250px]">
                                        <div className="flex items-center space-x-4">
                                            <img
                                                src={product.images[0]}
                                                alt={product.name}
                                                className="w-14 h-14 rounded-lg object-cover border border-gray-200 shadow-sm"
                                            />
                                            <span className="font-medium text-gray-900 line-clamp-2">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-gray-600">{product.category}</td>
                                    <td className="py-4 px-6 text-gray-900 font-semibold">{formatPrice(product.price)}</td>
                                    <td className="py-4 px-6 text-gray-600">{getTotalStock(product.stock)}</td>
                                    <td className="py-4 px-6">
                                        {product.status === 'Còn hàng' ? (
                                            <StatusBadge type="success" text="Còn hàng" />
                                        ) : product.status === 'Sắp hết' ? (
                                            <StatusBadge type="warning" text="Sắp hết" />
                                        ) : (
                                            <StatusBadge type="danger" text={product.status} />
                                        )}
                                    </td>
                                    <td className="py-4 px-6 text-gray-600">{product.sold || 0}</td>
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

                {/* Pagination */}
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