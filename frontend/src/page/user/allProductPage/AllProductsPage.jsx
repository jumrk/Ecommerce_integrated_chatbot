import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CardProduct from '../../../component/card/CardProduct';
import ProductFilterSidebar from '../../../component/Sidebar/ProductFilterSidebar';
import { ButtonOrange } from '../../../component/button/Button';
import products from '../../../data/Product';
import { ScaleUpWhenVisible } from '../../../component/animation/ScaleUpWhenVisible';
const AllProductsPage = () => {
    const { categoryParam: urlCategory } = useParams();
    const [filters, setFilters] = useState({
        category: '',
        price: { min: 0, max: 1000000 },
        color: [],
        size: [],
        mobileOpen: false,
    });


    const [visibleProducts, setVisibleProducts] = useState(8);

    useEffect(() => {
        if (urlCategory) {
            const normalizedCategory = urlCategory
                .toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            setFilters((prev) => ({
                ...prev,
                category: normalizedCategory,
            }));
        } else {
            setFilters((prev) => ({
                ...prev,
                category: '',
            }));
        }
    }, [urlCategory]);

    const filteredProducts = products.filter((product) => {
        const matchesCategory = !filters.category || product.category === filters.category;
        const matchesPrice = product.price >= filters.price.min && product.price <= filters.price.max;
        const matchesColor = filters.color.length === 0 || filters.color.includes(product.color);
        const matchesSize = filters.size.length === 0 || filters.size.includes(product.size);

        return matchesCategory && matchesPrice && matchesColor && matchesSize;
    });

    const loadMoreProducts = () => {
        setVisibleProducts((prev) => prev + 8);
    };
    const toggleMobileMenu = () => {
        setFilters((prev) => ({ ...prev, mobileOpen: !prev.mobileOpen }));
    };
    const currentProducts = filteredProducts.slice(0, visibleProducts);

    const handleFilterChange = (newFilters) => {
        setFilters(prev => ({
            ...prev,
            ...newFilters,
            mobileOpen: prev.mobileOpen
        }));
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="hidden md:block w-64 bg-white shadow-lg rounded-r-lg sticky top-16 h-[calc(100vh-64px)]">
                <ProductFilterSidebar onFilterChange={handleFilterChange} initialCategory={filters.category} />
            </div>

            {!filters.mobileOpen && (
                <button
                    className="md:hidden fixed top-20 left-4 z-30 bg-gray-800 text-white p-2 
                    rounded-full shadow-lg hover:bg-gray-700 transition-all duration-300"
                    onClick={toggleMobileMenu}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            )}
            <div
                className={`fixed inset-y-16 z-20 left-0 w-64 bg-white shadow-lg transform transition-all duration-300 ease-in-out ${filters.mobileOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <ProductFilterSidebar onFilterChange={handleFilterChange} initialCategory={filters.category} />
                <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition-all duration-300"
                    onClick={() => setFilters((prev) => ({ ...prev, mobileOpen: false }))}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="flex-1 max-w-7xl mx-auto p-4">
                <div className="text-center mb-8">
                    <ScaleUpWhenVisible delay={0.2}>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                            {filters.category ? `${filters.category.toUpperCase()} SẢN PHẨM` : 'TẤT CẢ SẢN PHẨM'}
                        </h1>
                    </ScaleUpWhenVisible>
                    <ScaleUpWhenVisible delay={0.3}>
                        <p className="text-gray-600 mt-2">Khám phá bộ sưu tập thời trang đa dạng của chúng tôi!</p>
                    </ScaleUpWhenVisible>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {currentProducts.map((product) => (
                        <CardProduct key={product.id} {...product} />
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center text-gray-600 mt-8">
                        Không tìm thấy sản phẩm nào phù hợp.
                    </div>
                )}

                {visibleProducts < filteredProducts.length && (
                    <div className="text-center mt-8">
                        <ButtonOrange onClick={loadMoreProducts} text="Xem thêm" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllProductsPage;