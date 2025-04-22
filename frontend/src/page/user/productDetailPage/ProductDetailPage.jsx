import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/outline';
import ProductImages from '../../../component/productDetail/ProductImages';
import ProductInfo from '../../../component/productDetail/ProductInfo';
import ProductSpecifications from '../../../component/productDetail/ProductSpecifications';
import ProductReviews from '../../../component/productDetail/ProductReviews';
import ProductSuggestions from '../../../component/productDetail/ProductSuggestions';
import Notification from '../../../component/notification/Notification';
import { createCart } from '../../../api/cart/cartSevice';
import { getProductById, getProducts } from '../../../api/product/productService';
import { getProductReviews } from '../../../api/product/productReview';
import { checkFavorite, addToFavorites, removeFromFavorites } from '../../../api/favorite/favoriteService';
import { getToken } from '../../../utils/storage';
import Loading from '../../../component/loading/loading';
import { Helmet } from 'react-helmet';
import { useCart } from '../../../context/cartContext';
const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [favoriteLoading, setFavoriteLoading] = useState(false);
    const [statistics, setStatistics] = useState(null);
    const [notification, setNotification] = useState(null);
    const { setCartCount } = useCart();
    const userId = getToken();

    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productData, productsData, reviewsData] = await Promise.all([
                    getProductById(id),
                    getProducts(),
                    getProductReviews(id),
                ]);
                setProduct(productData);
                setProducts(productsData);

                setMainImage(productData.images[0]);
                setSelectedColor(productData.colors[0]);
                setSelectedSize(productData.sizes[0]);

                const totalReviews = reviewsData.reviews.length;
                const averageRating = totalReviews > 0
                    ? reviewsData.reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
                    : 0;
                setStatistics({ totalReviews, averageRating });

                if (userId) {
                    const favoriteData = await checkFavorite(id);
                    setIsFavorite(favoriteData.isFavorite);
                }
            } catch (err) {
                setError(err);
                console.error("Lỗi khi lấy dữ liệu:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, userId]);

    const getStockForVariant = (size, color) => {
        if (!size || !color || !color.value) return 0;
        const stockKey = `${size}-${color.value}`;
        return product?.stock[stockKey] || 0;
    };

    const discountedPrice = product?.discount
        ? product.price * (1 - product.discount / 100)
        : product?.price;

    const handleAddToCart = async () => {
        if (isAdding) return;
        try {
            setIsAdding(true);
            if (!userId) {
                showNotification('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!', 'error');
                return;
            }
            const data = {
                productId: id,
                quantity,
                size: selectedSize,
                color: selectedColor.value,
            };
            const response = await createCart(data);
            if (response.success) {
                setCartCount(prev => prev + 1);
                showNotification(response.message, 'success');
            } else {
                showNotification(response.message, 'error');
            }
            setIsAdding(false);
        } catch (error) {
            console.error('Lỗi khi thêm vào giỏ hàng:', error);
            showNotification('Có lỗi xảy ra khi thêm vào giỏ hàng!', 'error');
            setIsAdding(false);
        }
    };

    const handleToggleFavorite = async () => {
        if (!userId) {
            showNotification('Vui lòng đăng nhập để thêm sản phẩm vào yêu thích!', 'error');
            return;
        }

        setFavoriteLoading(true);
        try {
            if (isFavorite) {
                await removeFromFavorites(id);
                setIsFavorite(false);
            } else {
                await addToFavorites(id);
                setIsFavorite(true);
            }
        } catch (error) {
            console.error('Lỗi khi xử lý yêu thích:', error);
            showNotification('Đã xảy ra lỗi khi xử lý yêu thích!', 'error');
        } finally {
            setFavoriteLoading(false);
        }
    };

    if (loading) {
        return <Loading />
    };
    if (error) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Helmet>
                <title>Chi tiết sản phẩm</title>
            </Helmet>
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Lỗi khi tải sản phẩm</h2>
                <p className="text-gray-600 mb-4">{error.message}</p>
                <button onClick={() => navigate(-1)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300">
                    Quay lại
                </button>
            </div>
        </div>
    );
    if (!product) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Sản phẩm không tồn tại</h2>
                <p className="text-gray-600 mb-4">Có vẻ sản phẩm bạn tìm không có trong hệ thống.</p>
                <button onClick={() => navigate(-1)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300">
                    Quay lại
                </button>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8 relative">
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}

            <button
                onClick={() => navigate(-1)}
                className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-300 group"
            >
                <ArrowLeftIcon className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform duration-300" />
                <span>Quay lại</span>
            </button>

            <div className="flex flex-col md:flex-row gap-8">
                <ProductImages images={product.images} mainImage={mainImage} setMainImage={setMainImage} />
                <div className="md:w-1/2 flex flex-col gap-6">
                    <ProductInfo
                        product={product}
                        selectedColor={selectedColor}
                        setSelectedColor={setSelectedColor}
                        selectedSize={selectedSize}
                        setSelectedSize={setSelectedSize}
                        quantity={quantity}
                        setQuantity={setQuantity}
                        isAdding={isAdding}
                        handleAddToCart={handleAddToCart}
                        getStockForVariant={getStockForVariant}
                        isFavorite={isFavorite}
                        handleToggleFavorite={handleToggleFavorite}
                        discountedPrice={discountedPrice}
                        statistics={statistics}
                        favoriteLoading={favoriteLoading}
                    />
                    <ProductSpecifications specifications={product.specifications} />
                </div>
            </div>

            <ProductReviews checkUser={userId} productId={id} />
            <ProductSuggestions products={products} currentProductId={id} />
        </div>
    );
};

export default ProductDetailPage;
