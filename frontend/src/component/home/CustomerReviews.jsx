import React, { useState, useRef, useEffect } from 'react';
import CardReview from '../card/CardReview';
import { RotateInWhenVisible } from '../animation/RotateInWhenVisible';
import { ScaleUpWhenVisible } from '../animation/ScaleUpWhenVisible';
import { SlideInWhenVisible } from '../animation/SlideInWhenVisible';
import { getAllReview } from '../../api/product/productReview';
const CustomerReviews = () => {
    const sliderRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [reviews, setReview] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const repsonse = await getAllReview()
            setReview(repsonse.reviews)
        }
        fetchData()
    }, [])

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
                <RotateInWhenVisible delay={0.2}>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">ĐÁNH GIÁ KHÁCH HÀNG</h2>
                </RotateInWhenVisible>

                <ScaleUpWhenVisible delay={0.2}>
                    <p className="text-gray-600 mt-2">Ý kiến từ những khách hàng hài lòng nhất của chúng tôi!</p>
                </ScaleUpWhenVisible>
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
                        <SlideInWhenVisible key={review._id} delay={0.2}>
                            <CardReview rating={review.rating} id={review._id} namePerson={review.fullName} comment={review.comment} date={review.createdAt} />
                        </SlideInWhenVisible>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CustomerReviews;