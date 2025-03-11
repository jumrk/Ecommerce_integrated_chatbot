import React from 'react';

const Loading = () => {
    return (
        <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center text-indigo-600 font-semibold">
                    Đang tải...
                </div>
            </div>
        </div>
    );
};

export default Loading;