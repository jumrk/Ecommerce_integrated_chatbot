import React, { useState } from 'react';
import { FiUpload, FiX } from 'react-icons/fi';

const ImageUpload = ({ images = [], onChange, multiple = false }) => {
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFiles(e.target.files);
        }
    };

    const handleFiles = (files) => {
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        const imageFiles = Array.from(files).filter(file => validImageTypes.includes(file.type));

        if (imageFiles.length === 0) {
            toast.error('Chỉ chấp nhận file ảnh (JPG, PNG, GIF, WEBP)');
            return;
        }

        const newImages = imageFiles.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));

        if (multiple) {
            onChange([...images, ...newImages]);
        } else {
            onChange([newImages[0]]);
        }
    };

    const handleRemove = (index) => {
        const newImages = [...images];
        URL.revokeObjectURL(newImages[index].preview);
        newImages.splice(index, 1);
        onChange(newImages);
    };

    return (
        <div className="space-y-4">
            <div
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                    ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-upload').click()}
            >
                <input
                    id="file-upload"
                    type="file"
                    multiple={multiple}
                    className="hidden"
                    onChange={handleChange}
                    accept="image/*"
                />
                <div className="flex flex-col items-center">
                    <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-gray-600">
                        Kéo thả ảnh vào đây hoặc click để chọn ảnh
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                        {multiple ? 'Có thể chọn nhiều ảnh' : 'Chỉ chọn 1 ảnh'}
                    </p>
                </div>
            </div>

            {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                        <div key={index} className="relative group">
                            <img
                                src={image.preview || image}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemove(index)}
                                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full 
                                    opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <FiX className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageUpload;