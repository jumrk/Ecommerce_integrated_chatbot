import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

const ColorPicker = ({
    colors,
    showColorPicker,
    selectedColor,
    onAddColor,
    onRemoveColor,
    setShowColorPicker,
    setSelectedColor,
    error
}) => {
    const [customColorName, setCustomColorName] = useState('');

    const predefinedColors = [
        { name: 'Đen', value: '#000000' },
        { name: 'Trắng', value: '#FFFFFF' },
        { name: 'Đỏ', value: '#FF0000' },
        { name: 'Xanh dương', value: '#0000FF' },
        { name: 'Xanh lá', value: '#00FF00' },
        { name: 'Vàng', value: '#FFFF00' },
        { name: 'Hồng', value: '#FFC0CB' },
        { name: 'Tím', value: '#800080' },
        { name: 'Cam', value: '#FFA500' },
        { name: 'Nâu', value: '#A52A2A' }
    ];

    // Kiểm tra xem màu đã tồn tại chưa
    const isColorExists = (colorValue) => {
        return colors.some(color => color.value.toLowerCase() === colorValue.toLowerCase());
    };

    // Xử lý thêm màu từ danh sách có sẵn
    const handlePredefinedColorClick = (predefinedColor) => {
        if (!isColorExists(predefinedColor.value)) {
            onAddColor(predefinedColor.value, predefinedColor.name);
        }
    };

    // Xử lý thêm màu tùy chỉnh
    const handleAddCustomColor = () => {
        if (customColorName.trim() && !isColorExists(selectedColor)) {
            onAddColor(selectedColor, customColorName.trim());
            setCustomColorName('');
            setShowColorPicker(false);
        }
    };

    // Xử lý khi nhấn Enter trong input tên màu
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddCustomColor();
        }
    };

    return (
        <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Màu sắc
            </label>

            {/* Selected Colors */}
            <div className="flex flex-wrap gap-2 mb-4">
                {colors.map((color) => (
                    <div
                        key={color.value}
                        className="flex items-center bg-gray-100 rounded-full px-3 py-1"
                    >
                        <div
                            className="w-4 h-4 rounded-full mr-2 border border-gray-200"
                            style={{ backgroundColor: color.value }}
                        />
                        <span className="text-sm">{color.name}</span>
                        <button
                            onClick={() => onRemoveColor(color)}
                            className="ml-2 text-gray-500 hover:text-red-500"
                            title="Xóa màu"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>

            {/* Predefined Colors */}
            <div className="flex flex-wrap gap-4 mb-4">
                {predefinedColors.map((color) => (
                    <button
                        key={color.value}
                        onClick={() => handlePredefinedColorClick(color)}
                        className={`flex flex-col items-center transition-transform hover:scale-110 
                            ${isColorExists(color.value) ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isColorExists(color.value)}
                        title={isColorExists(color.value) ? 'Màu đã được chọn' : color.name}
                    >
                        <div
                            className="w-8 h-8 rounded-full border border-gray-300"
                            style={{ backgroundColor: color.value }}
                        />
                        <span className="text-xs mt-1">{color.name}</span>
                    </button>
                ))}
                <button
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    className="flex flex-col items-center transition-transform hover:scale-110"
                    title="Thêm màu tùy chỉnh"
                >
                    <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center bg-white">
                        +
                    </div>
                    <span className="text-xs mt-1">Tùy chỉnh</span>
                </button>
            </div>

            {/* Custom Color Picker */}
            {showColorPicker && (
                <div className="mt-4 p-4 border rounded-lg bg-white shadow-lg">
                    <HexColorPicker
                        color={selectedColor}
                        onChange={setSelectedColor}
                        className="mb-4"
                    />
                    <div className="flex items-center gap-2">
                        <div
                            className="w-8 h-8 rounded-full border border-gray-300"
                            style={{ backgroundColor: selectedColor }}
                        />
                        <input
                            type="text"
                            value={customColorName}
                            onChange={(e) => setCustomColorName(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Nhập tên màu"
                            className="flex-1 border rounded px-3 py-2"
                        />
                        <button
                            onClick={handleAddCustomColor}
                            disabled={!customColorName.trim() || isColorExists(selectedColor)}
                            className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 
                                ${(!customColorName.trim() || isColorExists(selectedColor)) ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            Thêm
                        </button>
                    </div>
                    {isColorExists(selectedColor) && (
                        <p className="text-red-500 text-sm mt-2">Màu này đã được chọn</p>
                    )}
                </div>
            )}

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default ColorPicker;