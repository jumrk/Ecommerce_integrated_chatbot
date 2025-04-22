import React from 'react';
import { SlideGridWhenVisible } from '../animation/SlideGridWhenVisible';
import { FadeInWhenVisible } from '../animation/FadeInWhenVisible';
import { ScaleUpWhenVisible } from '../animation/ScaleUpWhenVisible';

const ProductImages = ({ images, mainImage, setMainImage }) => {
    return (
        <div className="w-full md:w-1/2">
            <div className="p-2 md:p-4">
                <FadeInWhenVisible>
                    <div className="overflow-hidden rounded-lg">
                        <img
                            src={import.meta.env.VITE_API_URL + mainImage}
                            alt="Main product"
                            className="w-full h-[300px] md:h-[500px] object-cover rounded-lg transform transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                </FadeInWhenVisible>

                <SlideGridWhenVisible direction="up">
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 mt-2 md:mt-4">
                        {images.map((image, index) => (
                            <ScaleUpWhenVisible key={index}>
                                <button
                                    onClick={() => setMainImage(image)}
                                    className={`w-full rounded-md overflow-hidden ${mainImage === image ? 'ring-2 ring-blue-500' : ''
                                        }`}
                                >
                                    <img src={import.meta.env.VITE_API_URL + image} alt={`Product view ${index + 1}`} />
                                </button>
                            </ScaleUpWhenVisible>
                        ))}
                    </div>
                </SlideGridWhenVisible>
            </div>
        </div>
    );
};

export default ProductImages;