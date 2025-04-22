import React from 'react';

const StockTable = ({ productType, colors, sizes, stock, updateStock, error }) => {
    return (
        <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Quản lý tồn kho
            </label>
            <div className="overflow-x-auto">
                <table className="min-w-full border">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="py-2 px-4 border-b">Kích thước / Màu</th>
                            {colors.map((color) => (
                                <th key={color.value} className="py-2 px-4 border-b">
                                    <div className="flex items-center justify-center gap-2">
                                        <div
                                            className="w-4 h-4 rounded-full"
                                            style={{ backgroundColor: color.value }}
                                        />
                                        {color.name}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {productType === 'simple' ? (
                            <tr>
                                <td className="py-2 px-4 border-b font-medium">simple</td>
                                {colors.map((color) => (
                                    <td key={`simple-${color.value}`} className="py-2 px-4 border-b">
                                        <input
                                            type="number"
                                            min="0"
                                            value={stock[`simple-${color.value}`] || ''}
                                            onChange={(e) => updateStock('simple', color.value, e.target.value)}
                                            className="border focus:outline-none rounded px-2 py-1 w-full text-center"
                                        />
                                    </td>
                                ))}
                            </tr>
                        ) : (
                            sizes.map((size) => (
                                <tr key={size}>
                                    <td className="py-2 px-4 border-b font-medium">{size}</td>
                                    {colors.map((color) => (
                                        <td key={`${size}-${color.value}`} className="py-2 px-4 border-b">
                                            <input
                                                type="number"
                                                min="0"
                                                value={stock[`${size}-${color.value}`] || ''}
                                                onChange={(e) => updateStock(size, color.value, e.target.value)}
                                                className="border focus:outline-none rounded px-2 py-1 w-full text-center"
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default StockTable;