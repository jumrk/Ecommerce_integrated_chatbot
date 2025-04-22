import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiFilter, FiUser, FiCheck, FiX } from 'react-icons/fi';
import Loading from '../../../component/loading/loading';
import Pagination from '../../../component/pagination/Pagination';
import ButtonEdit from '../../../component/button/ButtonEdit';
import { getAllUsers, updateUserRole } from '../../../api/user/userManagerAPI';
import Notification from '../../../component/notification/Notification';
import { Helmet } from 'react-helmet';

const CustomerRolesPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [notification, setNotification] = useState(null);
    const [filterOpen, setFilterOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null); // ID của user đang chỉnh sửa
    const [tempRole, setTempRole] = useState(''); // Vai trò tạm thời khi chỉnh sửa
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        role: 'all',
        status: 'all',
    });
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await getAllUsers();
            const formattedUsers = data.map(user => ({
                id: user._id,
                name: user.fullName || 'Chưa có tên',
                email: user.email || 'Chưa có email',
                role: user.role || 'customer',
                status: user.isActive ? 'active' : 'inactive',
                lastLogin: user.lastLogin || user.updatedAt,
                createdAt: user.createdAt
            }));
            setUsers(formattedUsers);
        } catch (error) {
            setNotification({
                type: 'error',
                message: error.message || 'Không thể tải danh sách người dùng'
            });
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Intl.DateTimeFormat('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(dateString));
    };

    const handleEditClick = (user) => {
        setEditingUser(user.id);
        setTempRole(user.role);
    };

    const handleRoleChange = async (userId) => {
        try {
            if (tempRole !== 'admin' &&
                users.filter(u => u.role === 'admin').length <= 1 &&
                users.find(u => u.id === userId)?.role === 'admin') {
                setNotification({
                    type: 'error',
                    message: 'Phải có ít nhất một quản trị viên'
                });
                return;
            }
            setLoading(true)
            const response = await updateUserRole(userId, tempRole);

            if (response.success) {
                setUsers(prevUsers =>
                    prevUsers.map(user =>
                        user.id === userId ? { ...user, role: tempRole } : user
                    )
                );
                setLoading(false)
                setNotification({
                    type: 'success',
                    message: 'Cập nhật vai trò thành công'
                });
            }
        } catch (error) {
            setNotification({
                type: 'error',
                message: error.message || 'Có lỗi xảy ra khi cập nhật vai trò'
            });
        } finally {
            setEditingUser(null);
            setTempRole('');
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

    const filteredUsers = users.filter(user => {
        const matchesSearch = (
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const matchesRole = filters.role === 'all' || user.role === filters.role;
        const matchesStatus = filters.status === 'all' || user.status === filters.status;

        return matchesSearch && matchesRole && matchesStatus;
    });

    const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
        setCurrentPage(1); // Reset về trang đầu khi filter thay đổi
    };

    if (loading) return <Loading />;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <Helmet>
                <title>Phân quyền người dùng</title>
            </Helmet>
            {notification && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                    onClose={() => setNotification(null)}
                />
            )}
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Phân quyền người dùng</h1>
                </div>

                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm theo tên hoặc email..."
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                />
                                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                            <button
                                onClick={() => setFilterOpen(!filterOpen)}
                                className={`p-2 border rounded-lg hover:bg-gray-50 ${filterOpen ? 'bg-blue-50 border-blue-500' : ''}`}
                            >
                                <FiFilter className={`${filterOpen ? 'text-blue-500' : 'text-gray-600'}`} />
                            </button>
                        </div>
                    </div>

                    {filterOpen && (
                        <div className="mt-4 pt-4 border-t">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Vai trò
                                    </label>
                                    <select
                                        value={filters.role}
                                        onChange={(e) => handleFilterChange('role', e.target.value)}
                                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="all">Tất cả vai trò</option>
                                        <option value="admin">Quản trị viên</option>
                                        <option value="customer">Khách hàng</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Trạng thái
                                    </label>
                                    <select
                                        value={filters.status}
                                        onChange={(e) => handleFilterChange('status', e.target.value)}
                                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="all">Tất cả trạng thái</option>
                                        <option value="active">Đang hoạt động</option>
                                        <option value="inactive">Không hoạt động</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

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
                                {currentItems.map((user) => (
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
                                                        value={tempRole}
                                                        onChange={(e) => setTempRole(e.target.value)}
                                                        className="border rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        disabled={
                                                            user.role === 'admin' &&
                                                            users.filter(u => u.role === 'admin').length <= 1 &&
                                                            tempRole !== 'admin'
                                                        }
                                                    >
                                                        <option value="admin">Quản trị viên</option>
                                                        <option value="customer">Khách hàng</option>
                                                    </select>
                                                    <button
                                                        onClick={() => handleRoleChange(user.id)}
                                                        className="text-green-500 hover:text-green-700"
                                                    >
                                                        <FiCheck />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setEditingUser(null);
                                                            setTempRole('');
                                                        }}
                                                        className="text-red-500 hover:text-red-700"
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
                                                <ButtonEdit
                                                    onClick={() => handleEditClick(user)}
                                                    text="Sửa"
                                                />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalItems={filteredUsers.length} // Cập nhật totalItems
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default CustomerRolesPage;