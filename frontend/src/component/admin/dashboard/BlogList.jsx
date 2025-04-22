import React from 'react';
import { formatDate } from '../../../utils/format/formatDate';
import StatusBadge from '../../condition/ConditionCustom';
import { useNavigate } from 'react-router-dom';

const blogList = ({ blogs }) => {
    const navigate = useNavigate()

    return (
        <div className="bg-white p-6 overflow-y-auto scrollbar-thin 
        scrollbar-thumb-gray-300 scrollbar-track-gray-100 max-h-[450px] rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">Bài viết</h2>
                <button onClick={() => navigate('/admin/blogs/list-blog')} className="text-sm text-gray-500">Tất cả</button>
            </div>

            <div className="space-y-4">
                {blogs.map((blog) => (
                    <div key={blog._id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <img
                                src={import.meta.env.VITE_API_URL + blog.images[0]}
                                alt=""
                                className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                                <p className="font-medium hover:text-blue-600 cursor-pointer"
                                    onClick={() => navigate(`/admin/blogs/blog-detail/${blog._id}`)}>
                                    {blog.title}
                                </p>
                                <p className="text-sm text-gray-500 line-clamp-1" dangerouslySetInnerHTML={{ __html: blog.content }} />
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center space-x-2">
                                <StatusBadge
                                    type={blog.status === 'Đã duyệt' ? 'success' : blog.status === 'Chờ duyệt' ? 'warning' : 'danger'}
                                    text={blog.status}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default blogList;