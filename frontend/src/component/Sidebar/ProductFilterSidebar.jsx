import React, { useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

const ProductFilterSidebar = ({ onFilterChange, initialCategory = '' }) => {
    const [openSections, setOpenSections] = useState({
        category: initialCategory,
        price: true,
        color: true,
        size: true,
    });

    const [expandedCategories, setExpandedCategories] = useState(false);
    const [expandedSizes, setExpandedSizes] = useState(false);

    const toggleSection = (section) => {
        setOpenSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const [filters, setFilters] = useState({
        category: '',
        price: { min: 0, max: 1000000 },
        color: [],
        size: [],
    });

    const colorClasses = {
        green: 'bg-green-400',
        red: 'bg-red-400',
        yellow: 'bg-yellow-400',
        orange: 'bg-orange-400',
        blue: 'bg-blue-400',
        purple: 'bg-purple-400',
        pink: 'bg-pink-400',
        black: 'bg-black',
    };

    const handleFilterChange = (type, value) => {
        setFilters((prev) => {
            let newFilters;
            switch (type) {
                case 'category':
                    newFilters = { ...prev, category: value === prev.category ? '' : value };
                    break;
                case 'price':
                    newFilters = { ...prev, price: value };
                    break;
                case 'color':
                    const isSelected = prev.color.includes(value);
                    newFilters = {
                        ...prev,
                        color: isSelected ? prev.color.filter((c) => c !== value) : [...prev.color, value],
                    };
                    break;
                case 'size':
                    const isSizeSelected = prev.size.includes(value);
                    newFilters = {
                        ...prev,
                        size: isSizeSelected ? prev.size.filter((s) => s !== value) : [...prev.size, value],
                    };
                    break;
                default:
                    newFilters = prev;
            }
            onFilterChange(newFilters);
            return newFilters;
        });
    };

    const categories = ['T-shirt', 'Shorts', 'Shirts', 'Hoodie', 'Quần Jeans', 'Quần dài', 'Váy', 'Áo khoác'];
    const sizes = ['S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL'];

    return (
        <div className="w-full md:w-64 bg-white shadow-lg rounded-lg p-4 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-gray-800 uppercase tracking-wide">Bộ lọc</h2>

            <div className="mb-6">
                <div
                    className="flex justify-between items-center cursor-pointer p-2 hover:bg-gray-100 rounded-md transition-all duration-300"
                    onClick={() => toggleSection('category')}
                >
                    <span className="text-lg font-semibold text-gray-700">Loại</span>
                    {openSections.category ? <FaAngleUp /> : <FaAngleDown />}
                </div>

                {openSections.category && (
                    <div className="mt-2 space-y-2">
                        {(expandedCategories ? categories : categories.slice(0, 5)).map((cat) => (
                            <div
                                key={cat}
                                className={`flex items-center space-x-2 p-2 rounded-lg border border-gray-300 hover:bg-gray-100 hover:shadow-md transition-all duration-300 ${filters.category === cat ? 'bg-indigo-100 border-indigo-600' : ''
                                    }`}
                                onClick={() => handleFilterChange('category', cat)}
                            >
                                <span className="text-gray-700">{cat}</span>
                            </div>
                        ))}
                        {categories.length > 5 && (
                            <button
                                onClick={() => setExpandedCategories(!expandedCategories)}
                                className="mt-2 w-full text-indigo-600 font-semibold text-sm hover:text-indigo-800 transition-colors duration-300"
                            >
                                {expandedCategories ? 'Thu gọn' : 'Xem thêm'}
                            </button>
                        )}
                    </div>
                )}
            </div>

            <div className="mb-6">
                <div
                    className="flex justify-between items-center cursor-pointer p-2 hover:bg-gray-100 rounded-md transition-all duration-300"
                    onClick={() => toggleSection('price')}
                >
                    <span className="text-lg font-semibold text-gray-700">Giá</span>
                    {openSections.price ? <FaAngleUp /> : <FaAngleDown />}
                </div>
                {openSections.price && (
                    <div className="mt-2">
                        <input
                            type="range"
                            min="0"
                            max="1000000"
                            value={filters.price.max}
                            onChange={(e) => handleFilterChange('price', { min: 0, max: parseInt(e.target.value) })}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                        <div className="text-sm text-gray-500 mt-2">
                            {filters.price.min.toLocaleString('vi-VN')} VNĐ - {filters.price.max.toLocaleString('vi-VN')} VNĐ
                        </div>
                    </div>
                )}
            </div>

            <div className="mb-6">
                <div
                    className="flex justify-between items-center cursor-pointer p-2 hover:bg-gray-100 rounded-md transition-all duration-300"
                    onClick={() => toggleSection('color')}
                >
                    <span className="text-lg font-semibold text-gray-700">Màu</span>
                    {openSections.color ? <FaAngleUp /> : <FaAngleDown />}
                </div>
                {openSections.color && (
                    <div className="mt-2 flex flex-wrap gap-2">
                        {['green', 'red', 'yellow', 'orange', 'blue', 'purple', 'pink', 'black'].map((color) => (
                            <div
                                key={color}
                                className={`w-8 h-8 rounded-full cursor-pointer border border-gray-300 
                  ${colorClasses[color]} 
                  ${filters.color.includes(color) ? 'ring-2 ring-indigo-600 scale-110 shadow-lg' : ''} 
                  transition-all duration-300 ease-in-out hover:scale-105 hover:ring-1 hover:ring-gray-400`}
                                onClick={() => handleFilterChange('color', color)}
                            ></div>
                        ))}
                    </div>
                )}
            </div>

            <div className="mb-6">
                <div
                    className="flex justify-between items-center cursor-pointer p-2 hover:bg-gray-100 rounded-md transition-all duration-300"
                    onClick={() => toggleSection('size')}
                >
                    <span className="text-lg font-semibold text-gray-700">Size</span>
                    {openSections.size ? <FaAngleUp /> : <FaAngleDown />}
                </div>
                {openSections.size && (
                    <div className="mt-2 space-y-2">
                        {(expandedSizes ? sizes : sizes.slice(0, 5)).map((size) => (
                            <div
                                key={size}
                                className={`flex items-center space-x-2 p-2 rounded-lg border border-gray-300 hover:bg-gray-100 hover:shadow-md transition-all duration-300 ${filters.size.includes(size) ? 'bg-indigo-100 border-indigo-600' : ''
                                    }`}
                                onClick={() => handleFilterChange('size', size)}
                            >
                                <span className="text-gray-700">{size}</span>
                            </div>
                        ))}
                        {sizes.length > 5 && (
                            <button
                                onClick={() => setExpandedSizes(!expandedSizes)}
                                className="mt-2 w-full text-indigo-600 font-semibold text-sm hover:text-indigo-800 transition-colors duration-300"
                            >
                                {expandedSizes ? 'Thu gọn' : 'Xem thêm'}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductFilterSidebar;