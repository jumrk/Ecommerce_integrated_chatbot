import React, { useState, useEffect, useRef } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import CardCategories from '../../card/CardCategories';
import { SlideInWhenVisible } from '../../animation/SlideInWhenVisible';
const Categories = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef(null);

    const categories = [
        { id: 1, name: 'Áo thun', description: 'Thoải mái, phong cách.', image: 'https://dosi-in.com/images/detailed/41/lnc_tr%C6%A1n_3.png' },
        { id: 2, name: 'Quần jeans', description: 'Chất liệu bền.', image: 'https://i.pinimg.com/736x/66/10/29/66102910c5eb2892fc8bb1d7c6f275e4.jpg' },
        { id: 3, name: 'Giày sneaker', description: 'Năng động, cá tính.', image: 'https://th.bing.com/th?id=OPAC.OxGXyc8ES9pqIQ474C474&w=592&h=550&o=5&pid=21.1' },
        { id: 4, name: 'Mũ lưỡi trai', description: 'Thời thượng.', image: 'https://th.bing.com/th/id/OIP.ZRZgmJDvcgwldV_Nzlx5swHaHa?rs=1&pid=ImgDetMain' },
        { id: 5, name: 'Túi xách', description: 'Sang trọng.', image: 'https://th.bing.com/th/id/OIP.MBJFfAzTCx7hTNWKekr7JgHaHa?rs=1&pid=ImgDetMain' },
    ];

    const getVisibleItems = () => {
        if (window.innerWidth >= 1024) return 4;
        if (window.innerWidth >= 768) return 3;
        if (window.innerWidth >= 640) return 2;
        return 1;
    };

    const [visibleItems, setVisibleItems] = useState(getVisibleItems());

    useEffect(() => {
        const handleResize = () => setVisibleItems(getVisibleItems());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const maxScrolls = Math.max(0, Math.ceil(categories.length / visibleItems) - 1);

    const scrollLeft = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex === 0 ? maxScrolls : prevIndex - 1;
            const slider = sliderRef.current;
            if (slider) {
                const slideWidth = slider.offsetWidth;
                const scrollPosition = slider.scrollLeft - slideWidth;

                slider.scrollTo({
                    left: scrollPosition,
                    behavior: 'smooth'
                });
            }
            return newIndex;
        });
    };

    const scrollRight = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex >= maxScrolls ? 0 : prevIndex + 1;
            const slider = sliderRef.current;
            if (slider) {
                const slideWidth = slider.offsetWidth;
                const scrollPosition = slider.scrollLeft + slideWidth;

                slider.scrollTo({
                    left: newIndex === 0 ? 0 : scrollPosition,
                    behavior: 'smooth'
                });
            }
            return newIndex;
        });
    };
    return (
        <section className="py-7 bg-gray-100">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <div className="relative">
                    <div className="overflow-hidden">
                        <SlideInWhenVisible direction='down' delay={0.4}>
                            <div
                                ref={sliderRef}
                                className="flex gap-4 snap-x snap-mandatory overflow-x-hidden"
                                style={{
                                    scrollbarWidth: 'none',
                                    msOverflowStyle: 'none',
                                    WebkitOverflowScrolling: 'touch',
                                }}
                            >
                                {categories.map((category) => (
                                    <div
                                        key={category.id}
                                        className="flex-shrink-0 w-full sm:w-[calc(50%-8px)] md:w-[calc(33.333%-11px)] lg:w-[calc(25%-12px)] snap-start"
                                    >
                                        <div className="h-full">
                                            <CardCategories
                                                id={category.id}
                                                image={category.image}
                                                name={category.name}
                                                description={category.description}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </SlideInWhenVisible>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-2 pointer-events-none">

                        <SlideInWhenVisible direction='left' delay={0.4}>
                            <button
                                onClick={scrollLeft}
                                className="bg-gray-800/80 text-white p-3 rounded-full hover:bg-gray-700 
                                     transition-all duration-300 shadow-lg backdrop-blur-sm pointer-events-auto hover:scale-110"
                            >
                                <FaAngleLeft size={20} />
                            </button>
                        </SlideInWhenVisible>

                        <SlideInWhenVisible direction='right' delay={0.4}>
                            <button
                                onClick={scrollRight}
                                className="bg-gray-800/80 text-white p-3 rounded-full hover:bg-gray-700 
                                     transition-all duration-300 shadow-lg backdrop-blur-sm pointer-events-auto hover:scale-110"
                            >
                                <FaAngleRight size={20} />
                            </button>
                        </SlideInWhenVisible>
                    </div>
                </div>

                {/* Dots Navigation */}
                <SlideInWhenVisible direction='down' delay={0.4}>
                    <div className="flex justify-center mt-6 space-x-2">
                        {Array.from({ length: maxScrolls + 1 }).map((_, index) => (
                            <div
                                key={index}
                                className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 hover:scale-125
                                ${index === currentIndex ? 'bg-gray-800 scale-125' : 'bg-gray-400'}`}
                                onClick={() => {
                                    setCurrentIndex(index);
                                    const slider = sliderRef.current;
                                    if (slider) {
                                        const slideWidth = slider.offsetWidth;
                                        slider.scrollTo({
                                            left: index * slideWidth,
                                            behavior: 'smooth'
                                        });
                                    }
                                }}
                            />
                        ))}
                    </div>
                </SlideInWhenVisible>
            </div>
        </section>
    );
};

export default Categories;