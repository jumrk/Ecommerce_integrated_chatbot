import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

const ImageGallery = ({ isOpen, images, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!isOpen) return null;

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
            <div className="relative w-full max-w-4xl mx-4">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white z-10 hover:text-gray-300"
                >
                    <FaTimes size={24} />
                </button>

                {/* Main image */}
                <div className="relative aspect-video bg-black">
                    <img
                        src={images[currentIndex]}
                        alt={`Review ${currentIndex + 1}`}
                        className="w-full h-full object-contain"
                    />

                    {/* Navigation buttons */}
                    <button
                        onClick={handlePrevious}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300"
                    >
                        <FaChevronLeft size={24} />
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300"
                    >
                        <FaChevronRight size={24} />
                    </button>
                </div>

                {/* Thumbnails */}
                <div className="flex justify-center mt-4 gap-2 overflow-x-auto">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 
                                ${index === currentIndex ? 'border-blue-500' : 'border-transparent'}`}
                        >
                            <img
                                src={image}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>

                {/* Image counter */}
                <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 px-2 py-1 rounded">
                    {currentIndex + 1} / {images.length}
                </div>
            </div>
        </div>
    );
};

export default ImageGallery;