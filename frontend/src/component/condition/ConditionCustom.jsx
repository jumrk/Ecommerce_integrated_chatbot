import React from 'react';

const STATUS_COLORS = {
    success: "bg-green-100 text-green-800",
    info: "bg-blue-100 text-blue-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800"
};

const StatusBadge = ({ type = "info", text }) => {
    return (
        <div className={`flex justify-center items-center px-2 py-1 rounded-full font-medium ${STATUS_COLORS[type]}`}>
            {text}
        </div>
    );
};

export default StatusBadge;
