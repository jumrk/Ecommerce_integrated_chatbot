import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="w-full h-auto flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl">
                <div className="flex flex-col items-center">
                    {/* Spinner animation */}
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="mt-4 text-gray-600">Đang tải...</p>
                </div>
            </div>
        </div>
    );
};

export default LoadingSpinner;