import React, { useState } from 'react';
import { FiEdit2, FiSave, FiX, FiCamera } from 'react-icons/fi';

const UserInfo = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [userInfo, setUserInfo] = useState({
        fullName: 'Nguyễn Văn A',
        email: 'example@email.com',
        phone: '0123456789',
        birthday: '1990-01-01',
        gender: 'male',
    });

    return (
        <div className="space-y-6">
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
                            onClick={() => setIsEditing(false)}
                            className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 w-full sm:w-auto"
                        >
                            <FiX className="w-4 h-4" />
                            <span>Hủy</span>
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full sm:w-auto"
                        >
                            <FiSave className="w-4 h-4" />
                            <span>Lưu thay đổi</span>
                        </button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="flex flex-col items-center sm:items-start">
                        <div className="relative">
                            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-gray-100">
                                <img
                                    src="https://via.placeholder.com/150"
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50">
                                <FiCamera className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Họ và tên
                            </label>
                            <input
                                type="text"
                                disabled={!isEditing}
                                value={userInfo.fullName}
                                onChange={(e) => setUserInfo({ ...userInfo, fullName: e.target.value })}
                                className={`w-full px-4 py-2.5 rounded-lg border ${isEditing
                                    ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                    : 'border-transparent bg-gray-50'
                                    }`}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                disabled={!isEditing}
                                value={userInfo.email}
                                onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Số điện thoại
                        </label>
                        <input
                            type="tel"
                            disabled={!isEditing}
                            value={userInfo.phone}
                            onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                            className={`w-full px-4 py-2.5 rounded-lg border ${isEditing
                                ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                : 'border-transparent bg-gray-50'
                                }`}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ngày sinh
                        </label>
                        <input
                            type="date"
                            disabled={!isEditing}
                            value={userInfo.birthday}
                            onChange={(e) => setUserInfo({ ...userInfo, birthday: e.target.value })}
                            className={`w-full px-4 py-2.5 rounded-lg border ${isEditing
                                ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                : 'border-transparent bg-gray-50'
                                }`}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Giới tính
                        </label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
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
                    <button className="w-full sm:w-auto px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all text-center">
                        Đổi mật khẩu
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;