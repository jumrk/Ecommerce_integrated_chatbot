import { useState } from 'react';

export const useProductVariants = () => {
    const [productType, setProductType] = useState('variable');
    const [colors, setColors] = useState([{ name: 'Đen', value: '#000000' }]);
    const [sizes, setSizes] = useState(['39']);
    const [stock, setStock] = useState({});
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [selectedColor, setSelectedColor] = useState('#000000');

    const handleAddColor = (colorHex, name) => {
        const newColor = {
            name: name || getColorNameFromHex(colorHex),
            value: colorHex
        };

        if (!colors.some(color => color.value === colorHex)) {
            setColors([...colors, newColor]);
        }
        setShowColorPicker(false);
    };

    const handleRemoveColor = (colorToRemove) => {
        setColors(colors.filter(color => color.value !== colorToRemove.value));
        // Xóa stock data liên quan
        const newStock = { ...stock };
        Object.keys(newStock).forEach(key => {
            if (key.includes(colorToRemove.value)) {
                delete newStock[key];
            }
        });
        setStock(newStock);
    };

    const handleAddSize = (newSize) => {
        console.log('Thêm size:', newSize); // Log để kiểm tra
        if (newSize && !sizes.includes(newSize)) {
            setSizes([...sizes, newSize]);
        }
    };

    const handleRemoveSize = (sizeToRemove) => {
        setSizes(sizes.filter(size => size !== sizeToRemove));
        // Xóa stock data liên quan
        const newStock = { ...stock };
        Object.keys(newStock).forEach(key => {
            if (key.includes(sizeToRemove)) {
                delete newStock[key];
            }
        });
        setStock(newStock);
    };

    const updateStock = (size, color, value) => {
        setStock(prev => {
            if (color === null) { // Trường hợp simple product
                return {
                    ...prev,
                    [size]: parseInt(value) || 0
                };
            }
            return {
                ...prev,
                [`${size}-${color}`]: parseInt(value) || 0
            };
        });
    };

    const getColorNameFromHex = (hex) => {
        const predefinedColors = [
            { name: 'Đen', value: '#000000' },
            { name: 'Trắng', value: '#FFFFFF' },
            // ... thêm các màu khác
        ];
        const predefinedColor = predefinedColors.find(
            color => color.value.toLowerCase() === hex.toLowerCase()
        );
        return predefinedColor ? predefinedColor.name : 'Màu tùy chỉnh';
    };

    return {
        productType,
        colors,
        sizes,
        stock,
        showColorPicker,
        selectedColor,
        setProductType,
        setColors,
        setSizes,
        setStock,
        setShowColorPicker,
        setSelectedColor,
        handleAddColor,
        handleRemoveColor,
        handleAddSize,
        handleRemoveSize,
        updateStock,
        getColorNameFromHex
    };
};