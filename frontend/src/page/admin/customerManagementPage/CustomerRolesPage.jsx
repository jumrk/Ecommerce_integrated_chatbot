import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiFilter, FiUser, FiEdit2, FiCheck, FiX } from 'react-icons/fi';
import LoadingSpinner from '../../../component/common/LoadingSpinner';
import { toast } from 'react-toastify';

const CustomerRolesPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [filterOpen, setFilterOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        // Giả lập API call
        setTimeout(() => {
            setUsers([
                {
                    id: 1,
                    name: "Nguyễn Văn Admin",
                    email: "admin@example.com",
                    role: "admin",
                    status: "active",
                    lastLogin: "2024-03-20T08:00:00Z",
                    createdAt: "2024-01-01T00:00:00Z"
                },
                {
                    id: 2,
                    name: "Trần Thị B",
                    email: "customer1@example.com",
                    role: "customer",
                    status: "active",
                    lastLogin: "2024-03-19T10:00:00Z",
                    createdAt: "2024-01-15T00:00:00Z"
                },
                // Thêm dữ liệu mẫu khác...
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    const formatDate = (dateString) => {
        return new Intl.DateTimeFormat('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(dateString));
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            setLoading(true);
            // Giả lập API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            setUsers(users.map(user =>
                user.id === userId ? { ...user, role: newRole } : user
            ));

            toast.success('Cập nhật vai trò thành công');
        } catch (error) {
            toast.error('Có lỗi xảy ra khi cập nhật vai trò');
        } finally {
            setLoading(false);
            setEditingUser(null);
        }
    };

    const getRoleBadgeClass = (role) => {
        switch (role) {
            case 'admin':
                return 'bg-purple-100 text-purple-800';
            case 'customer':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getRoleText = (role) => {
        switch (role) {
            case 'admin':
                return 'Quản trị viên';
            case 'customer':
                return 'Khách hàng';
            default:
                return role;
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Phân quyền người dùng</h1>
                </div>

                {/* Search and Filter */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm người dùng..."
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                            <button
                                onClick={() => setFilterOpen(!filterOpen)}
                                className="p-2 border rounded-lg hover:bg-gray-50"
                            >
                                <FiFilter className="text-gray-600" />
                            </button>
                        </div>
                    </div>

                    {filterOpen && (
                        <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Vai trò
                                </label>
                                <select className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Tất cả</option>
                                    <option value="admin">Quản trị viên</option>
                                    <option value="customer">Khách hàng</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Trạng thái
                                </label>
                                <select className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Tất cả</option>
                                    <option value="active">Đang hoạt động</option>
                                    <option value="inactive">Không hoạt động</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Người dùng
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Vai trò
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Trạng thái
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Đăng nhập gần đây
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 flex-shrink-0">
                                                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                        <FiUser className="h-5 w-5 text-gray-500" />
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {user.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        Tham gia: {formatDate(user.createdAt)}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{user.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {editingUser === user.id ? (
                                                <div className="flex items-center gap-2">
                                                    <select
                                                        defaultValue={user.role}
                                                        className="border rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                                    >
                                                        <option value="admin">Quản trị viên</option>
                                                        <option value="customer">Khách hàng</option>
                                                    </select>
                                                    <button
                                                        onClick={() => setEditingUser(null)}
                                                        className="text-gray-500 hover:text-gray-700"
                                                    >
                                                        <FiX />
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeClass(user.role)}`}>
                                                    {getRoleText(user.role)}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'active'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                                }`}>
                                                {user.status === 'active' ? 'Đang hoạt động' : 'Không hoạt động'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(user.lastLogin)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {editingUser !== user.id && (
                                                <button
                                                    onClick={() => setEditingUser(user.id)}
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    <FiEdit2 className="h-5 w-5" />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                        Hiển thị 1-10 trên tổng số {users.length} người dùng
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">
                            Trước
                        </button>
                        <button className="px-3 py-1 bg-blue-600 text-white rounded-lg">
                            1
                        </button>
                        <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">
                            2
                        </button>
                        <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">
                            3
                        </button>
                        <button className="px-3 py-1 border rounded-lg hover:bg-gray-50">
                            Sau
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerRolesPage;