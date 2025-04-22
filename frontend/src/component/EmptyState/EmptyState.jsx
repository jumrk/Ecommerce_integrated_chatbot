import React from "react";

const EmptyState = ({ image, title = "Không có dữ liệu", subtitle = "" }) => {
    return (
        <div className={`flex flex-col items-center justify-center py-12 text-center text-gray-500`}>
            {image && (
                <img
                    src={`/images/EmptyState/${image}`}
                    alt="empty"
                    className="w-40 h-40 object-contain mb-4"
                />
            )}
            <h3 className="text-lg font-semibold">{title}</h3>
            {subtitle && <p className="text-sm mt-1 text-gray-400">{subtitle}</p>}
        </div>
    );
};

export default EmptyState;
