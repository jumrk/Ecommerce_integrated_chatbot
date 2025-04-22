import React, { useEffect, useState } from 'react';
import { getCategories } from '../../../../api/category/categoryProduct';
const BasicInformation = ({ formData, onChange }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const category = await getCategories();
                setCategories(category);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }
        fetchCategories();
    }, [])
    return (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Thông tin cơ bản</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tên sản phẩm
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={onChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nhập tên sản phẩm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Giá sản phẩm
                    </label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={onChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nhập giá sản phẩm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        % Giảm giá
                    </label>
                    <input
                        type="number"
                        name="discount"
                        value={formData.discount}
                        onChange={onChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nhập % giảm giá"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Danh mục
                    </label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={onChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Chọn danh mục</option>
                        {categories.map((cat) => (
                            cat.status && (
                                < option key={cat._id} value={cat._id} >
                                    {cat.name}
                                </option>
                            )
                        ))}
                    </select>
                </div>
            </div>
        </div >
    );
};

export default BasicInformation;