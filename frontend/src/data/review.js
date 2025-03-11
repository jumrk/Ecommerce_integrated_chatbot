export const reviews = [
    // Reviews for Product ID 1
    {
        id: 1,
        productId: 1,
        userName: "Nguyễn Văn A",
        rating: 5,
        date: "2024-03-15",
        verifiedPurchase: true,
        comment: "Áo phông rất thoải mái, chất vải mềm mại. Đúng với mô tả của shop.",
        images: [
            "https://picsum.photos/200/200?random=1",
            "https://picsum.photos/200/200?random=2"
        ]
    },
    {
        id: 2,
        productId: 1,
        userName: "Trần Thị B",
        rating: 4,
        date: "2024-03-14",
        verifiedPurchase: true,
        comment: "Áo đẹp, form chuẩn. Chỉ tiếc là màu hơi nhạt hơn trong ảnh một chút.",
        images: [
            "https://picsum.photos/200/200?random=3"
        ]
    },

    // Reviews for Product ID 2
    {
        id: 3,
        productId: 2,
        userName: "Lê Văn C",
        rating: 5,
        date: "2024-03-13",
        verifiedPurchase: true,
        comment: "Quần jean đẹp, vải dày dặn, form chuẩn. Rất hài lòng với sản phẩm.",
        images: [
            "https://picsum.photos/200/200?random=4",
            "https://picsum.photos/200/200?random=5"
        ]
    },
    {
        id: 4,
        productId: 2,
        userName: "Phạm Thị D",
        rating: 3,
        date: "2024-03-12",
        verifiedPurchase: true,
        comment: "Quần ổn, nhưng đường chỉ may hơi lỏng một số chỗ.",
        images: []
    },

    // Reviews for Product ID 3
    {
        id: 5,
        productId: 3,
        userName: "Hoàng Văn E",
        rating: 5,
        date: "2024-03-11",
        verifiedPurchase: true,
        comment: "Giày đẹp, đi rất êm chân. Đóng gói cẩn thận.",
        images: [
            "https://picsum.photos/200/200?random=6"
        ]
    },
    {
        id: 6,
        productId: 3,
        userName: "Mai Thị F",
        rating: 4,
        date: "2024-03-10",
        verifiedPurchase: true,
        comment: "Giày đẹp như hình, nhưng size hơi rộng một chút.",
        images: [
            "https://picsum.photos/200/200?random=7",
            "https://picsum.photos/200/200?random=8"
        ]
    },

    // Reviews for Product ID 4
    {
        id: 7,
        productId: 4,
        userName: "Đặng Văn G",
        rating: 5,
        date: "2024-03-09",
        verifiedPurchase: true,
        comment: "Túi xách đẹp, da thật 100%, màu sắc sang trọng.",
        images: [
            "https://picsum.photos/200/200?random=9"
        ]
    },
    {
        id: 8,
        productId: 4,
        userName: "Trương Thị H",
        rating: 5,
        date: "2024-03-08",
        verifiedPurchase: true,
        comment: "Chất lượng tuyệt vời, đáng đồng tiền. Shop tư vấn nhiệt tình.",
        images: [
            "https://picsum.photos/200/200?random=10",
            "https://picsum.photos/200/200?random=11"
        ]
    }
];

// Các hàm tiện ích giữ nguyên như cũ
export const getReviewsByProductId = (productId) => {
    return reviews.filter(review => review.productId === productId);
};

export const calculateReviewStatistics = (productId) => {
    const productReviews = getReviewsByProductId(productId);

    if (productReviews.length === 0) {
        return {
            averageRating: 0,
            totalReviews: 0,
            ratingDistribution: {
                5: 0, 4: 0, 3: 0, 2: 0, 1: 0
            }
        };
    }

    const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / productReviews.length;

    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    productReviews.forEach(review => {
        distribution[review.rating]++;
    });

    return {
        averageRating,
        totalReviews: productReviews.length,
        ratingDistribution: distribution
    };
};

export const sortReviews = (reviews, sortType) => {
    const sortedReviews = [...reviews];
    switch (sortType) {
        case 'newest':
            return sortedReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
        case 'highest':
            return sortedReviews.sort((a, b) => b.rating - a.rating);
        case 'lowest':
            return sortedReviews.sort((a, b) => a.rating - b.rating);
        default:
            return sortedReviews;
    }
};

export default {
    reviews,
    getReviewsByProductId,
    calculateReviewStatistics,
    sortReviews
};