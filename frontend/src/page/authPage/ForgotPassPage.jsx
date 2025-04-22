import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { validateField } from '../../utils/validateFiled';
import { ClipLoader } from 'react-spinners';
import forgotPasswordAPI from '../../api/auth/forgotPasswordAPI';
import { Helmet } from 'react-helmet';
const ForgotPasswordPage = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        email: '',
    });

    const isFormValid =
        formData.email !== "" &&
        Object.values(errors).every(error => error === ""
        );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({
            ...errors,
            [name]: validateField(name, value, formData),
        });
    }
    const handleSubmit = async (e) => {
        setIsLoading(true);
        try {
            const response = await forgotPasswordAPI(formData);
            if (response.success) {
                setIsSubmitted(true);
            } else {
                setErrors({ ...errors, email: response.message });
            }
        } catch (error) {
            setErrors({ ...errors, email: error.message });
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
            <Helmet>
                <title>Quên mật khẩu</title>
            </Helmet>
            <div className="absolute w-full h-full">
                <motion.div
                    className="absolute top-20 left-20 w-24 h-24 bg-cyan-200 rounded-full"
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
                    className="absolute bottom-20 right-20 w-32 h-32 bg-blue-200 rounded-full"
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

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 relative z-10"
            >
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center"
                    >
                        <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                    </motion.div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Quên mật khẩu?</h2>
                    <p className="text-gray-600">
                        Đừng lo lắng! Chúng tôi sẽ giúp bạn khôi phục mật khẩu
                    </p>
                </div>

                {!isSubmitted ? (
                    <div className="space-y-2">

                        <motion.div
                            whileHover={{ scale: 1.01 }}
                            className="group"
                        >
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                                placeholder="Nhập email của bạn"
                                name="email"
                                value={formData.email}
                                onChange={(e) => handleChange(e)}
                            />
                        </motion.div>
                        <motion.p
                            className="text-red-500 text-sm mt-1 overflow-hidden"
                            initial={{ opacity: 0, minHeight: 0, height: 0 }}
                            animate={{ opacity: errors.email ? 1 : 0, minHeight: errors.email ? "20px" : 0, height: errors.email ? "auto" : 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            {errors.email}
                        </motion.p>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSubmit()}
                            disabled={!isFormValid || isLoading}
                            className={`w-full py-3 rounded-lg font-medium shadow-lg transition duration-300 
                                ${isFormValid
                                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-xl"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                        >
                            {isLoading ? <ClipLoader size={20} color='#fff' /> : "Gửi yêu cầu khôi phục"}

                        </motion.button>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center space-y-4"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center"
                        >
                            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </motion.div>
                        <p className="text-gray-700">
                            Chúng tôi đã gửi hướng dẫn khôi phục mật khẩu đến email của bạn.
                        </p>
                    </motion.div>
                )}

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-6 text-center"
                >
                    <Link
                        to="/login"
                        className="text-blue-600 hover:text-blue-700 font-medium transition duration-300"
                    >
                        Quay lại trang đăng nhập
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ForgotPasswordPage;