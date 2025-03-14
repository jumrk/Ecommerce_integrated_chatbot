import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BasicInformation from '../../../component/admin/productManagement/addProduct/BasicInformation';
import ImageUpload from '../../../component/admin/productManagement/addProduct/ImageUpload';
import ProductVariants from '../../../component/admin/productManagement/addProduct/ProductVariants';
import ProductSpecifications from '../../../component/admin/productManagement/addProduct/ProductSpecifications';
import LoadingSpinner from '../../../component/common/LoadingSpinner';
import ConfirmDialog from '../../../component/common/ConfirmDialog';
import { useImageUpload } from '../../../hooks/admin/addProductHook/useImageUpload';
import { useProductVariants } from '../../../hooks/admin/addProductHook/useProductVariants';

const AddProductPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        description: '',
        specifications: {
            material: '',
            style: '',
            origin: '',
            washCare: ''
        }
    });

    const [errors, setErrors] = useState({});
    const { images, handleImageChange, removeImage } = useImageUpload();
    const productVariants = useProductVariants();

    // Theo dõi thay đổi form
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (hasChanges) {
                e.preventDefault();
                e.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [hasChanges]);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setHasChanges(true);
        // Xóa lỗi khi người dùng sửa
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSpecificationsChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            specifications: {
                ...prev.specifications,
                [name]: value
            }
        }));
        setHasChanges(true);
    };

    const validateForm = () => {
        const newErrors = {};

        // Validate basic information
        if (!formData.name.trim()) newErrors.name = 'Vui lòng nhập tên sản phẩm';
        if (!formData.price) newErrors.price = 'Vui lòng nhập giá sản phẩm';
        if (!formData.category) newErrors.category = 'Vui lòng chọn danh mục';

        // Validate images
        if (images.length === 0) newErrors.images = 'Vui lòng thêm ít nhất một hình ảnh';

        // Validate variants
        if (productVariants.colors.length === 0) {
            newErrors.colors = 'Vui lòng thêm ít nhất một màu sắc';
        }

        if (productVariants.productType === 'variable' && productVariants.sizes.length === 0) {
            newErrors.sizes = 'Vui lòng thêm ít nhất một kích thước';
        }

        // Validate stock
        const hasStock = Object.values(productVariants.stock).some(value => value > 0);
        if (!hasStock) newErrors.stock = 'Vui lòng nhập số lượng tồn kho';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            toast.error('Vui lòng kiểm tra lại thông tin sản phẩm');
            return;
        }

        try {
            setIsLoading(true);
            const productData = {
                ...formData,
                images,
                productType: productVariants.productType,
                colors: productVariants.colors,
                sizes: productVariants.sizes,
                stock: productVariants.stock,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            // Gọi API để lưu sản phẩm
            // await addProduct(productData);

            toast.success('Thêm sản phẩm thành công');
            setHasChanges(false);
            navigate('/admin/products');
        } catch (error) {
            console.error('Error adding product:', error);
            toast.error('Có lỗi xảy ra khi thêm sản phẩm');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        if (hasChanges) {
            setShowConfirmDialog(true);
        } else {
            navigate('/admin/products');
        }
    };

    const handleConfirmCancel = () => {
        setShowConfirmDialog(false);
        setHasChanges(false);
        navigate('/admin/products');
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Thêm sản phẩm mới</h1>

                <BasicInformation
                    formData={formData}
                    onChange={handleFormChange}
                    errors={errors}
                />

                <ImageUpload
                    images={images}
                    onImageChange={handleImageChange}
                    onRemoveImage={removeImage}
                    error={errors.images}
                />

                <ProductVariants
                    {...productVariants}
                    errors={errors}
                />

                <ProductSpecifications
                    specifications={formData.specifications}
                    description={formData.description}
                    onChange={handleSpecificationsChange}
                />

                <div className="flex justify-end space-x-4">
                    <button
                        onClick={handleCancel}
                        className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className={`px-6 py-2 bg-blue-600 text-white rounded-lg transition-colors
                            ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                    >
                        {isLoading ? 'Đang xử lý...' : 'Thêm sản phẩm'}
                    </button>
                </div>
            </div>

            {/* Confirm Dialog */}
            <ConfirmDialog
                isOpen={showConfirmDialog}
                onClose={() => setShowConfirmDialog(false)}
                onConfirm={handleConfirmCancel}
                title="Xác nhận hủy"
                message="Bạn có chắc muốn hủy? Tất cả thay đổi sẽ không được lưu."
            />
        </div>
    );
};

export default AddProductPage;