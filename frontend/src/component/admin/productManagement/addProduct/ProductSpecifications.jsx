import React from 'react';

const ProductSpecifications = ({ specifications, description, onChange }) => {
    const handleSpecChange = (e) => {
        const { name, value } = e.target;
        onChange({
            target: {
                name: 'specifications',
                value: {
                    ...specifications,
                    [name]: value
                }
            }
        });
    };

    return (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Mô tả và thông số</h2>
            <div className="grid grid-cols-1 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mô tả sản phẩm
                    </label>
                    <textarea
                        name="description"
                        value={description}
                        onChange={onChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                        placeholder="Nhập mô tả sản phẩm"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Chất liệu
                        </label>
                        <input
                            type="text"
                            name="material"
                            value={specifications.material}
                            onChange={handleSpecChange}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Ví dụ: Canvas, đế cao su"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Kiểu dáng
                        </label>
                        <input
                            type="text"
                            name="style"
                            value={specifications.style}
                            onChange={handleSpecChange}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Ví dụ: Classic"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Xuất xứ
                        </label>
                        <input
                            type="text"
                            name="origin"
                            value={specifications.origin}
                            onChange={handleSpecChange}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Ví dụ: Việt Nam"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Hướng dẫn bảo quản
                        </label>
                        <input
                            type="text"
                            name="washCare"
                            value={specifications.washCare}
                            onChange={handleSpecChange}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Ví dụ: Lau chùi bằng khăn ẩm"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductSpecifications;