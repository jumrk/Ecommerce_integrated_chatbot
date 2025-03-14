import React, { useState } from 'react';
import { FiSearch, FiFilter, FiEdit2, FiTrash2 } from 'react-icons/fi';
import LoadingSpinner from '../../../component/common/LoadingSpinner';
import './productManagement.css';

const ProductListPage = () => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [filterOpen, setFilterOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const products = [
        {
            id: 1,
            image: "https://via.placeholder.com/50",
            name: "Nike Air Max 270",
            category: "Giày",
            price: 2990000,
            stock: 89,
            status: "Còn hàng",
            sales: 250
        },
        {
            id: 2,
            image: "https://via.placeholder.com/50",
            name: "Adidas Ultraboost",
            category: "Giày",
            price: 3500000,
            stock: 45,
            status: "Còn hàng",
            sales: 180
        },
        {
            id: 3,
            image: "https://via.placeholder.com/50",
            name: "T-shirt Cotton",
            category: "Quần áo",
            price: 250000,
            stock: 10,
            status: "Sắp hết",
            sales: 300
        },
    ];

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedProducts(products.map(p => p.id));
        } else {
            setSelectedProducts([]);
        }
    };

    const handleSelectProduct = (productId) => {
        setSelectedProducts(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
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

                    <select className="w-full lg:w-auto border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 shadow-sm">
                        <option>Mới nhất</option>
                        <option>Cũ nhất</option>
                        <option>Giá: Thấp đến cao</option>
                        <option>Giá: Cao đến thấp</option>
                    </select>
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
                                <th className="sticky left-0 bg-gray-100 py-4 px-6 text-left font-semibold">
                                    <input
                                        type="checkbox"
                                        onChange={handleSelectAll}
                                        checked={selectedProducts.length === products.length}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                </th>
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
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50 transition-all duration-200">
                                    <td className="sticky left-0 bg-white py-4 px-6">
                                        <input
                                            type="checkbox"
                                            checked={selectedProducts.includes(product.id)}
                                            onChange={() => handleSelectProduct(product.id)}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                    </td>
                                    <td className="py-4 px-6 min-w-[250px]">
                                        <div className="flex items-center space-x-4">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-14 h-14 rounded-lg object-cover border border-gray-200 shadow-sm"
                                            />
                                            <span className="font-medium text-gray-900 line-clamp-2">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-gray-600">{product.category}</td>
                                    <td className="py-4 px-6 text-gray-900 font-semibold">{formatPrice(product.price)}</td>
                                    <td className="py-4 px-6 text-gray-600">{product.stock}</td>
                                    <td className="py-4 px-6">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                                            ${product.status === 'Còn hàng' ? 'bg-green-100 text-green-800' :
                                                product.status === 'Sắp hết' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'}`}>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-gray-600">{product.sales}</td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center space-x-4">
                                            <button
                                                onClick={() => handleEdit(product.id)}
                                                className="p-2 bg-blue-100 rounded-full text-blue-600 hover:bg-blue-200 transition-colors"
                                            >
                                                <FiEdit2 className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="p-2 bg-red-100 rounded-full text-red-600 hover:bg-red-200 transition-colors"
                                            >
                                                <FiTrash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 border-t bg-gray-50">
                    <span className="text-sm text-gray-600 mb-4 md:mb-0">
                        Hiển thị <span className="font-semibold">1</span> đến <span className="font-semibold">{products.length}</span> trong số{' '}
                        <span className="font-semibold">{products.length}</span> kết quả
                    </span>
                    <div className="flex items-center space-x-2">
                        <button className="px-4 py-2 border rounded-xl text-gray-600 hover:bg-gray-100 transition-colors">
                            Trước
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                            1
                        </button>
                        <button className="px-4 py-2 border rounded-xl text-gray-600 hover:bg-gray-100 transition-colors">
                            2
                        </button>
                        <button className="px-4 py-2 border rounded-xl text-gray-600 hover:bg-gray-100 transition-colors">
                            Sau
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductListPage; 