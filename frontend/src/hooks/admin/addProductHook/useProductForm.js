import { useState } from 'react';

export const useProductForm = () => {
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

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        if (name === 'specifications') {
            setFormData(prev => ({
                ...prev,
                specifications: {
                    ...prev.specifications,
                    ...value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const resetForm = () => {
        setFormData({
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
    };

    return {
        formData,
        setFormData,
        handleFormChange,
        resetForm
    };
};