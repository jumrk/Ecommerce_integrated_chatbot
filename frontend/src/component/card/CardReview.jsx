import React from 'react'
import { useState, useRef } from 'react';
import { FaStar } from 'react-icons/fa';

function CardReview({ id, namePerson, comment, rating, date }) {
    const [expandedCard, setExpandedCard] = useState(null);

    const toggleExpand = (id) => {
        setExpandedCard(expandedCard === id ? null : id);
    };
    return (
        <div
            key={id}
            className="w-80 flex-shrink-0 snap-center transition-all duration-300 bg-white rounded-lg shadow-md p-6 cursor-pointer"
            onClick={() => toggleExpand(id)}
        >
            <h3 className="text-lg font-semibold text-gray-800 text-left mb-2">{namePerson}</h3>
            <div className="flex mb-2">
                {[...Array(rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-lg" />
                ))}
            </div>
            <p
                className={`text-gray-700 text-left italic mb-4 transition-all duration-300 max-w-full truncate }`}
            >
                "{comment}"
            </p>
            <p className="text-sm text-gray-500 text-left mb-2">{date}</p>

            {expandedCard === id && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
                    onClick={() => setExpandedCard(null)}
                />
            )}

            {expandedCard === id && (
                <div
                    className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white 
                      rounded-lg shadow-2xl p-6 z-50 animate-expand"
                >
                    <h3 className="text-lg font-semibold text-gray-800 text-left mb-2">{namePerson}</h3>
                    <div className="flex mb-2">
                        {[...Array(rating)].map((_, i) => (
                            <FaStar key={i} className="text-yellow-400 text-lg" />
                        ))}
                    </div>
                    <p className="text-gray-700 text-left italic mb-4">"{comment}"</p>
                    <p className="text-sm text-gray-500 text-left mb-4">{date}</p>
                </div>
            )}
        </div>
    )
}

export default CardReview