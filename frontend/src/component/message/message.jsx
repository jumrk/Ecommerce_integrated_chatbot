import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Notification = ({ type = 'success', message, isOpen, onClose }) => {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);

    // Cấu hình style theo type với gradient
    const typeStyles = {
        success: 'bg-gradient-to-r from-green-600 to-green-400 border-green-700',
        error: 'bg-gradient-to-r from-red-600 to-red-400 border-red-700',
        warning: 'bg-gradient-to-r from-yellow-600 to-yellow-400 border-yellow-700',
        info: 'bg-gradient-to-r from-blue-600 to-blue-400 border-blue-700',
    };

    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️',
    };

    // Biến thể animation 3D
    const cardVariants = {
        hidden: { opacity: 0, y: -50, rotateX: -15 },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                duration: 0.4,
                ease: 'easeOut'
            }
        },
        exit: {
            opacity: 0,
            y: -50,
            rotateX: -15,
            transition: {
                duration: 0.3
            }
        },
        hover: {
            scale: 1.02,
            rotateX: 5,
            boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
            transition: { duration: 0.2 }
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    whileHover="hover"
                    className="fixed top-6 right-6 z-50 max-w-sm  rounded-2xl w-full perspective-1000"
                >
                    <div
                        className={`${typeStyles[type]} border-l-4 p-5 rounded-2xl text-white relative overflow-hidden shadow-2xl`}
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        {/* Hiệu ứng ánh sáng */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

                        {/* Thanh tiến trình với hiệu ứng glow */}
                        <motion.div
                            className="absolute bottom-0 left-0 h-1 bg-white/40 shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                            initial={{ width: '100%' }}
                            animate={{ width: '0%' }}
                            transition={{ duration: 2, ease: 'linear' }}
                        />

                        {/* Nội dung */}
                        <div className="flex items-center gap-4 relative z-10">
                            <motion.span
                                className="text-2xl"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                            >
                                {icons[type]}
                            </motion.span>
                            <div className="flex-1">
                                <p className="font-semibold text-lg tracking-tight">{message}</p>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={onClose}
                                className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200"
                            >
                                ✕
                            </motion.button>
                        </div>

                        {/* Hiệu ứng hạt nền */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                            <div className="w-full h-full bg-[radial-gradient(circle,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:8px_8px]" />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};