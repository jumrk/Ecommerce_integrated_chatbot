import React, { useEffect, useState } from 'react';
import { FiEdit2, FiSave, FiX, FiCamera } from 'react-icons/fi';
import { checkPasswordAPI, newPasswordAPI } from '../../api/auth/resetPasswordAPI';
import { getInforUser } from '../../api/user/getInforUserAPI';
import { updateUserAPI } from "../../api/user/updateUserAPI";
import { ClipLoader } from "react-spinners";
import { motion } from 'framer-motion';

// Định nghĩa baseURL của server (khớp với backend)
const BASE_URL = 'http://localhost:5000';

const UserInfo = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [success, setSuccess] = useState(false);
    const [openInput, setOpenInput] = useState(false);
    const [infoSuccess, setInfoSuccess] = useState(false);

    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
    });

    const [userInfo, setUserInfo] = useState({
        fullName: '',
        email: '',
        phone: '',
        birthday: '',
        gender: '',
        avatar: '',
    });

    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);

    // Lấy thông tin người dùng từ backend
    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const userData = await getInforUser();
                console.log("Dữ liệu từ server:", userData);

                if (userData) {
                    const avatarUrl = userData.avatar ? `${BASE_URL}${userData.avatar}` : '';
                    setUserInfo({
                        fullName: userData.fullName || '',
                        email: userData.email || '',
                        phone: userData.phone || '',
                        birthday: userData.birthday ? userData.birthday.split("T")[0] : '',
                        gender: userData.gender || 'male',
                        avatar: userData.avatar || '', // Lưu đường dẫn tương đối
                    });
                    console.log(avatarUrl)
                    setAvatarPreview(avatarUrl); // Set URL đầy đủ cho preview
                }
            } catch (error) {
                console.error("Lỗi khi lấy thông tin người dùng:", error);
                setError("Không thể tải thông tin người dùng");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setError(null);
    };

    const handleUserInfoChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file)); // Hiển thị preview tạm thời
            console.log("File được chọn:", file);
        }
    };

    const handleSaveUserInfo = async () => {
        setLoading(true);
        setError(null);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('fullName', userInfo.fullName);
            formDataToSend.append('email', userInfo.email);
            formDataToSend.append('phone', userInfo.phone);
            formDataToSend.append('birthday', userInfo.birthday);
            formDataToSend.append('gender', userInfo.gender);

            if (avatarFile) {
                console.log("Avatar file trước khi gửi:", avatarFile);
                formDataToSend.append('avatar', avatarFile);
            } else {
                console.log("Không có avatarFile để gửi");
            }

            console.log("Dữ liệu gửi đi:");
            for (let [key, value] of formDataToSend.entries()) {
                console.log(`${key}:`, value);
            }

            const updatedUser = await updateUserAPI(formDataToSend);
            console.log("Response từ server:", updatedUser);

            const newAvatarUrl = updatedUser.avatar ? `${BASE_URL}${updatedUser.avatar}` : avatarPreview;
            setUserInfo({
                fullName: updatedUser.fullName || userInfo.fullName,
                email: updatedUser.email || userInfo.email,
                phone: updatedUser.phone || userInfo.phone,
                birthday: updatedUser.birthday ? updatedUser.birthday.split("T")[0] : userInfo.birthday,
                gender: updatedUser.gender || userInfo.gender,
                avatar: updatedUser.avatar || userInfo.avatar, // Cập nhật đường dẫn tương đối
            });
            setAvatarPreview(newAvatarUrl); // Cập nhật preview từ server
            setAvatarFile(null);

            setIsEditing(false);
            setInfoSuccess(true);
            setTimeout(() => setInfoSuccess(false), 3000);
        } catch (error) {
            console.error("Lỗi khi lưu thông tin người dùng:", error);
            setError(error.message || "Có lỗi xảy ra khi lưu thông tin");
        } finally {
            setLoading(false);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setAvatarFile(null);
        setAvatarPreview(userInfo.avatar ? `${BASE_URL}${userInfo.avatar}` : ''); // Quay lại avatar từ server
        setError(null);
    };

    // Các hàm xử lý mật khẩu giữ nguyên
    const checkSubmit = async (e) => {
        e.preventDefault();
        if (!formData.oldPassword) {
            setError("Vui lòng nhập mật khẩu cũ");
            return;
        }

        setLoading(true);
        try {
            const check = await checkPasswordAPI({ password: formData.oldPassword });
            if (!check || typeof check.success !== 'boolean') {
                throw new Error("Phản hồi từ server không hợp lệ");
            }
            if (!check.success) {
                setError(check.message || "Mật khẩu không hợp lệ");
            } else {
                setOpenInput(true);
            }
        } catch (error) {
            console.error("Lỗi kiểm tra mật khẩu:", error);
            setError(error.message || "Có lỗi xảy ra, vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.newPassword) {
            setError("Vui lòng nhập mật khẩu mới");
            return;
        }
        if (formData.newPassword.length < 8) {
            setError("Mật khẩu mới phải dài ít nhất 8 ký tự");
            return;
        }

        setLoading(true);
        try {
            const newPassword = await newPasswordAPI({ password: formData.newPassword });
            if (!newPassword || typeof newPassword.success !== 'boolean') {
                throw new Error("Phản hồi từ server không hợp lệ");
            }
            if (!newPassword.success) {
                setError(newPassword.message || "Đổi mật khẩu thất bại");
            } else {
                setFormData({ oldPassword: '', newPassword: '' });
                setOpenInput(false);
                setOpenForm(false);
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
            }
        } catch (error) {
            console.error("Lỗi đổi mật khẩu:", error);
            setError(error.message || "Có lỗi xảy ra, vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setOpenForm(false);
        setOpenInput(false);
        setFormData({ oldPassword: '', newPassword: '' });
        setError(null);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Thông tin cá nhân</h2>
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all w-full sm:w-auto justify-center sm:justify-start"
                    >
                        <FiEdit2 className="w-4 h-4" />
                        <span>Chỉnh sửa</span>
                    </button>
                ) : (
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                        <button
                            onClick={handleCancelEdit}
                            className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 w-full sm:w-auto"
                        >
                            <FiX className="w-4 h-4" />
                            <span>Hủy</span>
                        </button>
                        <button
                            onClick={handleSaveUserInfo}
                            disabled={loading}
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full sm:w-auto disabled:bg-blue-400"
                        >
                            {loading ? <ClipLoader size={20} color="#fff" /> : <><FiSave className="w-4 h-4" /> Lưu thay đổi</>}
                        </button>
                    </div>
                )}
            </div>

            {/* Thông báo thành công */}
            {infoSuccess && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4 mt-4"
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
                    <p className="text-gray-700">Thông tin cá nhân đã được cập nhật thành công</p>
                </motion.div>
            )}

            {/* User Info Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="flex flex-col items-center sm:items-start">
                        <div className="relative">
                            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-gray-100">
                                <img
                                    src={avatarPreview || "https://via.placeholder.com/150"}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {isEditing && (
                                <label className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                                    <FiCamera className="w-5 h-5 text-gray-600" />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                        className="hidden"
                                    />
                                </label>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                            <input
                                type="text"
                                name="fullName"
                                disabled={!isEditing}
                                value={userInfo.fullName}
                                onChange={handleUserInfoChange}
                                className={`w-full px-4 py-2.5 rounded-lg border ${isEditing
                                    ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                    : 'border-transparent bg-gray-50'
                                    }`}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                disabled={!isEditing}
                                value={userInfo.email}
                                onChange={handleUserInfoChange}
                                className={`w-full px-4 py-2.5 rounded-lg border ${isEditing
                                    ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                    : 'border-transparent bg-gray-50'
                                    }`}
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                        <input
                            type="tel"
                            name="phone"
                            disabled={!isEditing}
                            value={userInfo.phone}
                            onChange={handleUserInfoChange}
                            className={`w-full px-4 py-2.5 rounded-lg border ${isEditing
                                ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                : 'border-transparent bg-gray-50'
                                }`}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ngày sinh</label>
                        <input
                            type="date"
                            name="birthday"
                            disabled={!isEditing}
                            value={userInfo.birthday}
                            onChange={handleUserInfoChange}
                            className={`w-full px-4 py-2.5 rounded-lg border ${isEditing
                                ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                : 'border-transparent bg-gray-50'
                                }`}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Giới tính</label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="gender"
                                    disabled={!isEditing}
                                    checked={userInfo.gender === 'male'}
                                    onChange={() => setUserInfo({ ...userInfo, gender: 'male' })}
                                    className="w-4 h-4 text-blue-600"
                                />
                                <span>Nam</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="gender"
                                    disabled={!isEditing}
                                    checked={userInfo.gender === 'female'}
                                    onChange={() => setUserInfo({ ...userInfo, gender: 'female' })}
                                    className="w-4 h-4 text-blue-600"
                                />
                                <span>Nữ</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Security Section */}
            <div className="mt-8 pt-6 border-t">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Bảo mật</h3>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="mb-4 sm:mb-0">
                        <h4 className="font-medium text-gray-800">Mật khẩu</h4>
                        <p className="text-sm text-gray-500">Thay đổi mật khẩu định kỳ để bảo vệ tài khoản</p>
                    </div>
                    <button
                        onClick={() => setOpenForm(true)}
                        className="w-full sm:w-auto px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all text-center"
                    >
                        Đổi mật khẩu
                    </button>
                </div>

                {openForm && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full mt-3"
                    >
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            {openInput ? "Nhập mật khẩu mới" : "Xác nhận mật khẩu cũ"}
                        </h3>
                        <div className="flex items-center border border-slate-500 rounded-md p-2 w-full h-12">
                            <input
                                type="password"
                                name={openInput ? "newPassword" : "oldPassword"}
                                value={openInput ? formData.newPassword : formData.oldPassword}
                                onChange={handleChange}
                                className="flex-grow focus:outline-none bg-transparent"
                                placeholder={openInput ? "Mật khẩu mới" : "Mật khẩu cũ"}
                            />
                            <button
                                onClick={openInput ? handleSubmit : checkSubmit}
                                disabled={loading}
                                className="ml-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded disabled:bg-gray-300"
                            >
                                {loading ? <ClipLoader size={20} /> : (openInput ? "Xác nhận" : "Kiểm tra")}
                            </button>
                        </div>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        <button
                            onClick={resetForm}
                            className="mt-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded"
                        >
                            Hủy
                        </button>
                    </motion.div>
                )}

                {success && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center space-y-4 mt-4"
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
                        <p className="text-gray-700">Thay đổi mật khẩu thành công</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default UserInfo;