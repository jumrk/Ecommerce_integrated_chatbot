import React from 'react';

const StatCard = ({ icon: Icon, title, value, color }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
                        <Icon className="text-white text-xl" />
                    </div>
                    <h3 className="text-gray-500 text-sm mt-4">{title}</h3>
                    <p className="text-2xl font-bold mt-1">{value}</p>
                </div>
            </div>
        </div>
    );
};

export default StatCard;
