import React, { useState } from 'react';
import { FiX, FiPlus } from 'react-icons/fi';

const SizeManager = ({ sizes, onAddSize, onRemoveSize }) => {
    const [newSize, setNewSize] = useState('');

    const handleAddSize = () => {
        if (newSize && !sizes.includes(newSize)) {
            console.log('Gọi onAddSize với size:', newSize); // Log để kiểm tra
            onAddSize(newSize);
            setNewSize('');
        }
    };

    const handleRemoveSize = (sizeToRemove) => {
        onRemoveSize(sizeToRemove); // Gọi hàm onRemoveSize từ props
    };

    return (
        <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Kích thước có sẵn
            </label>
            <div className="flex flex-wrap gap-2 mb-4">
                {sizes.map(size => (
                    <div key={size} className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                        <span>{size}</span>
                        <button
                            onClick={() => handleRemoveSize(size)}
                            className="ml-2 text-red-500 hover:text-red-700"
                        >
                            <FiX size={16} />
                        </button>
                    </div>
                ))}
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={newSize}
                        onChange={(e) => setNewSize(e.target.value)}
                        placeholder="Thêm size mới"
                        className="px-3 py-1 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleAddSize}
                        className="p-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        <FiPlus size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SizeManager;