import React from 'react';

const ProductImages = ({ images, mainImage, setMainImage }) => {
    return (
        <div className="w-full md:w-1/2">
            <div className="p-2 md:p-4">
                <div className="overflow-hidden rounded-lg">
                    <img
                        src={mainImage}
                        alt="Main product"
                        className="w-full h-[300px] md:h-[500px] object-cover rounded-lg transform transition-transform duration-300 hover:scale-105"
                    />
                </div>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 mt-2 md:mt-4">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setMainImage(image)}
                            className={`relative rounded-lg overflow-hidden ${mainImage === image ? 'ring-2 ring-blue-500' : ''}`}
                        >
                            <img
                                src={image}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-full h-16 md:h-24 object-cover"
                            />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductImages;