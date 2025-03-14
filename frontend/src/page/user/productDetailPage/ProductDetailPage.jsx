import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import products from '../../../data/Product';
import { ArrowLeftIcon } from '@heroicons/react/outline';
import ProductImages from '../../../component/productDetail/ProductImages';
import ProductInfo from '../../../component/productDetail/ProductInfo';
import ProductSpecifications from '../../../component/productDetail/ProductSpecifications';
import ProductReviews from '../../../component/productDetail/ProductReviews';
import ProductSuggestions from '../../../component/productDetail/ProductSuggestions';
import { getReviewsByProductId, calculateReviewStatistics, sortReviews } from '../../../data/review';

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = products.find(p => p.id === parseInt(id));

    const [selectedColor, setSelectedColor] = useState(product?.colors[0]);
    const [selectedSize, setSelectedSize] = useState(product?.sizes[0]);
    const [mainImage, setMainImage] = useState(product?.images[0]);
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [statistics, setStatistics] = useState(null);
    const [sortedReviews, setSortedReviews] = useState([]);

    useEffect(() => {
        if (product) {
            setMainImage(product.images[0]);
            setSelectedColor(product.colors[0]);
            setSelectedSize(product.sizes[0]);

            // Update reviews when product changes
            const productReviews = getReviewsByProductId(Number(id));
            const newStatistics = calculateReviewStatistics(Number(id));
            setStatistics(newStatistics);
            setSortedReviews(productReviews);
        }
    }, [id, product]);

    if (!product) return <div>Sản phẩm không tồn tại</div>;

    const getStockForVariant = () => {
        const stockKey = `${selectedSize}-${selectedColor}`;
        return product.stock[stockKey] || 0;
    };

    const discountedPrice = product.discount
        ? product.price * (1 - product.discount / 100)
        : product.price;

    const handleAddToCart = () => {
        if (isAdding) return;
        setIsAdding(true);
        setTimeout(() => setIsAdding(false), 2000);
    };

    const handleToggleFavorite = () => setIsFavorite(prev => !prev);

    const handleSort = (e) => {
        const sortType = e.target.value;
        const productReviews = getReviewsByProductId(Number(id));
        const sorted = sortReviews(productReviews, sortType);
        setSortedReviews(sorted);
    };

    return (
        <div className="container mx-auto px-4 py-8">
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
                    />
                    <ProductSpecifications specifications={product.specifications} />
                </div>
            </div>

            {statistics && (
                <ProductReviews
                    statistics={statistics}
                    sortedReviews={sortedReviews}
                    handleSort={handleSort}
                />
            )}

            <ProductSuggestions products={products} currentProductId={parseInt(id)} />
        </div>
    );
};

export default ProductDetailPage;