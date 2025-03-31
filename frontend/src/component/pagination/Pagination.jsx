import React from "react";
import PropTypes from 'prop-types';

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

    return (
        <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 border-t bg-gray-50">
            <span className="text-sm text-gray-600 mb-4 md:mb-0">
                Hiển thị <span className="font-semibold">{startIndex}</span> đến{' '}
                <span className="font-semibold">{endIndex}</span> trong số{' '}
                <span className="font-semibold">{totalItems}</span> kết quả
            </span>
            <div className="flex items-center space-x-2">
                <button
                    className="px-4 py-2 border rounded-xl text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    Trước
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        className={`px-4 py-2 border rounded-xl transition-colors ${currentPage === index + 1
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "text-gray-600 hover:bg-gray-100"
                            }`}
                        onClick={() => onPageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    className="px-4 py-2 border rounded-xl text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    Sau
                </button>
            </div>
        </div>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalItems: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};

export default Pagination;
