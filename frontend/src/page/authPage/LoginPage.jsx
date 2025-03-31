import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { validateField } from '../../utils/validateFiled';
import { Notification } from '../../component/message/message';
import { Login } from '../../api/auth/loginAPI';
import { setToken, getToken } from '../../utils/storage';
import { ClipLoader } from "react-spinners";
const LoginPage = () => {

    // Check if user is already logged in
    const token = getToken();
    if (token) {
        window.location.href = '/';
    }

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    // State to manage notification
    const [notification, setNotification] = useState({
        isOpen: false,
        message: '',
        type: 'info',
    });

    const isFormValid =
        formData.email !== "" &&
        formData.password !== "" &&
        Object.values(errors).every(error => error === "");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({
            ...errors,
            [name]: validateField(name, value, formData),
        });
    }

    const closeNotification = () => {
        setNotification({ ...notification, isOpen: false });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log(formData);
        try {
            const response = await Login(formData);
            setNotification({
                isOpen: true,
                message: response.message,
                type: response.success ? 'success' : 'error',
            });
            if (response.success) {
                if (response.token) {
                    setToken(response.token);
                    setTimeout(() => {
                        navigate('/');
                    }, 2000);
                }
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
    }
    return (
        <div>
            <Notification
                type={notification.type}
                message={notification.message}
                isOpen={notification.isOpen}
                onClose={closeNotification}
            />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
                <div className="absolute w-full h-full">
                    <motion.div
                        className="absolute top-10 left-10 w-20 h-20 bg-purple-200 rounded-full"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                        }}
                    />
                    <motion.div
                        className="absolute bottom-10 right-10 w-32 h-32 bg-blue-200 rounded-full"
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                        }}
                    />
                </div>

                <div className="max-w-4xl w-full flex rounded-2xl shadow-2xl overflow-hidden bg-white relative z-10">
                    {/* Left Side - Image */}
                    <div className="hidden lg:block w-1/2 bg-cover bg-center"
                        style={{
                            backgroundImage: `url('https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')`
                        }}>
                        <div className="h-full w-full bg-blue-500 bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="text-white text-center p-8"
                            >
                                <h2 className="text-4xl font-bold mb-4">Chào mừng trở lại!</h2>
                                <p className="text-lg">Rất vui được gặp lại bạn</p>
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
                            <h2 className="text-4xl font-bold text-gray-800 mb-2">Đăng nhập</h2>
                            <p className="text-gray-600">
                                Chưa có tài khoản?{' '}
                                <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium transition duration-300">
                                    Đăng ký ngay
                                </Link>
                            </p>
                        </div>

                        <div className="space-y-6">
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                className="group"
                            >
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                                    placeholder="Email của bạn"
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

                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                className="group"
                            >
                                <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu</label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                                    placeholder="Mật khẩu của bạn"
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

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label className="ml-2 block text-sm text-gray-700">Ghi nhớ đăng nhập</label>
                                </div>
                                <Link
                                    to="/forgot-password"
                                    className="text-sm text-blue-600 hover:text-blue-700 transition duration-300"
                                >
                                    Quên mật khẩu?
                                </Link>
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
                                {isLoading ? <ClipLoader size={20} color='#fff' /> : "Đăng nhập"}
                            </motion.button>

                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Hoặc đăng nhập với</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => { window.location.href = "http://localhost:5000/api/auth/google"; }}
                                    className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition duration-300"
                                >
                                    <img className="h-5 w-5 mr-2" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google logo" />
                                    Google
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition duration-300"
                                    onClick={() => { window.location.href = "http://localhost:5000/api/auth/facebook"; }}
                                >
                                    <img className="h-5 w-5 mr-2" src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook logo" />
                                    Facebook
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;