import { useState, useEffect } from 'react';
import { getCategories, deleteCategory, updateCategory } from '../../../api/category/categoryProduct';
export const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState(null)
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const data = await getCategories();
                setCategories(data);
            } catch (err) {
                setNotification({ message: "Không thể tải danh mục. Vui lòng thử lại sau.", type: "error" })
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const handleDeleteCategory = async (id) => {
        try {
            const res = await deleteCategory(id); // Gọi API xóa danh mục
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setNotification({ message: res.message, type: "success" })
                setCategories((prev) => prev.filter((category) => category._id !== id)); // Xóa danh mục khỏi danh sách
            }, 2000);

        } catch (err) {
            setNotification({ message: "Không thể xóa danh mục. Vui lòng thử lại sau", type: "error" })
        }
    };
    const closeNotification = () => {
        setNotification(null)
    }
    const onSaveEdit = async (dataEdit, formDataToSend, closeFormEdit) => {
        try {
            if (!dataEdit || !dataEdit._id) {
                throw new Error('ID danh mục không hợp lệ!');
            }

            // Gọi API cập nhật danh mục
            const updatedCategory = await updateCategory(dataEdit._id, formDataToSend);

            closeFormEdit();
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                // Cập nhật danh sách danh mục trong giao diện
                setCategories((prev) =>
                    prev.map((category) =>
                        category._id === updatedCategory._id ? updatedCategory : category
                    )
                );

                // Hiển thị thông báo thành công
                closeNotification();
                setNotification({ message: 'Cập nhật danh mục thành công!', type: 'success' });

                // Đóng modal chỉnh sửa
            }, 2000);
        } catch (error) {
            console.error('Lỗi khi cập nhật danh mục:', error);
            setNotification({ message: 'Có lỗi xảy ra khi cập nhật danh mục!', type: 'error' });
        }
    };
    return {
        categories,
        loading,
        handleDeleteCategory,
        notification,
        closeNotification,
        onSaveEdit
    };
};