import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { register } from '../../api/auth/registerAPI';
import { validateField } from '../../utils/validateFiled';
import { ClipLoader } from "react-spinners";
import Notification from '../../component/notification/Notification';
import { Helmet } from 'react-helmet';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });
    const [notification, setNotification] = useState({
        isOpen: false,
        message: '',
        type: 'info',
    });
    const [errors, setErrors] = useState({});
    const isFormValid =
        formData.fullName &&
        formData.email &&
        formData.phone &&
        formData.password &&
        formData.confirmPassword &&
        Object.values(errors).every(error => error === "");


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: validateField(name, value, formData) });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await register(formData);
            setNotification({
                isOpen: true,
                message: response.message,
                type: response.success ? 'success' : 'error',
            });
            if (response.success) {

                setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    password: '',
                    confirmPassword: '',
                });
                setErrors({});
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            }
        } catch (error) {
            setNotification({
                isOpen: true,
                message: 'Đã xảy ra lỗi khi đăng ký!',
                type: 'error',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const closeNotification = () => {
        setNotification({ ...notification, isOpen: false });
    };

    return (
        <div>
            {notification.isOpen && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                    onClose={closeNotification}
                />
            )}
            <Helmet>
                <title>Đăng ký</title>
            </Helmet>


            <div className="min-h-screen  bg-gradient-to-br  from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
                {/* Các phần tử trang trí */}
                <div className="absolute w-full h-full">
                    <motion.div
                        className="absolute top-10 left-10 w-20 h-20 bg-purple-200 rounded-full"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute bottom-10 right-10 w-32 h-32 bg-blue-200 rounded-full"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 4, repeat: Infinity }}
                    />
                </div>

                <div className="max-w-6xl w-full  flex rounded-2xl shadow-2xl overflow-hidden bg-white relative z-10">
                    {/* Left Side - Image */}
                    <div
                        className="hidden lg:block w-1/2 bg-cover bg-center"
                        style={{
                            backgroundImage: `url('https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')`,
                        }}
                    >
                        <div className="h-full w-full bg-blue-500 bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="text-white text-center p-8"
                            >
                                <h2 className="text-4xl font-bold mb-4">Chào mừng bạn!</h2>
                                <p className="text-lg">Tham gia cùng chúng tôi ngay hôm nay</p>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full lg:w-1/2 p-8 md:p-12"
                    >
                        <div className="text-center mb-8">
                            <h2 className="text-4xl font-bold text-gray-800 mb-2">Đăng ký</h2>
                            <p className="text-gray-600">
                                Đã có tài khoản?{' '}
                                <Link
                                    to="/login"
                                    className="text-blue-600 hover:text-blue-700 font-medium transition duration-300"
                                >
                                    Đăng nhập
                                </Link>
                            </p>
                        </div>

                        <div className="space-y-4 ">
                            <motion.div whileHover={{ scale: 1.01 }} className="group">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                                    placeholder="Nhập họ và tên"
                                    value={formData.fullName}
                                    name="fullName"
                                    onChange={handleChange}
                                />
                                <motion.p
                                    className="text-red-500 text-sm mt-1 overflow-hidden"
                                    initial={{ opacity: 0, minHeight: 0, height: 0 }}
                                    animate={{ opacity: errors.name ? 1 : 0, minHeight: errors.name ? "20px" : 0, height: errors.name ? "auto" : 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    {errors.name}
                                </motion.p>
                            </motion.div>

                            <div className="flex gap-3 w-full">
                                <motion.div whileHover={{ scale: 1.01 }} className="group">
                                    <label className="text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                                        placeholder="Nhập email của bạn"
                                        value={formData.email}
                                        name="email"
                                        onChange={handleChange}
                                    />
                                    <motion.p
                                        className="text-red-500 text-sm mt-1 overflow-hidden"
                                        initial={{ opacity: 0, minHeight: 0, height: 0 }}
                                        animate={{ opacity: errors.email ? 1 : 0, minHeight: errors.email ? "20px" : 0, height: errors.email ? "auto" : 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        {errors.email}
                                    </motion.p>


                                </motion.div>
                                <motion.div whileHover={{ scale: 1.01 }} className="group">
                                    <label className="text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                                        placeholder="Nhập số điện thoại của bạn"
                                        value={formData.phone}
                                        name="phone"
                                        onChange={handleChange}
                                    />
                                    <motion.p
                                        className="text-red-500 text-sm mt-1 overflow-hidden"
                                        initial={{ opacity: 0, minHeight: 0, height: 0 }}
                                        animate={{ opacity: errors.phone ? 1 : 0, minHeight: errors.phone ? "20px" : 0, height: errors.phone ? "auto" : 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        {errors.phone}
                                    </motion.p>

                                </motion.div>
                            </div>

                            <motion.div whileHover={{ scale: 1.01 }} className="group">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu</label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                                    placeholder="Nhập mật khẩu"
                                    value={formData.password}
                                    name="password"
                                    onChange={handleChange}
                                />
                                <motion.p
                                    className="text-red-500 text-sm mt-1 overflow-hidden"
                                    initial={{ opacity: 0, minHeight: 0, height: 0 }}
                                    animate={{ opacity: errors.password ? 1 : 0, minHeight: errors.password ? "20px" : 0, height: errors.password ? "auto" : 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    {errors.password}
                                </motion.p>

                            </motion.div>

                            <motion.div whileHover={{ scale: 1.01 }} className="group">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Xác nhận mật khẩu</label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                                    placeholder="Nhập lại mật khẩu"
                                    value={formData.confirmPassword}
                                    name="confirmPassword"
                                    onChange={handleChange}
                                />
                                <motion.p
                                    className="text-red-500 text-sm mt-1 overflow-hidden"
                                    initial={{ opacity: 0, minHeight: 0, height: 0 }}
                                    animate={{ opacity: errors.confirmPassword ? 1 : 0, minHeight: errors.confirmPassword ? "20px" : 0, height: errors.confirmPassword ? "auto" : 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    {errors.confirmPassword}
                                </motion.p>

                            </motion.div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    required
                                />
                                <label className="ml-2 block text-sm text-gray-900">
                                    Tôi đồng ý với{' '}
                                    <a href="#" className="text-blue-600 hover:text-blue-700">
                                        điều khoản
                                    </a>{' '}
                                    và{' '}
                                    <a href="#" className="text-blue-600 hover:text-blue-700">
                                        chính sách bảo mật
                                    </a>
                                </label>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={!isFormValid && !isLoading}
                                onClick={handleSubmit}
                                className={`w-full py-3 rounded-lg font-medium shadow-lg transition duration-300 
                                    ${isFormValid
                                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-xl"
                                        : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                            >
                                {isLoading ? <ClipLoader size={20} color='#fff' /> : "Đăng ký"}
                            </motion.button>

                        </div>
                    </motion.div>
                </div>
            </div>
        </div >
    );
};

export default RegisterPage;