import React, { useState } from 'react';
import { FiSave, FiEye, FiEyeOff } from 'react-icons/fi';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../../component/common/LoadingSpinner';

const PaymentMethodConfigPage = () => {
    const [loading, setLoading] = useState(false);
    const [showSecrets, setShowSecrets] = useState({});

    const [configs, setConfigs] = useState({
        momo: {
            enabled: true,
            partnerCode: "MOMOXXXX",
            accessKey: "test_access_key",
            secretKey: "test_secret_key",
            environment: "sandbox",
            fee: 0
        },
        vnpay: {
            enabled: true,
            terminalId: "VNPAYXXXX",
            secretKey: "test_secret_key",
            environment: "sandbox",
            fee: 0
        },
        cod: {
            enabled: true,
            fee: 30000
        }
    });

    const toggleSecret = (key) => {
        setShowSecrets(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleChange = (method, field, value) => {
        setConfigs(prev => ({
            ...prev,
            [method]: {
                ...prev[method],
                [field]: value
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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
                        Cấu hình phương thức thanh toán
                    </h1>
                    <button
                        onClick={handleSubmit}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        <FiSave /> Lưu cấu hình
                    </button>
                </div>

                <div className="space-y-6">
                    {/* MoMo Config */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Cấu hình MoMo
                            </h2>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={configs.momo.enabled}
                                    onChange={(e) => handleChange('momo', 'enabled', e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Partner Code
                                </label>
                                <input
                                    type="text"
                                    value={configs.momo.partnerCode}
                                    onChange={(e) => handleChange('momo', 'partnerCode', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Access Key
                                </label>
                                <div className="relative">
                                    <input
                                        type={showSecrets.momoAccessKey ? 'text' : 'password'}
                                        value={configs.momo.accessKey}
                                        onChange={(e) => handleChange('momo', 'accessKey', e.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => toggleSecret('momoAccessKey')}
                                        className="absolute right-2 top-1/2 -translate-y-1/2"
                                    >
                                        {showSecrets.momoAccessKey ? (
                                            <FiEyeOff className="text-gray-500" />
                                        ) : (
                                            <FiEye className="text-gray-500" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Secret Key
                                </label>
                                <div className="relative">
                                    <input
                                        type={showSecrets.momoSecretKey ? 'text' : 'password'}
                                        value={configs.momo.secretKey}
                                        onChange={(e) => handleChange('momo', 'secretKey', e.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => toggleSecret('momoSecretKey')}
                                        className="absolute right-2 top-1/2 -translate-y-1/2"
                                    >
                                        {showSecrets.momoSecretKey ? (
                                            <FiEyeOff className="text-gray-500" />
                                        ) : (
                                            <FiEye className="text-gray-500" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Môi trường
                                </label>
                                <select
                                    value={configs.momo.environment}
                                    onChange={(e) => handleChange('momo', 'environment', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="sandbox">Sandbox</option>
                                    <option value="production">Production</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phí giao dịch (%)
                                </label>
                                <input
                                    type="number"
                                    value={configs.momo.fee}
                                    onChange={(e) => handleChange('momo', 'fee', parseFloat(e.target.value))}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    min="0"
                                    step="0.1"
                                />
                            </div>
                        </div>
                    </div>

                    {/* VNPay Config */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Cấu hình VNPay
                            </h2>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={configs.vnpay.enabled}
                                    onChange={(e) => handleChange('vnpay', 'enabled', e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Terminal ID
                                </label>
                                <input
                                    type="text"
                                    value={configs.vnpay.terminalId}
                                    onChange={(e) => handleChange('vnpay', 'terminalId', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Secret Key
                                </label>
                                <div className="relative">
                                    <input
                                        type={showSecrets.vnpaySecretKey ? 'text' : 'password'}
                                        value={configs.vnpay.secretKey}
                                        onChange={(e) => handleChange('vnpay', 'secretKey', e.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => toggleSecret('vnpaySecretKey')}
                                        className="absolute right-2 top-1/2 -translate-y-1/2"
                                    >
                                        {showSecrets.vnpaySecretKey ? (
                                            <FiEyeOff className="text-gray-500" />
                                        ) : (
                                            <FiEye className="text-gray-500" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Môi trường
                                </label>
                                <select
                                    value={configs.vnpay.environment}
                                    onChange={(e) => handleChange('vnpay', 'environment', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="sandbox">Sandbox</option>
                                    <option value="production">Production</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phí giao dịch (%)
                                </label>
                                <input
                                    type="number"
                                    value={configs.vnpay.fee}
                                    onChange={(e) => handleChange('vnpay', 'fee', parseFloat(e.target.value))}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    min="0"
                                    step="0.1"
                                />
                            </div>
                        </div>
                    </div>

                    {/* COD Config */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Cấu hình COD
                            </h2>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={configs.cod.enabled}
                                    onChange={(e) => handleChange('cod', 'enabled', e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Phí thu hộ (VNĐ)
                            </label>
                            <input
                                type="number"
                                value={configs.cod.fee}
                                onChange={(e) => handleChange('cod', 'fee', parseInt(e.target.value))}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                min="0"
                                step="1000"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentMethodConfigPage;