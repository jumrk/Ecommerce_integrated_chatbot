import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getImageUrl } from '../../../utils/imageUser';

const Customer = ({ users }) => {
    const navigate = useNavigate()
    return (
        <div className="bg-white p-6 overflow-y-auto scrollbar-thin 
        scrollbar-thumb-gray-300 scrollbar-track-gray-100 max-h-[450px] rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">Người dùng gần đây</h2>
                <button className="text-sm text-gray-500" onClick={() => navigate('/admin/customer/list-customer')}>Tất cả</button>
            </div>

            <div className="space-y-4">
                {users.map((user) => (
                    <div key={user._id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <img
                                src={getImageUrl(user.avatar)}
                                alt={user.fullName}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                                <p className="font-medium">{user.fullName}</p>
                                <p className="text-sm text-gray-500">{user.role}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center space-x-2">
                                <span className={`px-2 py-1 rounded-full text-sm ${user.isActive
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                    }`}>
                                    {user.isActive ? 'Hoạt động' : 'Khóa'}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Customer;