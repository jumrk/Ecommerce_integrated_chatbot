import React from 'react';

const STATUS_COLORS = {
    success: "bg-green-100 text-green-800",
    info: "bg-blue-100 text-blue-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800"
};

const StatusBadge = ({ type = "info", text }) => {
    return (
        <div
            className={`flex justify-center items-center 
              px-2 py-1 sm:px-3 sm:py-1.5 
              rounded-full font-medium 
              max-w-full w-fit 
              text-xs sm:text-sm 
              whitespace-nowrap 
              ${STATUS_COLORS[type]}`}
        >
            {text}
        </div>
    );
};

export default StatusBadge;
