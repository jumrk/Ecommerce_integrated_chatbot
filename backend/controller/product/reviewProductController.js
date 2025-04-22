const Review = require('../../model/reviewProduct');
const reviewController = {
    // Tạo đánh giá sản phẩm
    createReview: async (req, res) => {
        try {
            const { productId } = req.params;
            const { rating, comment } = req.body;
            const userId = req.user.userId;
            const images = req.files ? req.files.map(file => `/images/reviews/${file.filename}`) : [];

            if (!rating || !comment) {
                return res.status(400).json({ message: "Vui lòng nhập đầy đủ rating và comment." });
            }
            if (rating < 1 || rating > 5) {
                return res.status(400).json({ message: "Rating phải từ 1 đến 5 sao." });
            }

            const newReview = new Review({
                productId: productId,
                userId: userId,
                rating: rating,
                comment: comment,
                images: images,
            });

            await newReview.save();

            res.status(201).json({ message: "Đánh giá thành công", review: newReview });
        } catch (error) {
            console.error("Lỗi khi tạo đánh giá:", error);
            res.status(500).json({ message: "Lỗi server khi tạo đánh giá." });
        }
    },

    // Lấy đánh giá sản phẩm theo productId
    getReviewsByProductId: async (req, res) => {
        try {
            const { productId } = req.params;
            const reviews = await Review.find({ productId: productId }).sort({ createdAt: -1 }).populate('userId', 'fullName'); // Sắp xếp theo mới nhất và populate user nếu cần

            res.status(200).json({ reviews: reviews });
        } catch (error) {
            console.error("Lỗi khi lấy đánh giá sản phẩm:", error);
            res.status(500).json({ message: "Lỗi server khi lấy đánh giá sản phẩm." });
        }
    },

    getAllReview: async (req, res) => {
        try {
            const reviews = await Review.find({ rating: 5 }).populate('userId', 'fullName');
            res.status(200).json({ reviews: reviews });
        } catch (error) {
            console.error("Lỗi khi lấy đánh giá sản phẩm:", error);
            res.status(500).json({ message: "Lỗi server khi lấy đánh giá sản phẩm." });
        }
    }

};

module.exports = reviewController;
