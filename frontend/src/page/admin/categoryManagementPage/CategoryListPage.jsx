import React, { useState } from 'react';
import { useCategories } from '../../../hooks/admin/categoryHook/useCategories';
import ConfirmDialog from '../../../component/common/ConfirmDialog';
import EditCategoryModal from '../../../component/admin/CategoryManagement/EditCategoryModal';
import LoadingSpinner from '../../../component/common/LoadingSpinner';
import ButtonEdit from '../../../component/button/ButtonEdit';
import ButtonDelete from '../../../component/button/ButtonDelete';
import Pagination from '../../../component/pagination/Pagination';
import StatusBadge from '../../../component/condition/ConditionCustom';
const CategoryListPage = () => {
    const {
        categories,
        loading,
        error,
        handleDeleteCategory,
        handleUpdateCategory
    } = useCategories();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCategories = categories.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const handleEdit = (category) => {
        setSelectedCategory(category);
        setShowEditModal(true);
    };

    const handleDelete = (category) => {
        setSelectedCategory(category);
        setShowConfirmDelete(true);
    };

    const confirmDelete = async () => {
        if (selectedCategory) {
            await handleDeleteCategory(selectedCategory.id);
            setShowConfirmDelete(false);
            setSelectedCategory(null);
        }
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Quản lý danh mục</h1>
                </div>

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
                                    Số sản phẩm
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Trạng thái
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentCategories.map((category) => (
                                <tr key={category.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            {category.icon && (
                                                <img
                                                    src={category.icon}
                                                    alt=""
                                                    className="w-8 h-8 rounded-full mr-3"
                                                />
                                            )}
                                            <div className="text-sm font-medium text-gray-900">
                                                {category.name}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-500 line-clamp-2">
                                            {category.description || 'Không có mô tả'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {category.productCount || 0}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {category.isActive ? <StatusBadge type="success" text="Hoạt động" /> :
                                            <StatusBadge type="danger" text="Ẩn" />}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end gap-3">
                                            <ButtonEdit
                                                onClick={() => handleEdit(category)}
                                            />
                                            <ButtonDelete
                                                onClick={() => handleDelete(category)}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Pagination
                        currentPage={currentPage}
                        totalItems={categories.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>

            <EditCategoryModal
                isOpen={showEditModal}
                category={selectedCategory}
                onClose={() => {
                    setShowEditModal(false);
                    setSelectedCategory(null);
                }}
                onUpdate={handleUpdateCategory}
            />

            <ConfirmDialog
                isOpen={showConfirmDelete}
                title="Xác nhận xóa"
                message={`Bạn có chắc chắn muốn xóa danh mục "${selectedCategory?.name}"? Hành động này không thể hoàn tác.`}
                onClose={() => setShowConfirmDelete(false)}
                onConfirm={confirmDelete}
            />
        </div>
    );
};

export default CategoryListPage;