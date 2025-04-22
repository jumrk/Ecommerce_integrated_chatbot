import React, { useState, useEffect } from 'react';
import { FiSave, FiPlus } from 'react-icons/fi';
import Loading from '../../../component/loading/loading';
import Notification from '../../../component/notification/Notification';
import { getShippingConfig, updateShippingConfig } from '../../../api/shippingCofig/shippingConfigService';
import { Helmet } from 'react-helmet';

const ShippingConfigPage = () => {
    const [loading, setLoading] = useState(false);
    const [configs, setConfigs] = useState(null);
    const [notification, setNotification] = useState({ message: '', type: '', visible: false });

    useEffect(() => {
        fetchConfig();
    }, []);

    const fetchConfig = async () => {
        setLoading(true);
        try {
            const data = await getShippingConfig();
            setConfigs(data);
        } catch (error) {
            setConfigs(null);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleMethodChange = (id, field, value) => {
        setConfigs(prev => {
            const updatedConfigs = {
                ...prev,
                methods: prev.methods.map(method =>
                    method.id === id ? { ...method, [field]: value } : method
                )
            };
            updateShippingConfig(updatedConfigs)
            console.log(`Phương thức ${id} - ${field} cập nhật thành: ${value}`);
            return updatedConfigs;
        });
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await updateShippingConfig(configs);
            setNotification({ message: 'Lưu cấu hình thành công', type: 'success', visible: true });
        } catch (error) {
            setNotification({ message: 'Lỗi khi lưu cấu hình', type: 'error', visible: true });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddMethod = () => {
        const newMethod = {
            id: `method_${Date.now()}`,
            name: 'Phương thức mới',
            enabled: true,
            description: 'Mô tả phương thức mới'
        };
        setConfigs(prev => ({
            ...prev,
            methods: prev ? [...prev.methods, newMethod] : [newMethod]
        }));
    };

    if (loading) return <Loading />;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <Helmet>
                <title>Cấu hình vận chuyển</title>
            </Helmet>
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Cấu hình vận chuyển
                    </h1>
                    <div className="flex gap-4">
                        <button
                            onClick={handleAddMethod}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                            <FiPlus /> Thêm phương thức
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            disabled={!configs}
                        >
                            <FiSave /> Lưu cấu hình
                        </button>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Phương thức vận chuyển
                        </h2>
                        {configs && configs.methods && configs.methods.length > 0 ? (
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
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-500 text-lg">Không tìm thấy cấu hình vận chuyển</p>
                                <p className="text-gray-400">Nhấn "Thêm phương thức" để tạo cấu hình mới</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {notification.visible && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification({ ...notification, visible: false })}
                />
            )}
        </div>
    );
};

export default ShippingConfigPage;