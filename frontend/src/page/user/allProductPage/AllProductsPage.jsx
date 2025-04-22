import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import CardProduct from '../../../component/card/CardProduct';
import ProductFilterSidebar from '../../../component/Sidebar/ProductFilterSidebar';
import { ButtonOrange } from '../../../component/button/Button';
import { ScaleUpWhenVisible } from '../../../component/animation/ScaleUpWhenVisible';
import { getProducts } from '../../../api/product/productService';
import Loading from '../../../component/loading/loading';
const AllProductsPage = () => {
    const { categoryParam: urlCategory } = useParams();
    const [filters, setFilters] = useState({
        category: '',
        price: { min: 0, max: 1000000 },
        color: [],
        size: [],
        mobileOpen: false,
    });

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleProducts, setVisibleProducts] = useState(8);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Cập nhật filters.category từ urlCategory
                if (urlCategory) {
                    const normalizedCategory = urlCategory
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

                // Sau khi cập nhật filters.category, gọi API lấy sản phẩm
                const data = await getProducts();
                const products = data.filter(product => product.category.status)
                setProducts(products);
            } catch (error) {
                setError(error);
                console.error("Lỗi khi lấy sản phẩm:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [urlCategory]);

    const handleFilterChange = useCallback((newFilters) => {
        setFilters(prev => ({
            ...prev,
            ...newFilters,
            mobileOpen: prev.mobileOpen
        }));
    }, []);

    const availableColors = useMemo(() => {
        const colors = new Set();
        products.forEach(product => {
            product.colors.forEach(color => {
                colors.add(color.value);
            });
        });
        return Array.from(colors);
    }, [products]);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesCategory = !filters.category || product.category.name === filters.category;
            const matchesPrice = product.price >= filters.price.min && product.price <= filters.price.max;
            const matchesColor = filters.color.length === 0 || product.colors.some(color => filters.color.includes(color.value));
            const matchesSize = filters.size.length === 0 || product.sizes.some(size => filters.size.includes(size));
            return matchesCategory && matchesPrice && matchesColor && matchesSize;
        });
    }, [products, filters]);

    const loadMoreProducts = () => {
        setVisibleProducts((prev) => prev + 8);
    };

    const toggleMobileMenu = () => {
        setFilters((prev) => ({ ...prev, mobileOpen: !prev.mobileOpen }));
    };

    const currentProducts = filteredProducts.slice(0, visibleProducts);

    const renderProducts = () => {
        if (error) {
            return <p className="text-center text-red-500">Lỗi khi tải sản phẩm: {error.message}</p>;
        }

        return currentProducts.map((product) => (
            <CardProduct key={product._id} {...product} images={product.images} />
        ));
    };

    if (loading) {
        return <Loading />
    }
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Helmet>
                <title>{urlCategory ? urlCategory : 'Tất cả sản phẩm'}</title>
            </Helmet>
            <div className="hidden md:block w-64 bg-white shadow-lg rounded-r-lg sticky top-16 h-[calc(100vh-64px)]">
                <ProductFilterSidebar
                    onFilterChange={handleFilterChange}
                    initialCategory={filters.category}
                    availableColors={availableColors}
                />
            </div>

            <div>
                {!filters.mobileOpen && (
                    <button
                        className="md:hidden fixed top-20 left-4 z-30 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition-all duration-300"
                        onClick={toggleMobileMenu}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                )}
                {filters.mobileOpen && (
                    <div className="fixed inset-0 z-10 bg-black bg-opacity-50" onClick={toggleMobileMenu} />
                )}
            </div>

            <div
                className={`fixed inset-y-16 z-20 left-0 w-64 bg-white shadow-lg transform transition-all duration-300 ease-in-out ${filters.mobileOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <ProductFilterSidebar
                    onFilterChange={handleFilterChange}
                    initialCategory={filters.category}
                    availableColors={availableColors}
                />
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
                    {renderProducts()}
                </div>

                {filteredProducts.length === 0 && !loading && (
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
