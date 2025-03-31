import React, { useState } from 'react';
import { FiSave, FiPlus, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../../component/common/LoadingSpinner';

const ShippingConfigPage = () => {
    const [loading, setLoading] = useState(false);
    const [configs, setConfigs] = useState({
        methods: [
            {
                id: 'internal',
                name: 'Giao hàng nội bộ',
                enabled: true,
                description: 'Giao hàng bởi đội ngũ shipper của cửa hàng'
            },
            {
                id: 'store_pickup',
                name: 'Nhận tại cửa hàng',
                enabled: true,
                description: 'Khách hàng đến cửa hàng nhận hàng'
            },
            {
                id: 'cod',
                name: 'Ship COD',
                enabled: true,
                description: 'Giao hàng và thu tiền tận nơi'
            }
        ],
        areas: [
            {
                district: 'Quận 1',
                fee: 15000,
                estimatedTime: '1-2 ngày'
            },
            {
                district: 'Quận 3',
                fee: 20000,
                estimatedTime: '1-2 ngày'
            }
        ]
    });

    const handleMethodChange = (id, field, value) => {
        setConfigs(prev => ({
            ...prev,
            methods: prev.methods.map(method =>
                method.id === id ? { ...method, [field]: value } : method
            )
        }));
    };

    const handleAreaChange = (index, field, value) => {
        setConfigs(prev => ({
            ...prev,
            areas: prev.areas.map((area, i) =>
                i === index ? { ...area, [field]: value } : area
            )
        }));
    };

    const addArea = () => {
        setConfigs(prev => ({
            ...prev,
            areas: [...prev.areas, {
                district: '',
                fee: 0,
                estimatedTime: ''
            }]
        }));
    };

    const removeArea = (index) => {
        setConfigs(prev => ({
            ...prev,
            areas: prev.areas.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            // API call để lưu cấu hình
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast.success('Lưu cấu hình thành công');
        } catch (error) {
            toast.error('Có lỗi xảy ra khi lưu cấu hình');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Cấu hình vận chuyển
                    </h1>
                    <button
                        onClick={handleSubmit}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        <FiSave /> Lưu cấu hình
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Shipping Methods */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Phương thức vận chuyển
                        </h2>
                        <div className="space-y-4">
                            {configs.methods.map((method) => (
                                <div key={method.id} className="flex items-start space-x-4">
                                    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                                        <input
                                            type="checkbox"
                                            checked={method.enabled}
                                            onChange={(e) => handleMethodChange(method.id, 'enabled', e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            value={method.name}
                                            onChange={(e) => handleMethodChange(method.id, 'name', e.target.value)}
                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                                        />
                                        <input
                                            type="text"
                                            value={method.description}
                                            onChange={(e) => handleMethodChange(method.id, 'description', e.target.value)}
                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Mô tả"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Shipping Areas */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Phí vận chuyển theo khu vực
                            </h2>
                            <button
                                onClick={addArea}
                                className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
                            >
                                <FiPlus /> Thêm khu vực
                            </button>
                        </div>
                        <div className="space-y-4">
                            {configs.areas.map((area, index) => (
                                <div key={index} className="flex gap-4 items-start">
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            value={area.district}
                                            onChange={(e) => handleAreaChange(index, 'district', e.target.value)}
                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Tên quận/huyện"
                                        />
                                    </div>
                                    <div className="w-32">
                                        <input
                                            type="number"
                                            value={area.fee}
                                            onChange={(e) => handleAreaChange(index, 'fee', parseInt(e.target.value))}
                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Phí ship"
                                        />
                                    </div>
                                    <div className="w-40">
                                        <input
                                            type="text"
                                            value={area.estimatedTime}
                                            onChange={(e) => handleAreaChange(index, 'estimatedTime', e.target.value)}
                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Thời gian dự kiến"
                                        />
                                    </div>
                                    <button
                                        onClick={() => removeArea(index)}
                                        className="p-2 text-red-600 hover:text-red-800"
                                    >
                                        <FiTrash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShippingConfigPage;