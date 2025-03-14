import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

// Dữ liệu mẫu
const mockCategories = [
    {
        id: 1,
        name: "Giày thể thao",
        description: "Các loại giày dành cho hoạt động thể thao",
        icon: "https://example.com/icons/sports-shoes.png", // Thay bằng URL thật hoặc để trống
        isActive: true,
        productCount: 25
    },
    {
        id: 2,
        name: "Giày công sở",
        description: "Giày da sang trọng phù hợp môi trường công sở",
        icon: "https://example.com/icons/formal-shoes.png",
        isActive: true,
        productCount: 15
    },
    {
        id: 3,
        name: "Giày casual",
        description: "Giày thời trang phù hợp đi chơi, dạo phố",
        icon: "https://example.com/icons/casual-shoes.png",
        isActive: false,
        productCount: 30
    },
    {
        id: 4,
        name: "Giày sandal",
        description: "Các loại sandal và dép",
        icon: "https://example.com/icons/sandals.png",
        isActive: true,
        productCount: 20
    }
];

export const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Giả lập fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                // Giả lập delay API
                await new Promise(resolve => setTimeout(resolve, 1000));
                setCategories(mockCategories);
            } catch (err) {
                setError('Có lỗi xảy ra khi tải danh sách danh mục');
                console.error('Error fetching categories:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const addCategory = async (categoryData) => {
        try {
            // Giả lập API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            const newCategory = {
                id: Math.max(...categories.map(c => c.id)) + 1,
                name: categoryData.name,
                description: categoryData.description,
                icon: categoryData.icon ? URL.createObjectURL(categoryData.icon) : null,
                isActive: categoryData.isActive,
                productCount: 0,
                createdAt: new Date().toISOString()
            };

            setCategories(prev => [...prev, newCategory]);
            toast.success('Thêm danh mục thành công');
            return newCategory;
        } catch (error) {
            console.error('Error adding category:', error);
            toast.error('Có lỗi xảy ra khi thêm danh mục');
            throw error;
        }
    };

    const updateCategory = async (id, categoryData) => {
        try {
            // Giả lập API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            const updatedCategory = {
                ...categories.find(cat => cat.id === id),
                ...categoryData,
                icon: categoryData.icon instanceof File
                    ? URL.createObjectURL(categoryData.icon)
                    : categoryData.icon,
                updatedAt: new Date().toISOString()
            };

            setCategories(prev =>
                prev.map(cat => cat.id === id ? updatedCategory : cat)
            );
            toast.success('Cập nhật danh mục thành công');
            return updatedCategory;
        } catch (error) {
            console.error('Error updating category:', error);
            toast.error('Có lỗi xảy ra khi cập nhật danh mục');
            throw error;
        }
    };

    const deleteCategory = async (id) => {
        try {
            // Giả lập API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            setCategories(prev => prev.filter(cat => cat.id !== id));
            toast.success('Xóa danh mục thành công');
        } catch (error) {
            console.error('Error deleting category:', error);
            toast.error('Có lỗi xảy ra khi xóa danh mục');
            throw error;
        }
    };

    return {
        categories,
        loading,
        error,
        addCategory,
        updateCategory,
        deleteCategory
    };
};