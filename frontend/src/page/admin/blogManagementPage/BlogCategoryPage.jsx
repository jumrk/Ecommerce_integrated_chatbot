import React, { useState } from 'react';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import LoadingSpinner from '../../../component/common/LoadingSpinner';
import ConfirmDialog from '../../../component/common/ConfirmDialog';
import { toast } from 'react-toastify';
import ButtonEdit from '../../../component/button/ButtonEdit';
import ButtonDelete from '../../../component/button/ButtonDelete';
const BlogCategoryPage = () => {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([
        { id: 1, name: 'Xu hướng', description: 'Các bài viết về xu hướng thời trang', postCount: 15 },
        { id: 2, name: 'Thời trang', description: 'Bài viết về thời trang', postCount: 10 },
        { id: 3, name: 'Lifestyle', description: 'Phong cách sống', postCount: 8 },
    ]);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: '', description: '' });
    const [editingId, setEditingId] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name) {
            toast.error('Vui lòng nhập tên danh mục');
            return;
        }

        try {
            setLoading(true);
            // API call to save/update category
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (editingId) {
                setCategories(categories.map(cat =>
                    cat.id === editingId ? { ...cat, ...formData } : cat
                ));
                toast.success('Cập nhật danh mục thành công');
            } else {
                setCategories([...categories, { id: Date.now(), ...formData, postCount: 0 }]);
                toast.success('Thêm danh mục thành công');
            }

            resetForm();
        } catch (error) {
            toast.error('Có lỗi xảy ra');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (category) => {
        setFormData({ name: category.name, description: category.description });
        setEditingId(category.id);
        setShowForm(true);
    };

    const handleDelete = (category) => {
        setSelectedCategory(category);
        setShowConfirmDelete(true);
    };

    const confirmDelete = async () => {
        try {
            setLoading(true);
            // API call to delete category
            await new Promise(resolve => setTimeout(resolve, 1000));
            setCategories(categories.filter(cat => cat.id !== selectedCategory.id));
            toast.success('Xóa danh mục thành công');
        } catch (error) {
            toast.error('Có lỗi xảy ra khi xóa danh mục');
        } finally {
            setLoading(false);
            setShowConfirmDelete(false);
            setSelectedCategory(null);
        }
    };

    const resetForm = () => {
        setFormData({ name: '', description: '' });
        setEditingId(null);
        setShowForm(false);
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Quản lý danh mục</h1>
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        <FiPlus /> Thêm danh mục
                    </button>
                </div>

                {showForm && (
                    <div className="bg-white rounded-lg shadow p-6 mb-6">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tên danh mục *
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nhập tên danh mục"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Mô tả
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nhập mô tả danh mục"
                                    rows="3"
                                />
                            </div>
                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    {editingId ? 'Cập nhật' : 'Thêm mới'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tên danh mục
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Mô tả
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Số bài viết
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {categories.map((category) => (
                                <tr key={category.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {category.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-500 line-clamp-2">
                                            {category.description}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {category.postCount} bài viết
                                    </td>
                                    <td className="flex items-center gap-2 mt-2 justify-end whitespace-nowrap text-right text-sm font-medium">
                                        <ButtonEdit
                                            onClick={() => handleEdit(category)}
                                        />
                                        <ButtonDelete
                                            onClick={() => handleDelete(category)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Confirm Delete Dialog */}
            <ConfirmDialog
                isOpen={showConfirmDelete}
                title="Xác nhận xóa"
                message={`Bạn có chắc chắn muốn xóa danh mục "${selectedCategory?.name}"?`}
                onClose={() => setShowConfirmDelete(false)}
                onConfirm={confirmDelete}
            />
        </div >
    );
};

export default BlogCategoryPage;