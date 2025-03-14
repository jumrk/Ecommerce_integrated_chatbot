import React, { useState } from 'react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { FaStar, FaImage } from 'react-icons/fa';
import ImageGallery from './ImageGallery';

const ReviewList = ({ reviews, loading, onStatusChange, onDeleteReview }) => {
    const [selectedReviews, setSelectedReviews] = useState([]);
    const [showGallery, setShowGallery] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedReviews(reviews.map(review => review.id));
        } else {
            setSelectedReviews([]);
        }
    };

    const handleSelectReview = (reviewId) => {
        setSelectedReviews(prev => {
            if (prev.includes(reviewId)) {
                return prev.filter(id => id !== reviewId);
            } else {
                return [...prev, reviewId];
            }
        });
    };

    const openGallery = (images) => {
        setSelectedImages(images);
        setShowGallery(true);
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'approved':
                return 'bg-green-100 text-green-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return <div className="text-center py-8">Đang tải...</div>;
    }

    return (
        <>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="w-12 py-3 px-4">
                                <input
                                    type="checkbox"
                                    onChange={handleSelectAll}
                                    checked={selectedReviews.length === reviews.length}
                                />
                            </th>
                            <th className="py-3 px-4 text-left">Sản phẩm</th>
                            <th className="py-3 px-4 text-left">Người đánh giá</th>
                            <th className="py-3 px-4 text-left">Đánh giá & Hình ảnh</th>
                            <th className="py-3 px-4 text-left">Trạng thái</th>
                            <th className="py-3 px-4 text-left">Ngày đánh giá</th>
                            <th className="py-3 px-4 text-left">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {reviews.map((review) => (
                            <tr key={review.id}>
                                <td className="py-3 px-4">
                                    <input
                                        type="checkbox"
                                        checked={selectedReviews.includes(review.id)}
                                        onChange={() => handleSelectReview(review.id)}
                                    />
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center">
                                        <img
                                            src={review.product.image}
                                            alt={review.product.name}
                                            className="w-10 h-10 rounded object-cover mr-3"
                                        />
                                        <span className="font-medium">{review.product.name}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center">
                                        <img
                                            src={review.user.avatar}
                                            alt={review.user.name}
                                            className="w-8 h-8 rounded-full mr-2"
                                        />
                                        <div>
                                            <div className="font-medium">{review.user.name}</div>
                                            <div className="text-sm text-gray-500">{review.user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex flex-col">
                                        <div className="flex items-center mb-1">
                                            {[...Array(5)].map((_, index) => (
                                                <FaStar
                                                    key={index}
                                                    className={index < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-sm text-gray-600 mb-2">{review.comment}</p>
                                        {review.images && review.images.length > 0 && (
                                            <div className="flex items-center gap-2">
                                                <div className="flex -space-x-2">
                                                    {review.images.slice(0, 3).map((image, index) => (
                                                        <img
                                                            key={index}
                                                            src={image}
                                                            alt={`Review ${index + 1}`}
                                                            className="w-10 h-10 rounded border-2 border-white object-cover"
                                                        />
                                                    ))}
                                                </div>
                                                {review.images.length > 0 && (
                                                    <button
                                                        onClick={() => openGallery(review.images)}
                                                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                                                    >
                                                        <FaImage />
                                                        Xem {review.images.length} ảnh
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="py-3 px-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(review.status)}`}>
                                        {review.status === 'pending' && 'Chờ duyệt'}
                                        {review.status === 'approved' && 'Đã duyệt'}
                                        {review.status === 'rejected' && 'Đã từ chối'}
                                    </span>
                                </td>
                                <td className="py-3 px-4">
                                    {format(new Date(review.createdAt), 'dd/MM/yyyy HH:mm', { locale: vi })}
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center space-x-2">
                                        {review.status === 'pending' && (
                                            <>
                                                <button
                                                    onClick={() => onStatusChange(review.id, 'approved')}
                                                    className="text-green-600 hover:text-green-800"
                                                >
                                                    Duyệt
                                                </button>
                                                <button
                                                    onClick={() => onStatusChange(review.id, 'rejected')}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    Từ chối
                                                </button>
                                            </>
                                        )}
                                        <button
                                            onClick={() => onDeleteReview(review.id)}
                                            className="text-gray-600 hover:text-gray-800"
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Image Gallery Modal */}
            <ImageGallery
                isOpen={showGallery}
                images={selectedImages}
                onClose={() => setShowGallery(false)}
            />
        </>
    );
};

export default ReviewList;