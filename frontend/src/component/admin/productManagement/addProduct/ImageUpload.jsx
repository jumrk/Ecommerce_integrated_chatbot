import React from 'react';
import { FiUploadCloud, FiX } from 'react-icons/fi';

const ImageUpload = ({ images, onImageChange, onRemoveImage }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Hình ảnh sản phẩm</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                    <div key={index} className="relative aspect-square">
                        <img
                            src={image}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                            onClick={() => onRemoveImage(index)}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                            <FiX />
                        </button>
                    </div>
                ))}
                {images.length < 4 && (
                    <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500">
                        <FiUploadCloud className="w-8 h-8 text-gray-400" />
                        <span className="mt-2 text-sm text-gray-500">Thêm ảnh</span>
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            multiple
                            onChange={onImageChange}
                        />
                    </label>
                )}
            </div>
        </div>
    );
};

export default ImageUpload;