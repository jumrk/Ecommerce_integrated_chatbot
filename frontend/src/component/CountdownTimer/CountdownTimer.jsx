import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ endDate }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = new Date(endDate) - new Date();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [endDate]);

    return (
        <div className="flex gap-1 text-sm">
            {timeLeft.days > 0 && (
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {timeLeft.days}d
                </span>
            )}
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {timeLeft.hours}h
            </span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {timeLeft.minutes}m
            </span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {timeLeft.seconds}s
            </span>
        </div>
    );
};

export default CountdownTimer;