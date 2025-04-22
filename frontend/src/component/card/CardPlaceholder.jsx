import React from 'react';

const CardPlaceholder = () => {
    return (
        <div className="w-full h-full bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg">
            {/* Image placeholder */}
            <div className="relative w-full bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse aspect-[3/2] sm:aspect-[4/3] md:aspect-[3/2]">
                <div className="absolute inset-0 bg-gray-300 opacity-50 animate-shimmer"></div>
            </div>

            {/* Content placeholder */}
            <div className="p-3 sm:p-4 md:p-5 space-y-2 sm:space-y-3">
                {/* Title */}
                <div className="h-4 sm:h-5 w-4/5 bg-gray-200 rounded-md animate-pulse"></div>

                {/* Subtitle */}
                <div className="h-3 sm:h-4 w-3/5 bg-gray-300 rounded-md animate-pulse"></div>

                {/* Additional details */}
                <div className="space-y-1 sm:space-y-2">
                    <div className="h-2 sm:h-3 w-2/3 bg-gray-200 rounded-md animate-pulse"></div>
                    <div className="h-2 sm:h-3 w-1/2 bg-gray-200 rounded-md animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};

export default CardPlaceholder;