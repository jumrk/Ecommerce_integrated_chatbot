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
                    <div className="flex gap-4">
                        <label className="flex items-center cursor-pointer group">
                            <input
                                type="radio"
                                value="simple"
                                hidden={true}
                                checked={productType === 'simple'}
                                onChange={(e) => setProductType(e.target.value)}
                                className="peer"
                            />
                            <span className="w-5 h-5 mr-2 inline-block border-2 border-gray-300 rounded-full 
                     group-hover:border-blue-500 transition-colors 
                     peer-checked:bg-blue-500 peer-checked:border-blue-500 
                     peer-checked:after:content-[''] peer-checked:after:w-3 
                     peer-checked:after:h-3 peer-checked:after:bg-white 
                     peer-checked:after:rounded-full peer-checked:after:absolute 
                     peer-checked:after:top-1/2 peer-checked:after:left-1/2 
                     peer-checked:after:-translate-x-1/2 peer-checked:after:-translate-y-1/2 
                     relative">
                            </span>
                            <span className="text-gray-700 group-hover:text-blue-500 transition-colors">
                                Đơn giản
                            </span>
                        </label>

                        <label className="flex items-center cursor-pointer group">
                            <input
                                type="radio"
                                value="variable"
                                hidden={true}
                                checked={productType === 'variable'}
                                onChange={(e) => setProductType(e.target.value)}
                                className="peer"
                            />
                            <span className="w-5 h-5 mr-2 inline-block border-2 border-gray-300 rounded-full 
                     group-hover:border-blue-500 transition-colors 
                     peer-checked:bg-blue-500 peer-checked:border-blue-500 
                     peer-checked:after:content-[''] peer-checked:after:w-3 
                     peer-checked:after:h-3 peer-checked:after:bg-white 
                     peer-checked:after:rounded-full peer-checked:after:absolute 
                     peer-checked:after:top-1/2 peer-checked:after:left-1/2 
                     peer-checked:after:-translate-x-1/2 peer-checked:after:-translate-y-1/2 
                     relative">
                            </span>
                            <span className="text-gray-700 group-hover:text-blue-500 transition-colors">
                                Có biến thể
                            </span>
                        </label>
                    </div>
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