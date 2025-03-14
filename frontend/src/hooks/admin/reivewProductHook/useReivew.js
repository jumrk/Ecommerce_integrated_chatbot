import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const useReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        status: '',
        rating: ''
    });

    // Mô phỏng dữ liệu đánh giá
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                // Giả lập API call
                const mockReviews = [
                    {
                        id: 1,
                        product: {
                            name: "Giày Nike Air Max",
                            image: "https://example.com/shoe1.jpg"
                        },
                        user: {
                            name: "Nguyễn Văn A",
                            email: "nguyenvana@example.com",
                            avatar: "https://example.com/avatar1.jpg"
                        },
                        rating: 5,
                        comment: "Sản phẩm rất tốt, đúng như mô tả",
                        status: "pending",
                        createdAt: "2024-03-15T08:00:00Z",
                        images: [
                            "https://example.com/review1-1.jpg",
                            "https://example.com/review1-2.jpg",
                            "https://example.com/review1-3.jpg"
                        ]
                    },
                    {
                        id: 2,
                        product: {
                            name: "Giày Nike Air Max",
                            image: "https://example.com/shoe1.jpg"
                        },
                        user: {
                            name: "Nguyễn Văn A",
                            email: "nguyenvana@example.com",
                            avatar: "https://example.com/avatar1.jpg"
                        },
                        rating: 5,
                        comment: "Sản phẩm rất tốt, đúng như mô tả",
                        status: "pending",
                        createdAt: "2024-03-15T08:00:00Z",
                        images: [
                            "https://example.com/review1-1.jpg",
                            "https://example.com/review1-2.jpg",
                            "https://example.com/review1-3.jpg"
                        ]
                    }
                    // Thêm các đánh giá mẫu khác
                ];

                setReviews(mockReviews);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching reviews:', error);
                toast.error('Có lỗi xảy ra khi tải dữ liệu');
                setLoading(false);
            }
        };

        fetchReviews();
    }, [filters]);

    const handleStatusChange = async (reviewId, newStatus) => {
        try {
            // Giả lập API call
            setReviews(reviews.map(review =>
                review.id === reviewId ? { ...review, status: newStatus } : review
            ));
            toast.success('Cập nhật trạng thái thành công');
        } catch (error) {
            console.error('Error updating review status:', error);
            toast.error('Có lỗi xảy ra khi cập nhật trạng thái');
        }
    };

    const handleDeleteReview = async (reviewId) => {
        if (window.confirm('Bạn có chắc muốn xóa đánh giá này?')) {
            try {
                // Giả lập API call
                setReviews(reviews.filter(review => review.id !== reviewId));
                toast.success('Xóa đánh giá thành công');
            } catch (error) {
                console.error('Error deleting review:', error);
                toast.error('Có lỗi xảy ra khi xóa đánh giá');
            }
        }
    };

    const handleBulkAction = async (action) => {
        if (!action) return;

        try {
            // Giả lập API call
            switch (action) {
                case 'approve':
                    // Xử lý duyệt hàng loạt
                    break;
                case 'reject':
                    // Xử lý từ chối hàng loạt
                    break;
                case 'delete':
                    // Xử lý xóa hàng loạt
                    break;
                default:
                    break;
            }
            toast.success('Thực hiện hành động thành công');
        } catch (error) {
            console.error('Error performing bulk action:', error);
            toast.error('Có lỗi xảy ra khi thực hiện hành động');
        }
    };

    return {
        reviews,
        loading,
        filters,
        setFilters,
        handleStatusChange,
        handleDeleteReview,
        handleBulkAction
    };
};