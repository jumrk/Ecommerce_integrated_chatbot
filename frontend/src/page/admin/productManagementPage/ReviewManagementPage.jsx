import React, { useEffect, useState } from 'react';
import ReviewList from '../../../component/admin/productManagement/reviewProduct/ReviewList';
import ReviewFilter from '../../../component/admin/productManagement/reviewProduct/ReivewFilter';
import { useReviews } from '../../../hooks/admin/reivewProductHook/useReivew';
import LoadingSpinner from '../../../component/common/LoadingSpinner';
const ReviewManagementPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const {
        reviews,
        loading,
        filters,
        setFilters,
        handleStatusChange,
        handleDeleteReview,
        handleBulkAction
    } = useReviews();

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    if (isLoading) {
        return <LoadingSpinner />;
    }
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Quản lý đánh giá</h1>
                    <div className="flex gap-2">
                        <select
                            onChange={(e) => handleBulkAction(e.target.value)}
                            className="border rounded-lg px-4 py-2"
                        >
                            <option value="">Hành động</option>
                            <option value="approve">Duyệt đánh giá</option>
                            <option value="reject">Từ chối đánh giá</option>
                            <option value="delete">Xóa đánh giá</option>
                        </select>
                    </div>
                </div>

                <ReviewFilter filters={filters} setFilters={setFilters} />

                <ReviewList
                    reviews={reviews}
                    loading={loading}
                    onStatusChange={handleStatusChange}
                    onDeleteReview={handleDeleteReview}
                />
            </div>
        </div>
    );
};

export default ReviewManagementPage;