import React, { useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Notification = ({ message, type = 'success', onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            if (onClose) onClose();
        }, 2000);
        return () => clearTimeout(timer);
    }, [onClose]);

    // Animation variants
    const variants = {
        hidden: { opacity: 0, y: -20, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.4,
                ease: [0.25, 0.8, 0.25, 1]
            }
        },
        exit: {
            opacity: 0,
            y: 20,
            scale: 0.95,
            transition: { duration: 0.3 }
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
                className={`fixed z-50 w-[50%] h-auto sm:w-full max-w-md p-3 sm:p-4 rounded-2xl shadow-2xl
                    ${type === 'success'
                        ? 'bg-gradient-to-br from-green-50/90 to-emerald-100/90 backdrop-blur-md border border-green-200/50'
                        : 'bg-gradient-to-br from-red-50/90 to-rose-100/90 backdrop-blur-md border border-red-200/50'}
                    top-4 sm:top-8 right-1 sm:right-8 transform translate-x-1/2 sm:translate-x-0`}
            >
                <div className="flex items-center gap-3 sm:gap-4">
                    {/* Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                        className={`p-1 sm:p-1.5 rounded-full 
                            ${type === 'success' ? 'bg-green-200/50' : 'bg-red-200/50'}`}
                    >
                        {type === 'success' ? (
                            <FaCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                        ) : (
                            <FaTimesCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                        )}
                    </motion.div>

                    {/* Message */}
                    <span className="flex-grow text-xs sm:text-sm font-semibold text-gray-800 ">
                        {message}
                    </span>

                    {/* Close Button */}
                    <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onClose}
                        className="p-1 sm:p-1.5 rounded-full bg-white/20 hover:bg-white/30 
                            transition-all duration-200 focus:outline-none focus:ring-2 
                            focus:ring-offset-2 focus:ring-gray-300"
                    >
                        <FaTimes className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
                    </motion.button>
                </div>

                {/* Progress Bar */}
                <motion.div
                    className={`absolute bottom-0 w-11/12 left-0 h-0.5 rounded-full
                        ${type === 'success' ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-red-400 to-rose-500'}`}
                    initial={{ width: '100%' }}
                    animate={{ width: '0%' }}
                    transition={{ duration: 2, ease: 'linear' }}
                />
            </motion.div>
        </AnimatePresence>
    );
};

export default Notification;