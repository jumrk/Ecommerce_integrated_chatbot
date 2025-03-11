import React, { useState, useRef } from 'react';
import CardReview from '../card/CardReview';
const CustomerReviews = () => {
    const sliderRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const reviews = [
        {
            id: 1,
            name: 'Nguyễn Thị Lan',
            comment: 'Sản phẩm rất đẹp, chất lượng vượt mong đợi, giao hàng nhanh chóng, tôi rất hài lòng với dịch vụ này và sẽ tiếp tục ủng hộ!',
            rating: 3,
            date: '15/03/2025',
        },
        {
            id: 2,
            name: 'Trần Văn Hùng',
            comment: 'Áo thun mặc thoải mái, giá cả hợp lý, sẽ quay lại mua thêm.',
            rating: 2,
            date: '20/02/2025',
        },
        {
            id: 3,
            name: 'Lê Thị Mai',
            comment: 'Giày sneaker cực kỳ thời trang, đi êm chân, đáng tiền, tôi đã mua thêm một đôi khác vì quá thích!',
            rating: 5,
            date: '10/01/2025',
        },
        {
            id: 4,
            name: 'Phạm Quốc Anh',
            comment: 'Túi xách sang trọng, thiết kế tinh tế, rất hài lòng.',
            rating: 5,
            date: '05/03/2025',
        },
        {
            id: 5,
            name: 'Hoàng Minh Thư',
            comment: 'Quần jeans chất lượng cao, màu sắc đẹp, đúng như mô tả, dịch vụ tuyệt vời!',
            rating: 5,
            date: '25/02/2025',
        },
        {
            id: 6,
            name: 'Lê Thị Mai',
            comment: 'Giày sneaker cực kỳ thời trang, đi êm chân, đáng tiền, tôi đã mua thêm một đôi khác vì quá thích!',
            rating: 5,
            date: '10/01/2025',
        },
        {
            id: 7,
            name: 'Phạm Quốc Anh',
            comment: 'Túi xách sang trọng, thiết kế tinh tế, rất hài lòng.',
            rating: 5,
            date: '05/03/2025',
        },
        {
            id: 8,
            name: 'Hoàng Minh Thư',
            comment: 'Quần jeans chất lượng cao, màu sắc đẹp, đúng như mô tả, dịch vụ tuyệt vời!',
            rating: 5,
            date: '25/02/2025',
        },
    ];

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - sliderRef.current.offsetLeft);
        setScrollLeft(sliderRef.current.scrollLeft);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();

        const x = e.pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        requestAnimationFrame(() => {
            sliderRef.current.scrollLeft = scrollLeft - walk;
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };
    return (
        <section className="py-12 bg-gray-50 relative">
            <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">ĐÁNH GIÁ KHÁCH HÀNG</h2>
                <p className="text-gray-600 mt-2">Ý kiến từ những khách hàng hài lòng nhất của chúng tôi!</p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    ref={sliderRef}
                    className="flex overflow-x-auto p-2 space-x-6 snap-x snap-mandatory scrollbar-hidden smooth-scroll cursor-grab select-none"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    {reviews.map((review) => (
                        <CardReview key={review.id} rating={review.rating} id={review.id} namePerson={review.name} comment={review.comment} date={review.date} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CustomerReviews;