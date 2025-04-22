import React, { useState, useEffect } from 'react';
import BasicInformation from './addProduct/BasicInformation';
import ImageUpload from './addProduct/ImageUpload';
import ProductVariants from './addProduct/ProductVariants';
import ProductSpecifications from './addProduct/ProductSpecifications';
import Notification from '../../notification/Notification';

const EditProductModal = ({ isOpen, onClose, product, onSave }) => {
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
        },
        stock: {}
    });
    const [productType, setProductType] = useState('variable');
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [stock, setStock] = useState({});
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [selectedColor, setSelectedColor] = useState('#000000');
    const [images, setImages] = useState([]);
    const [notification, setNotification] = useState(null);
    const [errors, setErrors] = useState({});
    const [hasChanges, setHasChanges] = useState(false);
    const [deletedImages, setDeletedImages] = useState([]);

    useEffect(() => {
        if (product) {
            setFormData({
                _id: product._id,
                name: product.name || '',
                price: product.price || '',
                category: product.category?._id || '',
                discount: product.discount || '',
                description: product.description || '',
                specifications: product.specifications || {
                    material: '',
                    style: '',
                    origin: '',
                    washCare: ''
                }
            });

            // Xử lý stock và trích xuất colors, sizes
            const stockEntries = Object.entries(product.stock || {});
            const extractedSizes = new Set();

            // Xử lý colors từ product.colors nếu có
            const productColors = product.colors?.map(color => ({
                value: color.value || color, // Nếu color là object thì lấy value, nếu không thì lấy trực tiếp
                name: color.name || color // Nếu color là object thì lấy name, nếu không thì lấy trực tiếp
            })) || [];

            // Xử lý sizes từ stockEntries
            stockEntries.forEach(([key]) => {
                const [size] = key.split('-');
                extractedSizes.add(size);
            });

            setStock(product.stock || {});
            setColors(productColors);
            setSizes(Array.from(extractedSizes));
            setSelectedColor(productColors[0]?.value || '#000000');
            setImages(product.images?.map(img => ({
                url: img,
                preview: `http://localhost:5000/${img}`
            })) || []);
        }
    }, [product]);

    const handleAddColor = (value, name) => {
        const newColor = {
            value: value,
            name: name || value // Nếu không có name thì dùng value làm name
        };
        setColors(prevColors => [...prevColors, newColor]);
        setSelectedColor(value);
        setHasChanges(true);
    };

    const handleRemoveColor = (colorToRemove) => {
        setColors(colors.filter(color => color.value !== colorToRemove.value));
        // Xóa stock liên quan đến màu này
        const newStock = { ...stock };
        Object.keys(newStock).forEach(key => {
            if (key.includes(colorToRemove.value)) {
                delete newStock[key];
            }
        });
        setStock(newStock);
        setHasChanges(true);
    };

    const handleAddSize = (newSize) => {
        setSizes([...sizes, newSize]);
        setHasChanges(true);
    };

    const handleRemoveSize = (sizeToRemove) => {
        setSizes(sizes.filter(size => size !== sizeToRemove));
        // Xóa stock liên quan đến size này
        const newStock = { ...stock };
        Object.keys(newStock).forEach(key => {
            if (key.startsWith(`${sizeToRemove}-`)) {
                delete newStock[key];
            }
        });
        setStock(newStock);
        setHasChanges(true);
    };

    const updateStock = (size, color, value) => {
        const stockKey = `${size}-${color}`;
        setStock(prev => ({
            ...prev,
            [stockKey]: parseInt(value) || 0
        }));
        setHasChanges(true);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
        setHasChanges(true);
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const handleSpecificationsChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            specifications: {
                ...prev.specifications,
                [name]: value
            }
        }));
        setHasChanges(true);
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

    const removeImage = (imageToRemove) => {
        if (imageToRemove.file && imageToRemove.preview) {
            // Xóa URL của ảnh mới
            URL.revokeObjectURL(imageToRemove.preview);
        } else {
            // Thêm ảnh từ backend vào danh sách đã xóa
            setDeletedImages((prev) => [...prev, imageToRemove.url]);
        }

        setImages((prev) => prev.filter((image) => image.preview !== imageToRemove.preview));
        setHasChanges(true);
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.price || !formData.category) {
            setErrors({
                name: !formData.name ? 'Tên sản phẩm là bắt buộc' : '',
                price: !formData.price ? 'Giá sản phẩm là bắt buộc' : '',
                category: !formData.category ? 'Danh mục là bắt buộc' : ''
            });
            return;
        }

        try {
            const productToUpdate = {
                ...formData,
                _id: product._id,
                images: images.map(img => img.url || img.file),
                deletedImages,
                stock,
                colors,
                sizes
            };

            await onSave(productToUpdate);
            setNotification({
                type: 'success',
                message: 'Cập nhật sản phẩm thành công'
            });

            setTimeout(() => {
                onClose();
            }, 2000);
        } catch (error) {
            setNotification({
                type: 'error',
                message: error.message || 'Có lỗi xảy ra khi cập nhật sản phẩm'
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-4xl">
                <h2 className="text-xl font-bold mb-4">Chỉnh sửa sản phẩm</h2>
                <div className="max-h-[70vh] overflow-y-auto custom-scrollbar">
                    <BasicInformation
                        formData={formData}
                        onChange={handleFormChange}
                        errors={errors}
                    />

                    <ImageUpload
                        images={images}
                        onImageChange={handleImageChange}
                        onRemoveImage={removeImage}
                    />

                    <ProductVariants
                        productType={productType}
                        colors={colors}
                        sizes={sizes}
                        stock={stock}
                        showColorPicker={showColorPicker}
                        selectedColor={selectedColor}
                        setProductType={setProductType}
                        handleAddColor={handleAddColor}
                        handleRemoveColor={handleRemoveColor}
                        handleAddSize={handleAddSize}
                        handleRemoveSize={handleRemoveSize}
                        setShowColorPicker={setShowColorPicker}
                        setSelectedColor={setSelectedColor}
                        updateStock={updateStock}
                        errors={errors}
                    />

                    <ProductSpecifications
                        specifications={formData.specifications}
                        description={formData.description}
                        onChange={handleSpecificationsChange}
                    />
                </div>

                <div className="flex justify-end space-x-4 mt-4">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Lưu thay đổi
                    </button>
                </div>

                {notification && (
                    <Notification
                        message={notification.message}
                        type={notification.type}
                        onClose={() => setNotification(null)}
                    />
                )}
            </div>
        </div>
    );
};

export default EditProductModal;