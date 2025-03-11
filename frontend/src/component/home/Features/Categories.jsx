import React, { useState, useEffect, useRef } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import CardCategories from '../../card/CardCategories';

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
        return 2;
    };

    const [visibleItems, setVisibleItems] = useState(getVisibleItems());

    useEffect(() => {
        const handleResize = () => setVisibleItems(getVisibleItems());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const maxScrolls = Math.max(0, Math.ceil(categories.length / visibleItems));

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1 >= maxScrolls ? 0 : prevIndex + 1));
        }, 3000);
        return () => clearInterval(interval);
    }, [maxScrolls]);

    const scrollLeft = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? maxScrolls - 1 : prevIndex - 1));
    };

    const scrollRight = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1 >= maxScrolls ? 0 : prevIndex + 1));
    };

    useEffect(() => {
        const slider = sliderRef.current;
        if (slider) {
            const slideWidth = slider.children[0].offsetWidth;
            slider.scrollTo({
                left: currentIndex * (slideWidth + 16) * visibleItems,
                behavior: 'smooth',
            });
        }
    }, [currentIndex, visibleItems]);

    return (
        <section className="py-7 bg-gray-100">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <div
                    ref={sliderRef}
                    className="flex overflow-x-hidden p-2 space-x-4 snap-x snap-mandatory scrollbar-hidden"
                >
                    {categories.map((category) => (
                        <CardCategories key={category.id} id={category.id} image={category.image}
                            name={category.name} description={category.description} />
                    ))}
                </div>

                <button
                    onClick={scrollLeft}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full 
                    hover:bg-gray-700 transition-all duration-300 shadow-md"
                >
                    <FaAngleLeft size={24} />
                </button>
                <button
                    onClick={scrollRight}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full 
                    hover:bg-gray-700 transition-all duration-300 shadow-md"
                >
                    <FaAngleRight size={24} />
                </button>

                <div className="flex justify-center mt-4 space-x-2">
                    {Array.from({ length: maxScrolls }).map((_, index) => (
                        <div
                            key={index}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-gray-800 scale-125' : 'bg-gray-400'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;