import React from 'react';
import { FiPackage, FiTruck, FiCheck, FiX, FiAlertTriangle } from 'react-icons/fi';

const ShippingHistory = ({ history }) => {
    const getStatusIcon = (status) => {
        switch (status) {
            case 'picked_up':
                return <FiPackage className="w-5 h-5" />;
            case 'delivering':
                return <FiTruck className="w-5 h-5" />;
            case 'delivered':
                return <FiCheck className="w-5 h-5 text-green-500" />;
            case 'failed':
                return <FiX className="w-5 h-5 text-red-500" />;
            default:
                return <FiAlertTriangle className="w-5 h-5 text-yellow-500" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'picked_up':
                return 'bg-blue-100 text-blue-800';
            case 'delivering':
                return 'bg-yellow-100 text-yellow-800';
            case 'delivered':
                return 'bg-green-100 text-green-800';
            case 'failed':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="flow-root">
            <ul className="-mb-8">
                {history.map((event, eventIdx) => (
                    <li key={event.id}>
                        <div className="relative pb-8">
                            {eventIdx !== history.length - 1 ? (
                                <span
                                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                    aria-hidden="true"
                                />
                            ) : null}
                            <div className="relative flex space-x-3">
                                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${getStatusColor(event.status)}`}>
                                    {getStatusIcon(event.status)}
                                </div>
                                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                    <div>
                                        <p className="text-sm text-gray-900">
                                            {event.description}
                                            {event.location && (
                                                <span className="text-gray-500"> tại {event.location}</span>
                                            )}
                                        </p>
                                        {event.note && (
                                            <p className="mt-1 text-sm text-gray-500">
                                                {event.note}
                                            </p>
                                        )}
                                    </div>
                                    <div className="whitespace-nowrap text-right text-sm text-gray-500">
                                        <time dateTime={event.timestamp}>
                                            {new Date(event.timestamp).toLocaleString('vi-VN')}
                                        </time>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ShippingHistory;