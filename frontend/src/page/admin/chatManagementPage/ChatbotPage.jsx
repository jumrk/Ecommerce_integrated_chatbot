import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiBox, FiSun, FiCloud } from 'react-icons/fi';
import LoadingSpinner from '../../../component/common/LoadingSpinner';
import { toast } from 'react-toastify';

// Thêm EditForm component
const EditForm = ({ item, onSave, onCancel }) => {
    const [editedItem, setEditedItem] = useState(item);

    return (
        <div className="space-y-4 p-2 bg-gray-50 rounded-lg">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nội dung
                </label>
                <input
                    type="text"
                    value={editedItem.text}
                    onChange={(e) => setEditedItem({ ...editedItem, text: e.target.value })}
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Icon
                </label>
                <input
                    type="text"
                    value={editedItem.icon}
                    onChange={(e) => setEditedItem({ ...editedItem, icon: e.target.value })}
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            {editedItem.isTitle && (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Thứ tự hiển thị
                    </label>
                    <input
                        type="number"
                        value={editedItem.order}
                        onChange={(e) => setEditedItem({ ...editedItem, order: parseInt(e.target.value) })}
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            )}
            <div className="flex justify-end gap-2">
                <button
                    onClick={() => onCancel()}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                >
                    Hủy
                </button>
                <button
                    onClick={() => onSave(editedItem)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Lưu
                </button>
            </div>
        </div>
    );
};

const ChatbotPage = () => {
    const [loading, setLoading] = useState(true);
    const [suggestions, setSuggestions] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedTitle, setSelectedTitle] = useState(null);

    const [newSuggestion, setNewSuggestion] = useState({
        text: '',
        icon: '📦',
        isTitle: false,
        parentId: null,
        order: 0
    });

    useEffect(() => {
        // Giả lập API call
        setTimeout(() => {
            setSuggestions([
                {
                    id: 1,
                    text: "Gợi ý sản phẩm",
                    icon: "📦",
                    isTitle: true,
                    parentId: null,
                    order: 1
                },
                {
                    id: 2,
                    text: "Gợi ý sản phẩm cho mùa đông",
                    icon: "❄️",
                    isTitle: false,
                    parentId: 1,
                    order: 1
                },
                {
                    id: 3,
                    text: "Gợi ý sản phẩm cho mùa hè",
                    icon: "☀️",
                    isTitle: false,
                    parentId: 1,
                    order: 2
                },
                {
                    id: 4,
                    text: "Tìm sản phẩm",
                    icon: "🔍",
                    isTitle: true,
                    parentId: null,
                    order: 2
                },
                {
                    id: 5,
                    text: "Những sản phẩm bán nhiều nhất",
                    icon: "🔥",
                    isTitle: true,
                    parentId: null,
                    order: 3
                },
                {
                    id: 6,
                    text: "Những sản phẩm đánh giá tốt nhất",
                    icon: "⭐",
                    isTitle: true,
                    parentId: null,
                    order: 4
                }
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    const titles = suggestions.filter(s => s.isTitle);
    const getSubItems = (titleId) => suggestions.filter(s => s.parentId === titleId);

    const handleAdd = async () => {
        if (!newSuggestion.text.trim()) {
            toast.error('Vui lòng nhập nội dung gợi ý');
            return;
        }

        try {
            setLoading(true);
            // Giả lập API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            const newItem = {
                id: Date.now(),
                ...newSuggestion,
            };

            if (!newItem.isTitle) {
                const siblingItems = suggestions.filter(s => s.parentId === newItem.parentId);
                newItem.order = siblingItems.length + 1;
            }

            setSuggestions([...suggestions, newItem]);
            setNewSuggestion({
                text: '',
                icon: '📦',
                isTitle: false,
                parentId: null,
                order: 0
            });
            setShowAddForm(false);
            toast.success('Thêm gợi ý thành công');
        } catch (error) {
            toast.error('Có lỗi xảy ra');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (updatedItem) => {
        try {
            setLoading(true);
            // Giả lập API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            setSuggestions(suggestions.map(item =>
                item.id === updatedItem.id ? updatedItem : item
            ));

            setEditingId(null);
            toast.success('Cập nhật thành công');
        } catch (error) {
            toast.error('Có lỗi xảy ra');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa?')) return;

        try {
            setLoading(true);
            // Giả lập API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            setSuggestions(suggestions.filter(suggestion => suggestion.id !== id));
            toast.success('Xóa thành công');
        } catch (error) {
            toast.error('Có lỗi xảy ra');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Quản lý gợi ý chat</h1>
                    <button
                        onClick={() => {
                            setNewSuggestion({
                                text: '',
                                icon: '📦',
                                isTitle: !selectedTitle,
                                parentId: selectedTitle,
                                order: 0
                            });
                            setShowAddForm(true);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        <FiPlus />
                        {selectedTitle ? 'Thêm nội dung con' : 'Thêm gợi ý'}
                    </button>
                </div>

                {/* Add Form */}
                {showAddForm && (
                    <div className="bg-white rounded-lg shadow p-6 mb-6">
                        <h2 className="text-lg font-semibold mb-4">
                            {newSuggestion.isTitle ? 'Thêm gợi ý' : 'Thêm nội dung con'}
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nội dung
                                </label>
                                <input
                                    type="text"
                                    value={newSuggestion.text}
                                    onChange={(e) => setNewSuggestion({ ...newSuggestion, text: e.target.value })}
                                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nhập nội dung..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Icon
                                </label>
                                <input
                                    type="text"
                                    value={newSuggestion.icon}
                                    onChange={(e) => setNewSuggestion({ ...newSuggestion, icon: e.target.value })}
                                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nhập emoji..."
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => setShowAddForm(false)}
                                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={handleAdd}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Thêm
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Suggestions List */}
                <div className="bg-white rounded-lg shadow">
                    <div className="divide-y divide-gray-200">
                        {titles.sort((a, b) => a.order - b.order).map((title) => (
                            <div key={title.id} className="p-4">
                                {editingId === title.id ? (
                                    <EditForm
                                        item={title}
                                        onSave={handleUpdate}
                                        onCancel={() => setEditingId(null)}
                                    />
                                ) : (
                                    <div
                                        className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                                        onClick={() => setSelectedTitle(selectedTitle === title.id ? null : title.id)}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl">{title.icon}</span>
                                            <span className="text-gray-900 font-medium">{title.text}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setEditingId(title.id);
                                                }}
                                                className="p-2 text-blue-600 hover:text-blue-800"
                                            >
                                                <FiEdit2 />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(title.id);
                                                }}
                                                className="p-2 text-red-600 hover:text-red-800"
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Sub Items */}
                                {selectedTitle === title.id && (
                                    <div className="ml-8 mt-2 space-y-2">
                                        {getSubItems(title.id)
                                            .sort((a, b) => a.id - b.id)
                                            .map((subItem) => (
                                                <div key={subItem.id}>
                                                    {editingId === subItem.id ? (
                                                        <EditForm
                                                            item={subItem}
                                                            onSave={handleUpdate}
                                                            onCancel={() => setEditingId(null)}
                                                        />
                                                    ) : (
                                                        <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                                                            <div className="flex items-center gap-3">
                                                                <span className="text-xl">{subItem.icon}</span>
                                                                <span className="text-gray-600">{subItem.text}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <button
                                                                    onClick={() => setEditingId(subItem.id)}
                                                                    className="p-2 text-blue-600 hover:text-blue-800"
                                                                >
                                                                    <FiEdit2 />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDelete(subItem.id)}
                                                                    className="p-2 text-red-600 hover:text-red-800"
                                                                >
                                                                    <FiTrash2 />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatbotPage;