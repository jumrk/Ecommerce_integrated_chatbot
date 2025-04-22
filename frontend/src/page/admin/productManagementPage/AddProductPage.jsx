import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BasicInformation from '../../../component/admin/productManagement/addProduct/BasicInformation';
import ImageUpload from '../../../component/admin/productManagement/addProduct/ImageUpload';
import ProductVariants from '../../../component/admin/productManagement/addProduct/ProductVariants';
import ProductSpecifications from '../../../component/admin/productManagement/addProduct/ProductSpecifications';
import Loading from '../../../component/loading/loading';
import ConfirmDialog from '../../../component/common/ConfirmDialog';
import { useProductVariants } from '../../../hooks/admin/addProductHook/useProductVariants';
import { addProduct } from '../../../api/product/productService';
import Notification from '../../../component/notification/Notification';
import { Helmet } from 'react-helmet';

const AddProductPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const [notification, setNotification] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        discount: '',
        description: '',
        specifications: {
            material: '',
            style: '',
            origin: '',
            washCare: ''
        }
    });

    const [errors, setErrors] = useState({});
    const [images, setImages] = useState([]);
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
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSpecificationsChange = (e) => {
        const { name, value } = e.target;
        if (name === 'description') {
            setFormData(prev => ({
                ...prev,
                description: value
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                specifications: {
                    ...prev.specifications,
                    [name]: value
                }
            }));
        }
        setHasChanges(true);
    };

    // Hàm kiểm tra form có hợp lệ không
    const isFormValid = () => {
        const isBasicInfoValid =
            formData.name.trim() &&
            formData.price &&
            formData.category;

        const isImageValid = images.length > 0;

        const isVariantsValid =
            productVariants.colors.length > 0 &&
            (productVariants.productType === 'simple' || productVariants.sizes.length > 0);

        const isStockValid = Object.values(productVariants.stock).some(value => value > 0);

        return isBasicInfoValid && isImageValid && isVariantsValid && isStockValid;
    };

    const handleSubmit = async () => {
        // Không cần validateForm() và toast.error nữa vì nút đã bị khóa nếu form không hợp lệ
        try {
            setIsLoading(true);

            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('price', formData.price);
            formDataToSend.append('category', formData.category);
            formDataToSend.append('discount', formData.discount || 0); // Gán mặc định nếu không nhập
            formDataToSend.append('description', formData.description);
            formDataToSend.append('specifications', JSON.stringify(formData.specifications));
            formDataToSend.append('productType', productVariants.productType);
            formDataToSend.append('colors', JSON.stringify(productVariants.colors));
            formDataToSend.append('sizes', JSON.stringify(productVariants.sizes));
            formDataToSend.append('stock', JSON.stringify(productVariants.stock));

            images.forEach(image => {
                formDataToSend.append('images', image.file);
            });

            const response = await addProduct(formDataToSend);
            setNotification({
                message: response.message,
                type: !response.success ? 'error' : 'success'
            });
            setTimeout(() => {
                setHasChanges(false);
                navigate('/admin/products/list-product');
            }, 3000);
        } catch (error) {
            console.error('Error adding product:', error);
            setNotification({
                message: 'Có lỗi xảy ra khi thêm sản phẩm',
                type: 'error'
            });
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

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file)
        }));
        setImages((prev) => [...prev, ...newImages]);
        setHasChanges(true);
    };

    const close = () => {
        setNotification(null);
    };

    const removeImage = (imageToRemove) => {
        URL.revokeObjectURL(imageToRemove.preview);
        setImages((prev) => prev.filter((image) => image.preview !== imageToRemove.preview));
        setHasChanges(true);
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <Helmet>
                <title>Thêm sản phẩm</title>
            </Helmet>
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={close}
                />
            )}
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
                        disabled={isLoading || !isFormValid()} // Khóa nút nếu form không hợp lệ
                        className={`px-6 py-2 bg-blue-600 text-white rounded-lg transition-colors
                            ${isLoading || !isFormValid() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                    >
                        {isLoading ? 'Đang xử lý...' : 'Thêm sản phẩm'}
                    </button>
                </div>
            </div>

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