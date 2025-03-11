import React, { useState } from 'react';
import { StarIcon, PhotographIcon } from '@heroicons/react/outline';

const ProductReviews = ({ statistics, sortedReviews, handleSort }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [hoveredRating, setHoveredRating] = useState(0);
    const [selectedImages, setSelectedImages] = useState([]);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const imageUrls = files.map(file => URL.createObjectURL(file));
        setSelectedImages(prev => [...prev, ...imageUrls]);
    };

    const handleSubmitReview = (e) => {
        e.preventDefault();
        // TODO: Implement review submission logic here
        console.log({ rating, comment, images: selectedImages });
        // Reset form
        setRating(0);
        setComment('');
        setSelectedImages([]);
    };

    return (
        <div className="mt-8 w-full">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Review Form Section */}
                <div className="mb-12 p-6 bg-gray-50 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-6">Viết đánh giá của bạn</h2>
                    <form onSubmit={handleSubmitReview}>
                        <div className="mb-6">
                            <label className="block text-gray-700 mb-2">Đánh giá của bạn</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <StarIcon
                                        key={star}
                                        className={`h-8 w-8 cursor-pointer ${(hoveredRating || rating) >= star ? 'text-yellow-400' : 'text-gray-300'
                                            }`}
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
                                {selectedImages.map((img, index) => (
                                    <div key={index} className="relative">
                                        <img src={img} alt={`Upload ${index + 1}`} className="w-24 h-24 object-cover rounded-lg" />
                                        <button
                                            type="button"
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs"
                                            onClick={() => setSelectedImages(prev => prev.filter((_, i) => i !== index))}
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
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                            disabled={!rating || !comment}
                        >
                            Gửi đánh giá
                        </button>
                    </form>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left side - Overall Rating */}
                    <div className="md:w-1/3">
                        <h2 className="text-2xl font-semibold mb-6">Đánh giá từ khách hàng</h2>
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-5xl font-bold text-gray-800">
                                {statistics.averageRating.toFixed(1)}
                            </span>
                            <div className="flex flex-col">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, index) => (
                                        <StarIcon
                                            key={index}
                                            className={`h-6 w-6 ${index < Math.floor(statistics.averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-500">
                                    {statistics.totalReviews} đánh giá
                                </span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {[5, 4, 3, 2, 1].map((star) => {
                                const count = statistics.ratingDistribution[star];
                                const percentage = statistics.totalReviews > 0
                                    ? (count / statistics.totalReviews) * 100
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
                            {sortedReviews.map((review) => (
                                <div key={review.id} className="border-b pb-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold">{review.userName}</span>
                                                <span className="text-sm text-gray-500">
                                                    • {new Date(review.date).toLocaleDateString()}
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
                                        {review.verifiedPurchase && (
                                            <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                                                Đã mua hàng
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-gray-600 mt-2">{review.comment}</p>
                                    {review.images.length > 0 && (
                                        <div className="mt-3 flex gap-2">
                                            {review.images.map((img, index) => (
                                                <div key={index} className="relative group">
                                                    <img
                                                        src={img}
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

                        {sortedReviews.length === 0 && (
                            <div className="text-center text-gray-500 py-8">
                                Chưa có đánh giá nào cho sản phẩm này
                            </div>
                        )}

                        {sortedReviews.length > 0 && (
                            <div className="mt-8 text-center">
                                <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-300 font-medium">
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