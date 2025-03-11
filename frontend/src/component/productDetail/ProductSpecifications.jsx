import React from 'react';

const ProductSpecifications = ({ specifications }) => {
    return (
        <div className="mt-6 p6">
            <h2 className="text-xl font-semibold mb-4">Thông số sản phẩm</h2>
            <div className="space-y-2">
                {Object.entries(specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b">
                        <span className="font-medium capitalize">{key}</span>
                        <span className="text-gray-600">{value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductSpecifications;