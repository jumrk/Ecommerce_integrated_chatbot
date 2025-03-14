import React from 'react';
import ColorPicker from './ColorPicker';
import SizeManager from './SizeManager';
import StockTable from './StockTable';

const ProductVariants = ({
    productType,
    colors,
    sizes,
    stock,
    showColorPicker,
    selectedColor,
    setProductType,
    handleAddColor,
    handleRemoveColor,
    handleAddSize,
    handleRemoveSize,
    setShowColorPicker,
    setSelectedColor,
    updateStock,
    errors
}) => {
    return (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Biến thể sản phẩm</h2>

            {/* Product Type Selection */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loại sản phẩm
                </label>
                <div className="flex gap-4">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            value="simple"
                            checked={productType === 'simple'}
                            onChange={(e) => setProductType(e.target.value)}
                            className="mr-2"
                        />
                        Đơn giản
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            value="variable"
                            checked={productType === 'variable'}
                            onChange={(e) => setProductType(e.target.value)}
                            className="mr-2"
                        />
                        Có biến thể
                    </label>
                </div>
            </div>

            {/* Color Picker Component */}
            <ColorPicker
                colors={colors}
                showColorPicker={showColorPicker}
                selectedColor={selectedColor}
                onAddColor={handleAddColor}
                onRemoveColor={handleRemoveColor}
                setShowColorPicker={setShowColorPicker}
                setSelectedColor={setSelectedColor}
                error={errors?.colors}
            />

            {/* Size Manager Component */}
            {productType === 'variable' && (
                <SizeManager
                    sizes={sizes}
                    onAddSize={handleAddSize}
                    onRemoveSize={handleRemoveSize}
                    error={errors?.sizes}
                />
            )}

            {/* Stock Table Component */}
            <StockTable
                productType={productType}
                colors={colors}
                sizes={sizes}
                stock={stock}
                updateStock={updateStock}
                error={errors?.stock}
            />
        </div>
    );
};

export default ProductVariants;