import React, { useState, useEffect } from 'react';
import { StarIcon, PhotographIcon } from '@heroicons/react/outline';
import { postProductReview, getProductReviews } from '../../api/product/productReview';

const ProductReviews = ({ checkUser, productId }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [hoveredRating, setHoveredRating] = useState(0);
    const [selectedImages, setSelectedImages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [visibleReviews, setVisibleReviews] = useState(3); // Ban đầu hiển thị 3 đánh giá

    // Lấy dữ liệu reviews từ backend
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await getProductReviews(productId);
                // Sắp xếp mặc định theo mới nhất khi tải dữ liệu
                const sortedReviews = response.reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setReviews(sortedReviews);
            } catch (err) {
                console.error('Lỗi khi lấy đánh giá:', err);
                setError('Không thể tải đánh giá từ server.');
            }
        };
        fetchReviews();
    }, [productId]);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setSelectedImages(prev => [...prev, ...files]);
    };

    const handleRemoveImage = (index) => {
        setSelectedImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const formData = new FormData();
        formData.append('rating', rating);
        formData.append('comment', comment);
        selectedImages.forEach((image) => {
            formData.append('images', image);
        });

        try {
            await postProductReview(formData, productId);
            const response = await getProductReviews(productId);
            const sortedReviews = response.reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setReviews(sortedReviews);
            setRating(0);
            setComment('');
            setSelectedImages([]);
            setVisibleReviews(3); // Reset về 3 sau khi thêm đánh giá mới
        } catch (err) {
            console.error('Lỗi khi gửi đánh giá:', err);
            setError('Đã xảy ra lỗi khi gửi đánh giá. Vui lòng thử lại.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Tính toán thống kê từ danh sách reviews
    const calculateStatistics = () => {
        const totalReviews = reviews.length;
        const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

        reviews.forEach(review => {
            ratingDistribution[review.rating] = (ratingDistribution[review.rating] || 0) + 1;
        });

        const averageRating = totalReviews > 0
            ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
            : 0;

        return { totalReviews, ratingDistribution, averageRating };
    };

    const { totalReviews, ratingDistribution, averageRating } = calculateStatistics();

    const handleSort = (e) => {
        const sortType = e.target.value;
        let sorted = [...reviews];
        if (sortType === 'newest') {
            sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (sortType === 'highest') {
            sorted.sort((a, b) => b.rating - a.rating);
        } else if (sortType === 'lowest') {
            sorted.sort((a, b) => a.rating - b.rating);
        }
        setReviews(sorted);
        setVisibleReviews(3); // Reset về 3 khi thay đổi sắp xếp
    };

    // Xử lý khi nhấn "Xem thêm đánh giá"
    const handleShowMore = () => {
        setVisibleReviews(prev => prev + 3); // Tăng thêm 3 đánh giá
    };

    return (
        <div className="mt-8 w-full">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Review Form Section */}
                <div className="mb-12 p-6 bg-gray-50 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-6">Viết đánh giá của bạn</h2>
                    {error && (
                        <div className="mb-4 text-red-600">{error}</div>
                    )}
                    <form onSubmit={handleSubmitReview}>
                        <div className="mb-6">
                            <label className="block text-gray-700 mb-2">Đánh giá của bạn</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <StarIcon
                                        key={star}
                                        className={`h-8 w-8 cursor-pointer ${(hoveredRating || rating) >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHoveredRating(star)}
                                        onMouseLeave={() => setHoveredRating(0)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="comment" className="block text-gray-700 mb-2">
                                Nhận xét của bạn
                            </label>
                            <textarea
                                id="comment"
                                rows="4"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 mb-2">Thêm hình ảnh (không bắt buộc)</label>
                            <div className="flex flex-wrap gap-4">
                                {selectedImages.map((file, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={`Upload ${index + 1}`}
                                            className="w-24 h-24 object-cover rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs"
                                            onClick={() => handleRemoveImage(index)}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                                <label className="w-24 h-24 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageUpload}
                                    />
                                    <PhotographIcon className="h-8 w-8 text-gray-400" />
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`px-6 py-3 rounded-lg transition-colors duration-300 ${isSubmitting || !rating || !comment || !checkUser
                                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                            disabled={isSubmitting || !rating || !comment || !checkUser}
                        >
                            {isSubmitting ? 'Đang gửi...' : 'Gửi đánh giá'}
                        </button>
                    </form>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left side - Overall Rating */}
                    <div className="md:w-1/3">
                        <h2 className="text-2xl font-semibold mb-6">Đánh giá từ khách hàng</h2>
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-5xl font-bold text-gray-800">
                                {averageRating.toFixed(1)}
                            </span>
                            <div className="flex flex-col">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, index) => (
                                        <StarIcon
                                            key={index}
                                            className={`h-6 w-6 ${index < Math.floor(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-500">
                                    {totalReviews} đánh giá
                                </span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {[5, 4, 3, 2, 1].map((star) => {
                                const count = ratingDistribution[star];
                                const percentage = totalReviews > 0
                                    ? (count / totalReviews) * 100
                                    : 0;

                                return (
                                    <div key={star} className="flex items-center gap-2">
                                        <span className="w-12 text-sm text-gray-600">{star} sao</span>
                                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-yellow-400 rounded-full"
                                                style={{ width: `${percentage}%` }}
                                            ></div>
                                        </div>
                                        <span className="w-12 text-sm text-gray-500 text-right">
                                            {Math.round(percentage)}%
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right side - Reviews List */}
                    <div className="md:w-2/3">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-semibold">Tất cả đánh giá</h3>
                            <select
                                className="border rounded-lg px-3 py-2 text-gray-700"
                                onChange={handleSort}
                            >
                                <option value="newest">Mới nhất</option>
                                <option value="highest">Đánh giá cao nhất</option>
                                <option value="lowest">Đánh giá thấp nhất</option>
                            </select>
                        </div>

                        <div className="space-y-6">
                            {reviews.slice(0, visibleReviews).map((review) => (
                                <div key={review._id} className="border-b pb-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold">{review.userId.fullName}</span>
                                                <span className="text-sm text-gray-500">
                                                    • {new Date(review.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <div className="flex text-yellow-400 mt-1">
                                                {[...Array(5)].map((_, index) => (
                                                    <StarIcon
                                                        key={index}
                                                        className={`h-4 w-4 ${index < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 mt-2">{review.comment}</p>
                                    {review.images.length > 0 && (
                                        <div className="mt-3 flex gap-2">
                                            {review.images.map((img, index) => (
                                                <div key={index} className="relative group">
                                                    <img
                                                        src={import.meta.env.VITE_API_URL + img}
                                                        alt={`Review ${index + 1}`}
                                                        className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {reviews.length === 0 && (
                            <div className="text-center text-gray-500 py-8">
                                Chưa có đánh giá nào cho sản phẩm này
                            </div>
                        )}

                        {reviews.length > visibleReviews && (
                            <div className="mt-8 text-center">
                                <button
                                    onClick={handleShowMore}
                                    className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-300 font-medium"
                                >
                                    Xem thêm đánh giá
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductReviews;